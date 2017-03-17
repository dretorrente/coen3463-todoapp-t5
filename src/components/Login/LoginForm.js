
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import login from './css/login.css'
import classnames from 'classnames';
const LoginForm = ({
    onSubmit,
    onChange,
    errors,
    password,
    username,
    isLoading,
    checkUserExists
    // addFlashMessage

}) => (
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
                                    <div id="login-box" className="login-box visible widget-box no-border">
                                        <div className="widget-body">
                                            <div className="widget-main">
                                                <h4 className="header blue lighter bigger">
                                                    <i className="ace-icon fa fa-coffee green"></i>
                                                    Please Enter Your Information
                                                </h4>

                                                <div className="space-6"></div>
                                                <form onSubmit={onSubmit}>
                                                    <fieldset>
                                                        <label className={classnames("block clearfix form-group", {'has-error': errors.username})} >
                                                            <label>Username</label>
                                                            <span className="block input-icon input-icon-right">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    className="form-control"
                                                                    placeholder="Username"
                                                                    onChange={onChange}
                                                                    onBlur={checkUserExists}
                                                                    value={username}/>
                                                                <i className="ace-icon fa fa-user"></i>
                                                             </span>
                                                            {errors.username && <span className="help-block">{errors.username}</span>}
                                                        </label>
                                                        <label className={classnames("block clearfix form-group", {'has-error': errors.password})} >
                                                            <label>Password</label>
                                                            <span className="block input-icon input-icon-right">
                                                                <input
                                                                    type="password"
                                                                    name="password"
                                                                    className="form-control"
                                                                    placeholder="Password"
                                                                    onChange={onChange}
                                                                    value={password} />
                                                                <i className="ace-icon fa fa-lock"></i>
                                                            </span>
                                                            {errors.password && <span className="help-block">{errors.password}</span>}
                                                        </label>
                                                        <div className="space"></div>

                                                        <div className="clearfix">
                                                            <label className="inline">
                                                                <input type="checkbox" className="ace" />
                                                                <span className="lbl"> Remember Me</span>
                                                            </label>

                                                            <button
                                                                disabled={isLoading}
                                                                type="submit"
                                                                className="width-35 pull-right btn btn-sm btn-primary">
                                                                <i className="ace-icon fa fa-key"></i>
                                                                <span className="bigger-110">Login</span>
                                                            </button>
                                                        </div>

                                                        <div className="space-4"></div>
                                                    </fieldset>
                                                </form>
                                                <div className="social-or-login center">
                                                    <span className="bigger-110">      </span>
                                                </div>

                                                <div className="space-6"></div>

                                            </div>
                                            <div className="toolbar clearfix">
                                                <div>
                                                    <Link to="/forgot">
                                                        <a className="forgot-password-link">
                                                            <i className="ace-icon fa fa-arrow-left"></i>
                                                            I forgot my password
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div>
                                                    <Link to="/register">
                                                      <a className="user-signup-link">
                                                           I want to register
                                                            <i className="ace-icon fa fa-arrow-right"></i>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    // addFlashMessage: PropTypes.func.isRequired
    // user: PropTypes.object.isRequired
};

export default LoginForm;