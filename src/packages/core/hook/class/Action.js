var _ = require('lodash')
import Util from '../../util'

/*
    React Native Throws Error in Async so in order to catch the error we have to put then and catch callback
    Mods.Core.Action.add('authRegistration', () => {
	    throw "ERROR"
    })

    Mods.Core.Action.do('authRegistration', dname).then((res) => {
		console.log(dname)
	})
	.catch((err) => {
		console.log(err)
	})
*/
export default class Action {
	constructor() {
		this.actions=[]
	}
	
    do(tag, args={}) {
        let actions = _.filter(this.actions, function(o) { return o.tag==tag; });
        actions = _.sortBy(actions, ['priority']);
        return Util.asyncForEach(actions, async (item) => {
            await item.function_to_add(args)
        })
    }
    
    add(tag, function_to_add, args={} ) {
        args = Object.assign({}, {priority: 10}, args)
        const actionObject = {
            tag: tag,
            function_to_add: function_to_add,            
            priority: args.priority
        }
    
        const action = {...actionObject, ...args}
        this.actions.push(action)
    }
    
    remove(tag) {
        _.remove(this.actions, function(e) {
            return e.tag == tag;
        });
           
    }
}