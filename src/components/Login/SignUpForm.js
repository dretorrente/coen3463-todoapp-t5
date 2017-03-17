
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

const SignUpForm = ({
    onSubmit,
    onChange,
    errors,
    username,
    email,
    password,
    confirmPass,
    fetched,
    // addFlashMessage,
    checkUserExists,
    invalid

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
                            <div id="signup-box" className="signup-box visible widget-box no-border">
                                <div className="widget-body">
                                    <div className="widget-main">
                                        <h4 className="header blue lighter bigger">
                                            <i className="ace-icon fa fa-coffee green" />
                                            New User Registration
                                        </h4>

                                        <div className="space-6"></div>

                                        <form onSubmit={onSubmit}>
                                            <fieldset>

                                                <label className={classnames("block clearfix form-group", {'has-error': errors.email})} >
                                                    <label className="control-label">Email</label>
                                                    <span className="block input-icon input-icon-right">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="form-control"
                                                            placeholder="Email"
                                                            onChange={onChange}
                                                            onBlur={checkUserExists}
                                                            value={email}/>
                                                        <i className="ace-icon fa fa-envelope"></i>
                                                    </span>
                                                    {errors.email && <span className="help-block">{errors.email}</span>}
                                                </label>

                                                <label className={classnames("block clearfix form-group", {'has-error': errors.username})} >
                                                    <label className="control-label">Username</label>
                                                    <span className="block input-icon input-icon-right">
                                                        <input type="text"
                                                               name="username"
                                                               className="form-control"
                                                               placeholder="Username"
                                                               onChange={onChange}
                                                               onBlur={checkUserExists}
                                                               value={username} />
                                                        <i className="ace-icon fa fa-user"></i>
                                                    </span>
                                                    {errors.username && <span className="help-block">{errors.username}</span>}
                                                </label>

                                                <label className={classnames("block clearfix form-group", {'has-error': errors.password})} >
                                                    <label className="control-label">Password</label>
                                                    <span className="block input-icon input-icon-right">
                                                        <input type="password"
                                                               name="password"
                                                               className="form-control"
                                                               placeholder="Password"
                                                               onChange={onChange}
                                                               value={password}/>
                                                        <i className="ace-icon fa fa-lock"></i>
                                                    </span>
                                                    {errors.password && <span className="help-block">{errors.password}</span>}
                                                </label>

                                                <label className={classnames("block clearfix form-group", {'has-error': errors.confirmPass})} >
                                                    <label className="control-label">Re-type password</label>
                                                    <span className="block input-icon input-icon-right">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            name="confirmPass"
                                                            placeholder="Repeat password"
                                                            onChange={onChange}
                                                            value={confirmPass}/>
                                                        <i className="ace-icon fa fa-retweet"></i>
                                                    </span>
                                                    {errors.confirmPass && <span className="help-block">{errors.confirmPass}</span>}
                                                </label>


                                                <div className="space"></div>

                                                <div className="clearfix">
                                                    <button type="reset" className="width-30 pull-left btn btn-sm">
                                                        <i className="ace-icon fa fa-refresh"></i>
                                                        <span className="bigger-110">Reset</span>
                                                    </button>

                                                    <button disabled={fetched || invalid} type="submit" className="width-65 pull-right btn btn-sm btn-success">
                                                        <span className="bigger-110">Register</span>

                                                        <i className="ace-icon fa fa-arrow-right icon-on-right"></i>
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                    <div className="toolbar center">
                                        <Link to="/login">
                                            <a className="back-to-login-link">
                                            <i className="ace-icon fa fa-arrow-left"></i>
                                            Back to login
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

);

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPass: PropTypes.string.isRequired,
    checkUserExists: PropTypes.func,
    // isUserExists: PropTypes.func.isRequired
    // addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
};

export default SignUpForm;
