const joi = require('joi');

class Validator{

	validate(obj){
		return (ctx, next) => {
			try{
				this.validateObj(ctx.headers, obj.headers, 'Headers', { allowUnknown: true });
				this.validateObj(ctx.params, obj.params, 'URL params');
				this.validateObj(ctx.query, obj.query, 'URL query');
				if(ctx.request.body){
					this.validateObj(ctx.request.body, obj.body, 'Request body');
				}
				return next();
			}catch(err){
				ctx.throw(400, err.message);
			}
		}

	}

	validateObj(obj, schema, msg, options){
		if(schema){
			const { err, value } = joi.validate(obj, schema, options);
			if(err){
				throw new Error(`Invalid${msg} - ${err.message}`);
			}
		}
	}

}

module.exports = new Validator();