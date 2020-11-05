import React, { Component } from "react";

function Footer() {
	var d = new Date();
	var n = d.getFullYear();
	return (
		<footer>
			<div className="text-center">
				{`Copyright © ${n} Luxesorted`}
			</div>
		</footer>
	);
}

export default Footer;