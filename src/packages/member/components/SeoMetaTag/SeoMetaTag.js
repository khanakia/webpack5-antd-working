import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageHeader, Form, message, Button, Input, Select, InputNumber, Switch, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import debounce from 'lodash/debounce';

import moment from 'moment'
import dotProp from 'dot-prop'
import { apiPublicPropertyTypeList, apiPublicPropertyCountryList, apiPublicPropertyStateList, apiPublicPropertyCityList, apiPublicPropertyAreaList, apiSeoMetaTagShow, apiSeoMetaTagCreate, apiSeoMetaTagUpdate } from '../../api'

import SelectK from '../shared/SelectK'
import SelectPost from '../shared/SelectPost'
import Loading from 'packages/shared/components/Loading'

import {layout, tailLayout, getBedroomsList } from '../../constant'
import ShowWrap from 'packages/shared/components/ShowWrap'

function disabledDate(current) {
  // Can not select days before today and today
  return current && current.valueOf() < Date.now();
}

const SeoMetaTag = () => {
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
      apiSeoMetaTagUpdate(id, values).then((res) => {
        loadingEl.current.hide()
        const data = res.data
        if (data.error) {
          message.error(data.error.message)
          return
        }
        message.success(data.message);
        history.push('/seo_meta_tags')
      })
    } else {

      apiSeoMetaTagCreate(values).then((res) => {
        loadingEl.current.hide()
        const data = res.data
        if (data.error) {
          message.error(data.error.message)
          return
        }
        message.success(data.message);
        history.push('/seo_meta_tags')
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
    const response = await apiSeoMetaTagShow(id)
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
      page_index: false
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
        title="Seo Metatag"
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

      <ShowWrap show={!id}>

        <Form.Item
          label="State"
          name="state_id"
        >
          <SelectK 
            placeholder={'All States'}
            api_fn={apiPublicPropertyStateList}
            showSearch
            onChange={onStateChange}
          />
        </Form.Item>

        <Form.Item
          label="City"
          name="city_id"
        >
          <SelectK 
            placeholder={'All Cities'}
            // api_fn={apiPublicPropertyCityList}
            data={cities}
            showSearch
          />
        </Form.Item>

        {/* <Form.Item
          label="Area"
          name="area_id"
        >
          <SelectK 
            placeholder={'All Areas'}
            api_fn={apiPublicPropertyAreaList}
          />
        </Form.Item> */}


        <Form.Item
          label="Bedrooms"
          name="bedrooms"
          // rules={[{ required: true, message: 'Field required.' }]}
        >
          <SelectK 
            // title_key="bedrooms" 
            placeholder={'All bedrooms'}
            data={bedroomsList} 
          />
        </Form.Item>

        <Form.Item
          label="Villa Type"
          name="type_id"
          // rules={[{ required: true, message: 'Field required.' }]}
        >
          <SelectK 
            // title_key="bedrooms" 
            placeholder={'All Villa Types'}
            api_fn={apiPublicPropertyTypeList}
          />
        </Form.Item>

      </ShowWrap>

      <Form.Item
        label="Page Index"
        name="page_index"
        rules={[{ required: true, message: 'Field required.' }]}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="Meta Title"
        name="meta_title"
        rules={[{ required: true, message: 'Field required.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Meta Description"
        name="meta_desc"
        rules={[{ required: true, message: 'Field required.' }]}
      >
        <Input.TextArea />
      </Form.Item>

      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </React.Fragment>
  );
};

export default SeoMetaTag;