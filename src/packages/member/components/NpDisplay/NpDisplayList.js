import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dotProp from 'dot-prop'
// import { observer } from 'mobx-react'
import { Table, PageHeader, Popconfirm, message } from "antd";
import { apiNpDisplayList, apiNpDisplayDelete } from '../../api'
import AntColumnSearch from '../../../shared/components/AntColumnSearch4'
const antColumnSearch = new AntColumnSearch()


function Accounts() {
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
    const response = await apiNpDisplayList({meta, filters})
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
    const response = await apiNpDisplayDelete(id)
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
          <Link to={`/npds/${record.id}`}>Edit</Link> | 
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a href="#" className="ml-1">Delete</a>
          </Popconfirm>
        </span>
      ),
      width: 100
    },

    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 30,
      sorter: true,
      ...antColumnSearch.getProps('id')
    },

    {
      title: "PostId",
      dataIndex: "post_id",
      key: "post_id",
      width: 30,
      sorter: true,
      ...antColumnSearch.getProps('post_id')
    },

    {
      title: "Title",
      dataIndex: "post_title",
      key: "post_title",
      
      sorter: true,
      ...antColumnSearch.getProps('post_title')
    },

    {
      title: "Bedrooms",
      dataIndex: "bedrooms",
      key: "bedrooms",
      width: 30,
      sorter: true,
      ...antColumnSearch.getProps('bedrooms')
    },

    {
      title: "Date From",
      dataIndex: "date_from",
      key: "date_from",
      width: 140,
      sorter: true,
      ...antColumnSearch.getProps('date_from')
    },

    {
      title: "Date To",
      dataIndex: "date_to",
      key: "date_to",
      width: 140,
      sorter: true,
      ...antColumnSearch.getProps('date_to')
    },

    {
      title: "Min Stay",
      dataIndex: "min_stay",
      key: "min_stay",
      width: 140,
      sorter: true,
      ...antColumnSearch.getProps('min_stay')
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      sorter: true,
      ...antColumnSearch.getProps('amount')
    },
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
        title="Nightly Price Display"
        extra={[
          
          <Link key={1} className="btn btn-primary btn-sm" to={'/npd'}>Add New</Link>,
          <Link key={2} className="btn btn-primary btn-sm" to={'/npd/entry_bulk'}>Bulk Entries</Link>
        ]}
      />

      <Table
        className="ktable"
        dataSource={items}
        columns={tableColumns}
        scroll={{ x: 1100 }}
        size={"small"}
        pagination={pagination}
        rowKey="id"
        onChange={handleTableChange}
        loading={loading}

      />
    </div>
  );
}

export default Accounts;