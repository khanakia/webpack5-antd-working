import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageHeader, Form, message, Button, Input, Select, InputNumber, Switch, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import debounce from 'lodash/debounce';

import moment from 'moment'
import dotProp from 'dot-prop'
import { apiPostListDdl, apiNpDisplayShow, apiNpDisplayCreate, apiNpDisplayUpdate } from '../../api'

// import SelectK from '../shared/SelectK'
import SelectPost from '../shared/SelectPost'
import Loading from 'packages/shared/components/Loading'

import {layout, tailLayout, fieldTypeList } from '../../constant'
import ShowWrap from 'packages/shared/components/ShowWrap'

function disabledDate(current) {
  // Can not select days before today and today
  return current && current.valueOf() < Date.now();
}

const NpDisplay = () => {
  let { id } = useParams();
  const [form] = Form.useForm();

  const history = useHistory();

  const loadingEl = useRef()

  const [item, setItem] = useState({});
  
  const onFinish = values => {
    console.log('Success:', values);
    // return

    loadingEl.current.show()

    if (id) {
      apiNpDisplayUpdate(id, values).then((res) => {
        loadingEl.current.hide()
        const data = res.data
        if (data.error) {
          message.error(data.error.message)
          return
        }
        message.success(data.message);
        history.push('/')
      })
    } else {
      values['date_from'] = values['date_from'].format('YYYY-MM-DD');
      values['date_to'] = values['date_to'].format('YYYY-MM-DD');
      apiNpDisplayCreate(values).then((res) => {
        loadingEl.current.hide()
        const data = res.data
        if (data.error) {
          message.error(data.error.message)
          return
        }
        message.success(data.message);
        history.push('/')
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
    const response = await apiNpDisplayShow(id)
    const item = dotProp.get(response, 'data.data', {});
    
    // item['date_from'] = moment(item['date_from'])
    // item['date_to'] = moment(item['date_to'])
    // console.log(item)
    // setItem(item)
    form.setFieldsValue(item);
    loadingEl.current.hide();
  }

  useEffect(() => {
    fetch();
  }, []);


  return (
    <React.Fragment>
      <Loading ref={loadingEl} overlay />
      
      <PageHeader
        className="pageheader1"
        title="Nightly Price Display"
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
          label="Property"
          name="post_id"
          rules={[{ required: true, message: 'Field required.' }]}
        >
          <SelectPost />
        </Form.Item>

        <Form.Item
          label="Date From"
          name="date_from"
          rules={[{ required: true, message: 'Field required.' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Date To"
          name="date_to"
          rules={[{ required: true, message: 'Field required.' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Bedrooms"
          name="bedrooms"
          rules={[{ required: true, message: 'Field required.' }]}
        >
          <InputNumber precision={0} />
        </Form.Item>

      </ShowWrap>

      <Form.Item
        label="Min. Stay"
        name="min_stay"
        rules={[{ required: true, message: 'Field required.' }]}
      >
        <InputNumber precision={0} />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: 'Field required.' }]}
      >
        <InputNumber precision={0} />
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

export default NpDisplay;