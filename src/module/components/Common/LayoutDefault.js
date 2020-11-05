import React from "react";

import Header from './Header'
import Footer from './Footer'

function Layout(props) {
	const { className } = props
	return (
		<div className={"layout " + className}>
			<Header />
			<div className="main">
				{props.children}
			</div>
			<Footer />
		</div>
	);

}

export default Layout