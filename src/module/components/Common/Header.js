import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import ProfileDropdown from './ProfileDropdown'
import { Helmet } from "react-helmet";
import ShowWrap from '../../../packages/shared/components/ShowWrap'

function Header() {
	return (
		<Fragment>
			<Helmet>
				<meta charSet="utf-8" />
				<link rel="canonical" href={APP_CONFIG.domain} />
				{/* <link rel="shortcut icon" href={APP_CONFIG.domain + `/images/favicon.ico`} /> */}
			</Helmet>
			<header className="headerUser">
				<div className="headerUser_inner">
					<div className="left">
						<Link to={'/'} key="nav4"><img className="imgLogo" src={APP_CONFIG.logoUrlDark} /></Link>
					</div>
					<div className="right d-flex align-items-center">
						<ShowWrap show={Sapp.Auth.check()}>
							<ProfileDropdown />
						</ShowWrap>
					</div>
				</div>
			</header>
		</Fragment>
	);
}

export default Header