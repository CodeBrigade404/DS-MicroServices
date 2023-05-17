const Joi = require( "joi" );

module.exports = ( joi ) => ( {
	name: "joi",
	language: {
		"valid": "a valid Joi schema"
	},
	rules: [
		{
			name: "valid",
			validate( params, value, state, options ){

				if( !( value && value.isJoi && value.isJoi == true ) ) {
					return this.createError( "joi.valid", { v: value }, state, options );
				}

				// value contains what we're testing
				// joi will blow up if we don't specify
				// the a valid joi object, so we check
				// only if we have an error here, not a 
				// validation error on the match against
				// an empty object.
				try{
					const result = Joi.validate( { }, value );

					return value;
				}catch( err ){
					return this.createError( "joi.valid", { v: value }, state, options );
				}
			}
		}
	]
} );
