
import React, { PropTypes } from 'react';
import ResetForm from '../components/Login/ResetForm.js';

import { connect } from 'react-redux';

import { validateResetForm } from './validations/reset'
import {UserReset, setToken } from "./actions/userActions";


class ResetPage extends React.Component {


    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            userState:  this.props.user ? this.props.user : null,
            password: '',
            confirmPass: '',
            fetched: false,
            invalid: false

        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userState: nextProps.user
        });

    }

    componentDidMount() {
       console.log("STATEMAN", this.state.userState);
    }

    isValid() {
        const {errors, isValid} = validateResetForm(this.state);
        if (!isValid){
            this.setState({errors});
        }
        return isValid;
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
        let resetPasswordToken = this.state.userState.resetPasswordToken;
        if (this.isValid){
            this.setState({
                errors: {},
                fetched: true
            });
            this.props.UserReset(resetPasswordToken).then((response) => {
                console.log("TOKEEE",response);
                // if(!response.data.success){
                //     const data = response.data;
                //     this.setState({errors:data, fetched: false});
                // }else {
                //     this.setState({ errors: {} });
                //     alert("WAHAHAHAHAHAHAHA");
                //     // this.context.router.push('/login');
                // }

            })
        }

    }


    render()
    {
        document.title= "Forgot | Just Do IT";
        const { errors } = this.state;
        return (
            <ResetForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={errors}

                password={this.state.password}
                confirmPass={this.state.confirmPass}

                fetched={this.state.fetched}
                checkEmailExists={this.checkEmailExists}

                invalid = {this.state.invalid}

            />
        );
    }

}

function mapStateToProps(state) {

    return {
        user: state.token.user,

    };
}

ResetPage.propTypes = {

    //isUserExist: PropTypes.func.isRequired
};
ResetPage.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(mapStateToProps, {setToken,UserReset })(ResetPage);