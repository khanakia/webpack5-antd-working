import Filter from './class/Filter'
import Action from './class/Action'

export default class Hook {
	constructor() {
        this.Filter = new Filter()
        this.Action = new Action()
    }
    
    async init() {
        // console.log('Hook Init')
    }
}