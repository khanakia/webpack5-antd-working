import React, {useRef} from 'react'
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form'
import qs from 'query-string'

import Loading from 'packages/shared/components/Loading'
import ErrorLabel from 'packages/shared/components/ErrorLabel'

import { grecaptchaExecute } from 'module/shared'
export default function ChangePassword(props) {
  const loadingEl = useRef()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit_ = async (data) => {
    
    const query = qs.parse(window.location.search)
    
    data.id = query.id
		
		const captcha_token = await grecaptchaExecute()
		if(captcha_token) {
			data['captcha_token'] = captcha_token
		}

    loadingEl.current.show()

    Sapp.Auth.resetPassword(data).then(async(res) => {
      loadingEl.current.hide()
      const data = res.data
      if(data.error) {
        toastr.error(data.error.message)
        return
      }
      toastr.success(data.message)
      history.push('/login')
    })
	}
	
	const query = qs.parse(window.location.search)
	const token = query.code||''
	console.log(token)

  return (
		<form onSubmit={handleSubmit(onSubmit_)} className="uform uform-vertical">
      <Loading ref={loadingEl} overlay />
			<div className="inner">
				<h2 className="heading">Reset Password</h2>

				<div className="form-group">
					<label>Token</label>
					<input
            type="text"
						name="resetToken"
						className="form-control"
						ref={register({ required: true })}
						defaultValue={token}
					/>
					<ErrorLabel field={errors.resetToken} />
				</div>

				<div className="form-group">
					<label>New Password</label>
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
				/>
			</div>
		</form>
  );
}