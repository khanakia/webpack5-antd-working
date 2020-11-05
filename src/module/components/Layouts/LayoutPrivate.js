import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import HeaderDash from '../Common/HeaderDash'
import Footer from '../Common/Footer'

import { Layout, Menu, Breadcrumb } from 'antd';
const {  Content, Sider } = Layout;

import Sidebar from './Sidebar'

function LayoutPrivate(props) {
  const { className } = props
  const history = useHistory()

	if(!Sapp.Auth.check()) {
		history.push('/login')
		return null
	}

	useEffect(() => {
		Sapp.Auth.validateToken()
		// Sapp.Auth.validateToken().catch((error) => {
		// 	if(error.response.status==400) {
		// 		Sapp.Auth.logout()
		// 		toastr.error('Token is invalid.')
		// 		history.push('/login')
		// 	}
		// })
	})
	
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar />
			<Layout>
				<HeaderDash />
				<Content style={{ margin: '0 16px' }}>
					<div className="contentInner">
							{props.children}
					</div>
				</Content>
				<Footer />
			</Layout>
		</Layout>
	);
}

export default LayoutPrivate