import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageHeader, Form, message, Button, Input, Select, InputNumber, Switch, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import debounce from 'lodash/debounce';

import moment from 'moment'
import dotProp from 'dot-prop'
import { apiLinkPresetShow, apiLinkPresetCreate, apiLinkPresetUpdate } from '../../api'

import SelectK from '../shared/SelectK'
import SelectPost from '../shared/SelectPost'
import Loading from 'packages/shared/components/Loading'

import {layout, tailLayout, getBedroomsList } from '../../constant'
import ShowWrap from 'packages/shared/components/ShowWrap'
import PresetInputControl from "./PresetInputControl"
import { generateUniqueId } from "../../utils"

function disabledDate(current) {
  // Can not select days before today and today
  return current && current.valueOf() < Date.now();
}

export default () => {
  let { id } = useParams();
  const [form] = Form.useForm();

  const history = useHistory();

  const loadingEl = useRef()

  const [item, setItem] = useState({});
  const [cities, setCities] = useState([])
  
  const onFinish = values => {
    console.log('Success:', values);
    // return

    loadingEl.current.show()

    if (id) {
      apiLinkPresetUpdate(id, values).then((res) => {
        loadingEl.current.hide()
        const data = res.data
        if (data.error) {
          message.error(data.error.message)
          return
        }
        message.success(data.message);
        history.push('/link_presets')
      })
    } else {

      apiLinkPresetCreate(values).then((res) => {
        loadingEl.current.hide()
        const data = res.data
        if (data.error) {
          message.error(data.error.message)
          return
        }
        message.success(data.message);
        history.push('/link_presets')
      })
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  const fetch = async () => {
    if (!id) return;
    loadingEl.current.show();
    // console.log(id);
    const response = await apiLinkPresetShow(id)
    const item = dotProp.get(response, 'data.data', {});
    
    loadingEl.current.hide();
    fetchCities(item['state_slug']);
    form.setFieldsValue(item);
  }

  const fetchCities = async (parentSlug) => {
    // console.log(id);
    if (!parentSlug) return;
    loadingEl.current.show();
    const response = await apiPublicPropertyCityList({
      parent_slug: parentSlug
    })
    const citiesResult = dotProp.get(response, 'data.results', []);
    // console.log(citiesResult)
    setCities(citiesResult)
    loadingEl.current.hide();
  }

  const onStateChange = async (value, data, item) => {
    // console.log(id, data, s)
    await fetchCities(item.slug)
  }


  useEffect(() => {
    form.setFieldsValue({
      links_json: `[{"id": "${generateUniqueId()}"}]`
    });
    fetch();
    // fetchCities('alabama')
  }, []);

  const bedroomsList = getBedroomsList()

  // console.log(cities)

  return (
    <React.Fragment>
      <Loading ref={loadingEl} overlay />
      
      <PageHeader
        className="pageheader1"
        title="Link Preset"
        extra={[
          
        ]}
      />
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    > 

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Field required.' }]}
      >
        <Input />
      </Form.Item>

      <PresetInputControl 
         formItemProps={
          {
            // label:"Links",
            name:"links_json",
            rules: [{ required: true, message: 'Field required.' }],
            className: "mb-1"
          }
        }
      />
      
      <div className="text-right">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
    </React.Fragment>
  );
};