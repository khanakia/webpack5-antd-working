import routes from './routes'
export default class Uxm {
	constructor(config = {}) {
		this.RawRoutes = routes
		Sapp.Route.addMultiple(routes)		
	}
}