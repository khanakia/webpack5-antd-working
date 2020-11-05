import React, {useRef, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form'
const qs = require('query-string');

import Loading from 'packages/shared/components/Loading'
import ErrorLabel from 'packages/shared/components/ErrorLabel'

import { grecaptchaExecute } from 'module/shared'
// function loginViaUrlFn() {
// 	console.log(window.location.search)
// 	const qparam = qs.parse(window.location.search);
// 	console.log(qparam)
// 	const token = qparam.token
// 	console.log(token)
// 	if(token){
// 			Sapp.Auth.login(token)
// 	}
// }

export default function Login(props) {
	const loadingEl = useRef()
	const history = useHistory()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit_ = async (formData) => {
		const captcha_token = await grecaptchaExecute()
		if(captcha_token) {
			formData['captcha_token'] = captcha_token
		}
		
		loadingEl.current.show()

		Sapp.Auth.attempt(formData).then(async (res) => {
			loadingEl.current.hide()
      const data = res.data
      if(data.error) {
        toastr.error(data.error.message)
        return
			}
			
			axios.defaults.headers.common['Authorization'] = Sapp.Auth.getAuthorizationHeader()
			const qparam = qs.parse(window.location.search);
			// history.push(qparam.redirect || '/')
			
			let url = qparam.redirect || '/'	
			if(qparam.token) url = url + `?token=${Sapp.Auth.getToken()}`
			window.location.href = url

      // toastr.success(data.message)
		}).catch((err) => {
			console.log(err)
			loadingEl.current.hide()
			toastr.error('Server error.')
		})
	}


	const loginViaQueryStringToken = async () => {
		try {
			const qparam = qs.parse(window.location.search);
			// console.log(qparam)
			const token = qparam.token
			// console.log(token)
			let url = qparam.redirect || '/'	
			
			// if(!Sapp.Auth.check() && token) {
			if(token) {
					await Sapp.Auth.validateToken(token)
					// console.log(meResult)
					Sapp.Auth.login(token)
					window.location.href = url
			}
		} catch (error) {
			// console.log(error.response)
			if(error.response && error.response.status==400) {
				toastr.error('Token is invalid.')
			}
		}
	}
	
	const init = async () => {
		await loginViaQueryStringToken()
		const qparam = qs.parse(window.location.search);
		if(Sapp.Auth.check()) {
			let url = qparam.redirect || '/'	
			if(qparam.token) url = url + `?token=${Sapp.Auth.getToken()}`
			window.location.href = url
			return null
		}

	}

	useEffect(() => {
		// loginViaUrlFn()
		// console.log(window.location.search)
		// loginViaQueryStringToken()

		init()
	
	})

  return (
		<form onSubmit={handleSubmit(onSubmit_)} className="uform uform-vertical">
      <Loading ref={loadingEl} overlay />
			<div className="inner">
				<h2 className="heading">Sign In</h2>

				<div className="form-group">
					<label>Email</label>
					<input
            type="text"
						name="username"
						className="form-control"
						ref={register({ required: true })}
					/>
					<ErrorLabel field={errors.password} />
				</div>

				<div className="form-group">
					<label>Password</label>
					<input
            type="password"
						name="password"
						className="form-control"
						ref={register({ required: true })}
					/>
					<ErrorLabel field={errors.password} />
				</div>

				<input
					type="submit"
          className="btn btn-primary btn-block mt-2"
          value='Sign In'
				/>

		
			</div>
		</form>
  );
}