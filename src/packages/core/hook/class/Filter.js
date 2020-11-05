import Util from '../../util'

export default class Filter {
	constructor() {
		this.actions=[]
	}
	
    async apply(tag, args={}) {
        let actions = _.filter(this.actions, function(o) { return o.tag==tag; });
        actions = _.sortBy(actions, ['priority']);
        await Util.asyncForEach(actions, async (item) => {
            args = await item.function_to_add(args)
        })

        // console.log(args)
        return args
    }

    applySync(tag, args={}) {
        let actions = _.filter(this.actions, function(o) { return o.tag==tag; });
        actions = _.sortBy(actions, ['priority']);

        actions.map((item) => {
            args = item.function_to_add(args)

        })
        // console.log(args)
        return args
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