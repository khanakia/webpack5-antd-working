import React, { useState, useEffect, useRef } from "react";
import { Select, Spin } from 'antd';
const { Option } = Select;

import debounce from 'lodash/debounce';
import { apiLinkPresetDdl } from '../../api'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default (props={}) => {
  const { onChange=()=>{} } = props
  const [posts, setPosts] = useState([])
  const [fetching, setFetching] = useState(false)
  

  const fetchPosts = (value) => {
    setFetching(true)
    // await sleep(1000)
    apiLinkPresetDdl({
      search: value
    }).then((result) => {
      // console.log(result.data)
      setPosts(result.data);
      setFetching(false)
    })
  }

  const onSelectChange = async (value, data) => {
    // console.log(posts, value)
    const item = _.find(posts, {id: parseInt(value)})
    // console.log(item)
    onChange(value, data, item )
  }

  const fetchPostsDelay = debounce(fetchPosts, 800);

  useEffect(() => {
    fetchPostsDelay(null)
  }, [])
  
  let propsFiltered = Object.assign({}, props)
  delete propsFiltered['onChange']

  return (
      
        <Select
          // value={value}
          placeholder="Select Presets"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          showSearch={true}
          // onSearch={fetchPostsDelay}
          // onChange={this.handleChange}
          style={{ width: '100%' }}
          onChange={onSelectChange}
          {...propsFiltered}
        >
          {posts.map(d => (
            <Option key={d.id}>{d.name} - {d.id}</Option>
          ))}
        </Select>
      
     
  );
};