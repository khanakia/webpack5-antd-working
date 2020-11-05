import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Input, Button, Select, InputNumber, Switch, message } from 'antd';
import dotProp from 'dot-prop'
// import { pricingFieldList } from '../../Api'
import _ from 'lodash'

const SelectK = (props={}) => {
  const { option_key='id', title_key="title", api_fn=()=>[], data=[], onChange=()=>{} } = props
  let { id } = useParams();
  const [form] = Form.useForm();

  const history = useHistory();

  const [items, setItems] = useState(data);

  const fetch = async () => {
    const response = await api_fn()
    // console.log(response)
    const items = dotProp.get(response, 'data.results', []);
    // console.log(items)
    if(items.length>0) setItems(items)
    
  }

  const onSelectChange = async (value, data) => {
    const item = _.find(items, {[option_key]: value})
    onChange(value, data, item )
  }

  useEffect(() => {
    fetch();
  }, []);

  const dataJsonString = JSON.stringify(data);

  useEffect(() => {
    setItems(data)
  }, [dataJsonString]);

  let propsFiltered = Object.assign({}, props)
  delete propsFiltered['api_fn']
  delete propsFiltered['option_key']
  delete propsFiltered['onChange']
  

  return (
        <Select
            
            key={Math.random(3)}
            // showSearch
            style={{ width: "100%" }}
            placeholder="Select"
            optionFilterProp="children"
            onChange={onSelectChange}
        
            // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            {...propsFiltered}
        >
            {items.map((d, i) => {
              // console.log(d)
              return (
                <Select.Option key={i} value={d[option_key]}>{d[title_key]}</Select.Option>
              )
            })}
        </Select> 
  );
};

export default SelectK;