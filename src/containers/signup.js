import React, { PropTypes } from 'react';
import SignUpForm from '../components/Login/SignUpForm.js';


class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: '',
                passwordConfirmation:''
            }

        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        console.log(this.state);
        {/*// create a string for an HTTP body message*/}
        {/*const name = encodeURIComponent(this.state.user.name);*/}
        {/*const email = encodeURIComponent(this.state.user.email);*/}
        {/*const password = encodeURIComponent(this.state.user.password);*/}
        {/*const formData = `name=${name}&email=${email}&password=${password}`;*/}

        {/*// create an AJAX request*/}
        {/*const xhr = new XMLHttpRequest();*/}
        {/*xhr.open('post', '/register');*/}
        {/*xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');*/}
        {/*xhr.responseType = 'json';*/}
        {/*xhr.addEventListener('load', () => {*/}
            {/*if (xhr.status === 200) {*/}
                {/*// success*/}

                {/*// change the component-container state*/}
                {/*this.setState({*/}
                    {/*errors: {}*/}
                {/*});*/}

        //         console.log('The form is valid');
        //     } else {
        //         // failure
        //
        //         const errors = xhr.response.errors ? xhr.response.errors : {};
        //         errors.summary = xhr.response.message;
        //
        //         this.setState({
        //             errors
        //         });
        //     }
        // });
        // xhr.send(formData);
    }

    render() {
        return (
            <div className="main-container">
                <div className="main-content">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="login-container">
                                <div className="center">
                                    <h1>
                                        <i className="ace-icon fa fa-check-square-o red"></i>
                                        <span className="red">Just</span>
                                        <span className="green">Do</span>
                                        <span className="white" id="id-text2">IT</span>
                                    </h1>
                                    <h4 className="blue" id="id-company-text">a ToDo List Application</h4>
                                </div>
                                <div className="space-6"></div>
                                <div className="position-relative">
                                    <div id="signup-box" className="signup-box visible widget-box no-border">
                                        <div className="widget-body">
                                            <div className="widget-main">
                                                <h4 className="header blue lighter bigger">
                                                    <i className="ace-icon fa fa-coffee green"></i>
                                                    New User Registration
                                                </h4>

                                                <div className="space-6"></div>

                                                <form action="/register" method='post'>
                                                    <fieldset>
                                                        <label className="block clearfix">
                                                            <label>Email</label>
                                                            <span className="block input-icon input-icon-right">
                                                                <input
                                                                    value={this.state.user.email}
                                                                    onChange={this.processForm}
                                                                    type="email" 
                                                                    name="email"
                                                                    className="form-control"
                                                                    placeholder="Email" />
                                                                <i className="ace-icon fa fa-envelope"></i>
                                                            </span>
                                                        </label>

                                                        <label className="block clearfix">
                                                            <label>Username</label>
                                                            <span className="block input-icon input-icon-right">
                                                                <input
                                                                    value={this.state.user.name}
                                                                    onChange={this.processForm}
                                                                    type="text" name="username"
                                                                    className="form-control"
                                                                    placeholder="Username" />
                                                                <i className="ace-icon fa fa-user"></i>
                                                            </span>
                                                        </label>

                                                        <label className="block clearfix">
                                                            <label>Password</label>
                                                            <span className="block input-icon input-icon-right">
                                                                <input
                                                                    value={this.state.user.password}
                                                                    onChange={this.processForm}
                                                                    type="password"
                                                                    name="password"
                                                                    className="form-control"
                                                                    placeholder="Password" />
                                                                <i className="ace-icon fa fa-lock"></i>
                                                            </span>
                                                        </label>

                                                        <label className="block clearfix">
                                                            <label>Re-type password</label>
                                                            <span className="block input-icon input-icon-right">
                                                                <input
                                                                    value={this.state.user.passwordConfirmation}
                                                                    onChange={this.processForm}
                                                                    type="password"
                                                                    name="confirm"
                                                                    className="form-control"
                                                                    placeholder="Repeat password" />
                                                                <i className="ace-icon fa fa-retweet"></i>
                                                            </span>
                                                        </label>

                                                        <div className="space"></div>

                                                        <div className="clearfix">
                                                            <button type="reset" className="width-30 pull-left btn btn-sm">
                                                                <i className="ace-icon fa fa-refresh"></i>
                                                                <span className="bigger-110">Reset</span>
                                                            </button>

                                                            <button type="submit" value="signup" className="width-65 pull-right btn btn-sm btn-success">
                                                                <span className="bigger-110">Register</span>

                                                                <i className="ace-icon fa fa-arrow-right icon-on-right"></i>
                                                            </button>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                            <div className="toolbar center">
                                                <Link to="/auth">
                                                    <a className="back-to-login-link">
                                                        <i className="ace-icon fa fa-arrow-left"></i>
                                                        Back to login
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="navbar-fixed-top align-right">
                                    <br />
                                    &nbsp;
                                    <a id="btn-login-dark" href="#">Dark</a>
                                    &nbsp;
                                    <span className="blue">/</span>
                                    &nbsp;
                                    <a id="btn-login-blur" href="#">Blur</a>
                                    &nbsp;
                                    <span className="blue">/</span>
                                    &nbsp;
                                    <a id="btn-login-light" href="#">Light</a>
                                    &nbsp; &nbsp; &nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignUpPage;