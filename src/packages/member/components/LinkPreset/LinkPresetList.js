import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dotProp from 'dot-prop'
// import { observer } from 'mobx-react'
import { Table, PageHeader, Popconfirm, message } from "antd";
import { apiLinkPresetList, apiLinkPresetDelete } from '../../api'
import AntColumnSearch from '../../../shared/components/AntColumnSearch4'
const antColumnSearch = new AntColumnSearch()


function SeoMetaTagList() {
  // const history = useHistory();
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [metad, setMetad] = useState({
    page: 1,
    pageSize: 10,
    total: 10
  })

  const fetch = async (meta, filters) => {
    setLoading(true)
    const response = await apiLinkPresetList({meta, filters})
    // console.log(response)
    const items = dotProp.get(response, 'data.results', []);
    const metaRes = dotProp.get(response, 'data.meta', metad);
    setItems(items)
    setMetad(metaRes)
    setLoading(false)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter)
    fetch({
      pageSize: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    }, filters);
  }



  const handleDelete = async (id) => {
    console.log(id)
    setLoading(true)
    const response = await apiLinkPresetDelete(id)
    setLoading(false)
    const data = response.data
    if (data.error) {
      message.error(data.error.message)
      return
    }

    message.success(data.message);
    
    fetch(metad)
  }

  const tableColumns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={`/link_presets/${record.id}`}>Edit</Link> | 
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a href="#" className="ml-1">Delete</a>
          </Popconfirm>
        </span>
      ),
      width: 100
    },

    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 30,
    //   sorter: true,
    //   ...antColumnSearch.getProps('id')
    // },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <span><a target="_blank" href={record.url}>{record.name}</a></span>
        )
      },
      sorter: true,
      ...antColumnSearch.getProps('name')
    }
  ];

  useEffect(() => {
    fetch()
  }, []);


  // console.log('meta', metad)

  const pagination = {
    current: metad.page,
    pageSize: metad.pageSize,
    total: metad.total
  }

  return (
    <div className="page">
      <PageHeader
        className="pageheader1"
        title="Link Presets"
        extra={[
          
          <Link key={1} className="btn btn-primary btn-sm" to={'/link_preset'}>Add New</Link>
        ]}
      />

      <Table
        className="ktable"
        dataSource={items}
        columns={tableColumns}
        scroll={{ x: 700 }}
        size={"small"}
        pagination={pagination}
        rowKey="id"
        onChange={handleTableChange}
        loading={loading}

      />
    </div>
  );
}

export default SeoMetaTagList;