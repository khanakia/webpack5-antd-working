class CustomError extends Error {
  constructor(code = '401', message=null, error=null, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, CustomError);

    // Custom debugging information
    this.code = code;
    this.error = error;
    this.message = message;
    // this.date = new Date();
  }
}

export default class Response {

    humanize(str) {
      var frags = str.split('_');
      for (let i=0; i<frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(' ');
    }

    errorThrow(code,message, error) {
        return new CustomError(code, message, error);
    }

    print(success, data, message=null, code=null, append={}) {
        code = code ? code : success ? 200 : 400;
        var response = {
            success: success,
            code: code,
            message: message,
            error: success ? null : data,
            data: success ? data : null,
        }

        response = Object.assign({}, response, append)
        return response
    }

    

    say() {
        return 'hello'
    }


    parseMongooseFirstError(err) {
        var errObj = err.errors

        if(err.errors) {
            // Get First Key Name in Error Object
            var errorKeyName = Object.keys(errObj)[0];
            var errorKind = errObj[errorKeyName]['kind']

            if(errorKind=='required') {
                var message = this.humanize(errorKeyName) + ' is ' + errorKind
                return this.print(false, {
                    key: errorKeyName
                }, message)
            }
        }
        
        return this.print(false, null, err.message || 'Validation error.')
    }


    throwIfNotAcl(status) {
        if(!status) {
            throw(Response.print(false, null, 'Access Denied (ACL).'))
        }
    }

};