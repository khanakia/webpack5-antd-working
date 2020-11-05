import React, {useRef} from 'react'
import { useForm } from 'react-hook-form'

import Loading from 'packages/shared/components/Loading'
import ErrorLabel from 'packages/shared/components/ErrorLabel'

export default function ChangePassword(props) {
  const loadingEl = useRef()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit_ = data => {
    const Id = Sapp.Auth.getUserID()
    data.id = Id
    
    loadingEl.current.show()
    Sapp.Auth.changePassword(data).then((res) => {
      loadingEl.current.hide()
      const data = res.data
      if(data.error) {
        toastr.error(data.error.message)
        return
      }
      toastr.success(data.message)
    })
  }

  return (
		<form onSubmit={handleSubmit(onSubmit_)} className="uform uform-vertical">
      <Loading ref={loadingEl} overlay />
			<div className="inner">
				<h2 className="heading">Change Password</h2>

				<div className="form-group">
					<label>Current Password</label>
					<input
            type="password"
						name="passwordOld"
						className="form-control"
						placeholder="Current Password"
						ref={register({ required: true })}
					/>
					<ErrorLabel field={errors.password} />
				</div>

				<div className="form-group">
					<label>New Password</label>
					<input
            type="password"
						name="password"
						className="form-control"
						placeholder="New Password"
						ref={register({ required: true })}
					/>
					<ErrorLabel field={errors.password} />
				</div>

				<div className="text-right">
					<input
						type="submit"
						className="btn btn-primary btn-sm mt-2"
					/>
				</div>
			</div>
		</form>
  );
}