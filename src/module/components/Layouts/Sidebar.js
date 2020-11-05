import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import { Link, useHistory } from "react-router-dom";

function Sidebar(props) {
  const { className } = props
  const [collapsed, setCollapsed] = useState(false)

  const history = useHistory()

  const onCollapse = collapsedV => {
    console.log(collapsedV);
    setCollapsed(collapsedV)
  };

  const onClick = ({ key }) => {
    history.push(key)
  }

	return (
    <Sider  collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logoSidebar"><img className="imgLogo" src={APP_CONFIG.logoUrl} /></div>
      <Menu className="sidebarMenu" theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={onClick}>

        <Menu.Item key="/">
          <i className="fa fa-table"></i>
          <span>Nighly Display Prices</span>
        </Menu.Item>

        <Menu.Item key="/nps">
          <i className="fa fa-funnel-dollar"></i>
          <span>Nighly Day Price</span>
        </Menu.Item>

        <Menu.Item key="/seo_meta_tags">
          <i className="fa fa-globe"></i>
          <span>Seo Metatags</span>
        </Menu.Item>

        <Menu.Item key="/seo_urls">
          <i className="fa fa-link"></i>
          <span>Seo Urls</span>
        </Menu.Item>

        <Menu.Item key="/link_presets">
          <i className="fa fa-link"></i>
          <span>Link Presets</span>
        </Menu.Item>
        
      </Menu>
    </Sider>
	);

}

export default Sidebar