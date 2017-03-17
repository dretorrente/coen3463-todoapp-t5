var Validator = require( 'validator');
var isEmpty = require('lodash/isEmpty');


function validateLoginForm(data) {
    let errors = {};
    if(Validator.isNull(data.username)){
        errors.username = "This field is required";

    }

    if(Validator.isNull(data.password)){
        errors.password = "This field is required";

    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = validateLoginForm;