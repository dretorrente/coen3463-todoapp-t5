import React, { PropTypes } from 'react';
import SignUpForm from '../components/Login/SignUpForm.js';
// import { userSignupRequest } from './actions/signupActions';
import { connect } from 'react-redux';
import { fetchSignUpUser } from "./actions/userActions";
import { UserSignUp, isUserExists } from "./actions/userActions";
import { addFlashMessage } from "./actions/flashActions";
import { validateSignupForm } from './validations/signup';

// @connect((store) => {
//     return{
//         user: store.user.user,
//         errors: store.user.errors,
//         fetched: store.user.fetched,
//         addFlashMessage,
//         isUserExists
//
//     }
// })
class SignUpPage extends React.Component {


    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            username: '',
            email: '',
            password: '',
            confirmPass: '',
            fetched: false,
            invalid: false

        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);

    }


    isValid() {
        const {errors, isValid} = validateSignupForm(this.state);
        if (!isValid){
            this.setState({errors});
        }
        return isValid;
    }
    checkUserExists(event) {
        const field = event.target.name;
        const val = event.target.value;
        if(val !== ''){
            this.props.isUserExists(val).then(res => {
                let errors = this.state.errors;
                let invalid;
                if (res.data.user) {
                    errors[field] = 'There is user with such ' + field;
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
            this.props.UserSignUp(this.state).then((response) => {
                if(!response.data.success){
                    const data = response.data;
                    this.setState({errors:data, fetched: false});
                }else {
                    this.setState({ errors: {} });
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully. Welcome!'
                    });
                    this.context.router.push('/login');
                }


            })
        }

    }


    render()
    {
        document.title= "Register | Just Do IT";
        const { errors } = this.state;
        const {addFlashMessage, isUserExists} = this.props;
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={errors}
                username={this.state.username}
                email={this.state.email}
                password={this.state.password}
                confirmPass={this.state.confirmPass}
                fetched={this.state.fetched}
                checkUserExists={this.checkUserExists}
                addFlashMessage={addFlashMessage}
                isUserExists={isUserExists}
                invalid = {this.state.invalid}

            />
        );
    }

}
SignUpPage.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
    //isUserExist: PropTypes.func.isRequired
};
SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(null, { addFlashMessage,UserSignUp, fetchSignUpUser,isUserExists })(SignUpPage);