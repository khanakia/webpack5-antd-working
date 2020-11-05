import React, {useRef} from 'react'
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form'

import Loading from 'packages/shared/components/Loading'
import ErrorLabel from 'packages/shared/components/ErrorLabel'

import { grecaptchaExecute } from 'module/shared'

export default function ChangePassword(props) {
  const loadingEl = useRef()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit_ = async (data) => {
    const Id = Sapp.Auth.getUserID()
    data.id = Id
    
    const captcha_token = await grecaptchaExecute()
		if(captcha_token) {
			data['captcha_token'] = captcha_token
		}
    
    loadingEl.current.show()
    Sapp.Auth.forgotPassword(data).then((res) => {
      loadingEl.current.hide()
      const data = res.data
      if(data.error) {
        toastr.error(data.error.message)
        return
      }
      toastr.success(data.message)
      history.push('/reset_password')
    })
  }

  return (
		<form onSubmit={handleSubmit(onSubmit_)} className="uform uform-vertical">
      <Loading ref={loadingEl} overlay />
			<div className="inner">
				<h2 className="heading">Forgot Password</h2>

				<div className="form-group">
					<label>Email</label>
					<input
            type="email"
						name="email"
						className="form-control"
						placeholder="Email"
						ref={register({ required: true })}
					/>
					<ErrorLabel field={errors.email} />
				</div>
				<input
					type="submit"
					className="btn btn-primary btn-block mt-2"
				/>
			</div>
		</form>
  );
}