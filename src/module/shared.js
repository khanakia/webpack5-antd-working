export const grecaptchaExecute = () => {
	// console.log(APP_CONFIG.recaptchaSiteKey)
	if(!APP_CONFIG.recaptchaSiteKey) return null
	return new Promise(function(resolve, reject) {
		grecaptcha.ready(function() {
			grecaptcha.execute(APP_CONFIG.recaptchaSiteKey, {action: 'action_name'})
			.then(function(token) {
				// console.log(token)
				// Verify the token on the server.
				resolve(token)
			})
		});
	})
}