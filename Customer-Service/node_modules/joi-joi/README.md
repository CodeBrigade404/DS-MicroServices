# joi-joi
Joi validation for of Joi schema objects.

Use this module if you'd like to validate a Joi schema object using Joi.

## Disclaimers
 * This module is most likely not right for you.
 * This module is not affiliated with the Joi project.

## Usage
```javascript
const BaseJoi = require( "joi" );
const JoiJoi = require( "joi-joi" );
const Joi = BaseJoi.extend(JoiJoi);

const validObject = Joi.object( ).keys( {
	"foo": Joi.string( )
} );

Joi.validate( validObject, Joi.joi( ).valid( ), ( err, result ) => {
	// err => null
	// result => Joi schema object
} );
```
