import Response from './class/Response'

class Util {
	constructor() {
        this.Response = new Response()
    }
    
    async init() {

    }

    isset = (obj /*, level1, level2, ... levelN*/) => {
        var dump;
        if(undefined==obj) return false
        return true;
    }

    isEmptyArray = (arr) => {
        if(undefined==arr || arr.length==0) return true
        return false
    }

    isEmpty = (obj) => {
        for(var prop in obj) {
            if(obj.hasOwnProperty && obj.hasOwnProperty(prop)) return false;
            if(obj['prop']!==undefined) return false;
        }
    
        return JSON.stringify(obj) === JSON.stringify({});
    }

    objValue = (obj, props=[], defaultValue = null) => {
        if(undefined==obj || this.isEmpty(obj)) return defaultValue
        
        props.forEach(element => {
            // console.log(element, obj)
            if(undefined==obj || this.isEmpty(obj) || undefined==obj[element]) {
                obj = defaultValue
                return
            }
            // console.log(obj, element, obj.hasOwnProperty(element))
            obj = obj[element];

            // console.log(defaultValue)
        });
        
        return obj
    }

    hashCode(str){
        var hash = 5381,
        i    = str.length;
  
        while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
        }
    
        /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
        * integers. Since we want the results to be always positive, convert the
        * signed int to an unsigned by doing an unsigned bitshift. */
        return hash >>> 0;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array)
        }
    }

    getObjKey(key, defaultValue=null) {
        try {
            return eval(key)
        } catch (error) {
            return defaultValue
        }
    }
}

export default new Util()