import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dotProp from 'dot-prop'
// import { observer } from 'mobx-react'
import { Table, PageHeader } from "antd";
import { apiNpList } from '../../api'

import AntColumnSearch from '../../../shared/components/AntColumnSearch4'
const antColumnSearch = new AntColumnSearch()

const tableColumns = [
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (text, record) => (
  //     <span>
  //       <Link to={`/services/${record._id}`}>Edit</Link>
  //     </span>
  //   ),
  //   width: 40
  // },

  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 50,
    sorter: true,
    ...antColumnSearch.getProps('title')
  },

  {
    title: "PostId",
    dataIndex: "post_id",
    key: "post_id",
    width: 50,
    sorter: true,
    ...antColumnSearch.getProps('post_id')
  },

  {
    title: "Title",
    dataIndex: 'post_title',
    key: "post_title",
    width: 200,
    sorter: true,
    ...antColumnSearch.getProps('post_title')
  },

  {
    title: "Bedrooms",
    dataIndex: "bedrooms",
    key: "bedrooms",
    width: 100,
    sorter: true,
    ...antColumnSearch.getProps('bedrooms')
  },

  {
    title: "Dated",
    dataIndex: "dated",
    key: "dated",
    width: 100,
    sorter: true,
    ...antColumnSearch.getProps('dated')
  },

  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 100,
    sorter: true,
    ...antColumnSearch.getProps('amount')
  }
];

function Accounts() {
  // const history = useHistory();
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [metad, setMetad] = useState({
    page: 1,
    pageSize: 10,
    total: 10
  })

  const fetch = async (meta, filters) => {
    setLoading(true)
    const response = await apiNpList({meta, filters})
    // console.log(response)
    const items = dotProp.get(response, 'data.results', []);
    const metaRes = dotProp.get(response, 'data.meta', metad);
    setItems(items)
    setMetad(metaRes)
    setLoading(false)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pageSize: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    }, filters);
  }


  useEffect(() => {
    fetch()
  }, []);

  const pagination = {
    current: metad.page,
    pageSize: metad.pageSize,
    total: metad.total
  }

  return (
    <div className="page">
      <PageHeader
        className="pageheader1"
        title="Nightly Prices"
        extra={[
          
          // <Link key={1} className="btn btn-primary btn-sm" to={'/service'}>Create Service</Link>
        ]}
      />

      <Table
        className="ktable"
        dataSource={items}
        columns={tableColumns}
        scroll={{ x: 900 }}
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