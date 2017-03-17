var Validator = require( 'validator');
var isEmpty = require('lodash/isEmpty');


function validateForgotForm(data) {
    let errors = {};
    if(Validator.isNull(data.email)){
        errors.email = "This field is required";

    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = validateForgotForm;