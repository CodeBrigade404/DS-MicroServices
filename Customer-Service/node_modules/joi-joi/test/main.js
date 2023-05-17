const BaseJoi = require( "joi" );
const JoiJoi = require( "../lib/joijoi" );

const Joi = BaseJoi.extend(JoiJoi);

const assert = require( "assert" );

describe( "JoiJoi", function( ){
	it( "Is a function when required", function( ){
		assert.ok( typeof( JoiJoi ) == "function" );
	} );

	it( "Fails on an invalid Joi object", function( cb ){

		// Note that we have to trick our system into thinking this might be a joi object;
		// Otherwise our joi validation bails right at the top of our validate() definition.
		Joi.validate( { isJoi: true, "Some": "invalid", "Object": "That", "isnt": "joi" }, Joi.joi( ).valid( ), ( err, result ) => {
			if( !err ){
				return cb( "no error returned" );
			}
			return cb( null );
		} );
	} );

	it( "Works on a valid Joi object", function( cb ){
		Joi.validate( Joi.object( ).keys( { "foo": "bar" } ), Joi.joi( ).valid( ), ( err, result ) => {
			if( err ){ return cb( err ); }
			return cb( null );
		} );
	} );

	it( "Fails properly on an object that isn't joi and isn't faking isJoi", function( cb ){
		Joi.validate( { "foo": "bar" }, Joi.joi( ).valid( ), ( err, result ) => {
			if( !err ){
				return cb( "no error" );
			}
			return cb( null );
		} );
	} );
} );
