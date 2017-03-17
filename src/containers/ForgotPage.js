
import React, { PropTypes } from 'react';
import ForgotForm from '../components/Login/ForgotForm.js';

import { connect } from 'react-redux';

import { validateForgotForm } from './validations/forgot';
import { UserForgot, isEmailExists } from "./actions/userActions";


class ForgotPage extends React.Component {


    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},

            email: '',
            fetched: false,
            invalid: false

        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);

    }


    isValid() {
        const {errors, isValid} = validateForgotForm(this.state);
        if (!isValid){
            this.setState({errors});
        }
        return isValid;
    }
    checkEmailExists(event) {
        const field = event.target.name;
        const val = event.target.value;
        if(val !== ''){
            this.props.isEmailExists(val).then(res => {
                let errors = this.state.errors;
                let invalid;
                if (!res.data.success) {
                    errors[field] = 'There is no user with such ' + field;
                    invalid = true
                }
                else {
                    errors[field] = '';
                    invalid = false

                }


                this.setState({errors, invalid})
            });
        }
    }

    changeUser(e) {
        if(!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value, errors
            });
        }
        else {
            this.setState({[e.target.name]:e.target.value});
        }
    }
    // resetForm(event){
    //     event.preventDefault();
    //     this.setState({
    //         errors: {},
    //         username: '',
    //         email: '',
    //         password: '',
    //         confirmPass: '',
    //         fetched: false
    //     })
    // }
    processForm(event) {

        event.preventDefault();
        if (this.isValid){
            this.setState({
                errors: {},
                fetched: true
            });
            this.props.UserForgot(this.state).then((response) => {
                if(!response.data.success){
                    const data = response.data;
                    this.setState({errors:data, fetched: false});
                }else {
                    this.setState({ errors: {} });
                    alert("An e-mail has been sent to you with further instructions.");
                    // this.context.router.push('/login');
                }

            })
        }

    }


    render()
    {
        document.title= "Forgot | Just Do IT";
        const { errors } = this.state;
        return (
            <ForgotForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={errors}

                email={this.state.email}

                fetched={this.state.fetched}
                checkEmailExists={this.checkEmailExists}

                invalid = {this.state.invalid}

            />
        );
    }

}
ForgotPage.propTypes = {

    //isUserExist: PropTypes.func.isRequired
};
ForgotPage.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(null, { isEmailExists,UserForgot })(ForgotPage);