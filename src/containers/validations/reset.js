var Validator = require( 'validator');
var isEmpty = require('lodash/isEmpty');


function validateResetForm(data) {
    let errors = {};

    if(Validator.isNull(data.password)){
        errors.password = "This field is required";

    }
    if(!Validator.equals(data.password, data.confirmPass)){
        errors.confirmPass = "Password must match";
    }
    if(Validator.isNull(data.confirmPass)){
        errors.confirmPass = "This field is required";

    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = validateResetForm;