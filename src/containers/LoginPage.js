import React, { PropTypes } from 'react';
import LoginForm from '../components/Login/LoginForm.js';
import { connect } from 'react-redux';
import { validateLoginForm } from './validations/login';
import { UserLogin, isLogUserExists,fetchUser} from "./actions/userActions";
import { addFlashMessage } from "./actions/flashActions";
import { browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            username: '',
            password: '',
            isLoading: false
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }



    isValid() {
        const { errors, isValid } = validateLoginForm(this.state);

        if (!isValid){
            this.setState({errors});
        }
        return isValid;
    }

    checkUserExists(event) {
        const field = event.target.name;
        const val = event.target.value;
        if(val !== ''){
            this.props.isLogUserExists(val).then(res => {
                let errors = this.state.errors;
                let isLoading;
                if (res.data.user) {
                    errors[field] = '';
                    isLoading = false
                }
                else {
                    errors[field] = 'There is no user with such ' + field;
                    isLoading = true

                }


                this.setState({errors, isLoading})
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

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        if (this.isValid) {
            this.setState({
                errors: {},
                isLoading: true
            });
            this.props.UserLogin(this.state).then((response) => {
                if (!response.data.success) {
                    const data = response.data;
                    this.setState({errors: data, isLoading: false});
                } else {

                    // window.location ="/";
                    // this.context.router.push({
                    //     pathname: '/'
                    // })

                    browserHistory.push('/')
                }


            })
        }

    }


    render() {

        document.title= "Login | Just Do IT";
        // document.body.style.backgroundColor = "red";

        const { errors, username, password, isLoading} = this.state;
       // const { addFlashMessage } = this.props;
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={errors}
                password={password}
                username={username}
                isLoading={isLoading}
                //addFlashMessage={ addFlashMessage}
               checkUserExists={this.checkUserExists}
            />

        );
    }

}
LoginPage.propTypes = {
    // addFlashMessage: PropTypes.func.isRequired
    isAuthenticated: React.PropTypes.bool.isRequired,
    isLogUserExists: PropTypes.func.isRequired
};
LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
}

// LoginPage.contextTypes = {
//     router: PropTypes.object.isRequired
// };
export default connect(mapStateToProps, { addFlashMessage,UserLogin, fetchUser,isLogUserExists})(LoginPage);