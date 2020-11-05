// import axios from 'axios';
// var jwtDecode = require("jwt-decode");
import jwtDecode from "jwt-decode"
import React from "react";
import _config from "./config";
import routes from "./routes";
// import locale from "./locale";
export default class Auth {
	constructor() {
		this.config = Object.assign({}, _config, APP_CONFIG.auth || {});
		Sapp.Route.addMultiple(routes);
		// this.locale = locale["en"];
	}

	init() {
		// console.log('Auth init')
		// this.lang = locale(Sapp.UxmShared.TranslationC.getLang())
		// Sapp.Hook.Action.add('beforeModuleInit', () => {
		// 	try {
		// 		// this.locale = locale[Sapp.UxmLocale.TranslationC.getLang()]
		// 	} catch (error) {
		// 	}
		// 	console.log(Sapp.Auth)
		// })
	}

	// translate = key => {
	// 	let valor = this.locale[key];
	// 	let args = Sapp.Hook.Filter.applySync("beforeTranslateSync", {
	// 		key: key,
	// 		valor: valor
	// 	});

	// 	// console.log(args)
	// 	return (args && args["valor"]) || null;
	// };

	me(token) {
		// console.log(axios.defaults.headers.common)
		if (!token) token = Sapp.Auth.getToken();

		return axios({
			method: "post",
			headers: {
				Authorization: `Bearer ${token}`
			},
			url: APP_CONFIG.apiHost + "/auth/me"
		});
	}

	// validateToken(token) {
	// 	// console.log(axios.defaults.headers.common)
	// 	if (!token) token = Sapp.Auth.getToken();

	// 	return axios({
	// 		method: "post",
	// 		headers: {
	// 			Authorization: `Bearer ${token}`
	// 		},
	// 		url: APP_CONFIG.apiHost + "/auth/validate"
	// 	});
	// }

	async validateToken(token) {
		// console.log(axios.defaults.headers.common)
		if (!token) token = Sapp.Auth.getToken();

		try {
			const response = await axios({
				method: "post",
				// headers: {
				// 	Authorization: `Bearer ${token}`
				// },
				data: {
					token
				},
				url: APP_CONFIG.apiHost + "/wp-json/luxe/v1/auth/validate"
			});
	
			if(response.data.error) {
				Sapp.Auth.logout()
				toastr.error('Token is invalid.')
				// history.push('/login')
				window.location.href = '/login'
			}
			
		} catch (error) {
			Sapp.Auth.logout()
			window.location.href = '/login'
		}
	}

	meUpdate(data) {
		return axios({
			method: "put",
			//  headers: null,
			data: data,
			url: APP_CONFIG.apiHost + "/auth/me/update"
		});
	}

	attempt({ username = null, password = null, captcha_token = null }) {
		var ajaxObj = axios.post(APP_CONFIG.apiHost + "/wp-json/luxe/v1/auth/login", {
			username: username,
			password: password,
			captcha_token: captcha_token,
			appName: APP_CONFIG.appName
		});

		ajaxObj
			.then(response => {
				this.login(response.data.token);
			})
			.catch(function(error) {
				// console.log(error);
			});

		return ajaxObj;
	}
	register(args = {}) {
		//console.log('registernew');
		var ajaxObj = axios.post(APP_CONFIG.apiHost + "/auth/register", args);

		ajaxObj.then(response => {
			// console.log(response)
		});

		return ajaxObj;
	}

	forgotPassword({ email = null, captcha_token = null }) {
		//console.log('forgotPasswordnew');
		var ajaxObj = axios.post(APP_CONFIG.apiHost + "/auth/password/email", {
			email: email,
			captcha_token: captcha_token
		});
		return ajaxObj;
	}

	resetPassword(args = {}) {
		var ajaxObj = axios.post(
			APP_CONFIG.apiHost + "/auth/password/reset",
			args
		);
		return ajaxObj;
	}
	changePassword(args = {}) {
		//console.log('changePasswordnew');
		var ajaxObj = axios.post(
			APP_CONFIG.apiHost + "/auth/password/update",
			args
		);
		return ajaxObj;
	}

	login(token = null) {
		if (!token) return "Cannot Login";
		localStorage.setItem("token", token);
		axios.defaults.headers.common[
			"Authorization"
		] = this.getAuthorizationHeader();
	}

	logout() {
		localStorage.removeItem("token");
	}

	check() {
		return this.getToken() ? true : false;
	}

	getToken() {
		return localStorage.getItem("token");
	}

	getTokenDecoded() {
		var token = this.getToken();
		if (!token) return {};
		return jwtDecode(this.getToken());
	}

	// is_admin() {
	// 	const data = this.getTokenDecoded();
	// 	return data.is_admin | data.is_sa;
	// }

	getUserID() {
		const data = this.getTokenDecoded();
		return data._id;
	}

	getAuthorizationHeader() {
		return "Bearer " + this.getToken();
	}

	// Header which i will add to ajax request
	header() {
		return {
			Authorization: "Bearer " + this.getToken(),
			"x-token": this.getToken()
		};
	}

	getTokenBearer() {
		return "Bearer " + this.getToken();
	}
}
