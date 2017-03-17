var Validator = require( 'validator');
var isEmpty = require('lodash/isEmpty');


function validateTodoForm(data) {
    let errors = {};
    if(Validator.isNull(data.todotask)){
        errors.todotask = "Please name a task you want to add in your todo-list";

    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = validateTodoForm;