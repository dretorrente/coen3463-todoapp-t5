import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
const ForgotForm = ({
    errors,
    onChange,
    onSubmit,
    email,
    checkEmailExists

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

                                    <div id="forgot-box" className="forgot-box visible widget-box no-border">
                                        <div className="widget-body">
                                            <div className="widget-main">
                                                <h4 className="header red lighter bigger">
                                                    <i className="ace-icon fa fa-key"></i>
                                                    Retrieve Password
                                                </h4>

                                                <div className="space-6"></div>
                                                <p>
                                                    Enter your email and to receive instructions
                                                </p>

                                                <form onSubmit={onSubmit}>
                                                    <fieldset>
                                                        <label className={classnames("block clearfix form-group", {'has-error': errors.email})} >
                                                            <label>Email</label>
                                                            <span className="block input-icon input-icon-right">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    onChange={onChange}
                                                                    onBlur={checkEmailExists}
                                                                    value={email}
                                                                />

                                                                <i className="ace-icon fa fa-envelope"></i>
                                                            </span>
                                                            {errors.email && <span className="help-block">{errors.email}</span>}
                                                        </label>

                                                        <div className="clearfix">
                                                            <button type="submit" className="width-35 pull-right btn btn-sm btn-danger">
                                                                <i className="ace-icon fa fa-lightbulb-o"></i>
                                                                <span className="bigger-110">Send Me!</span>
                                                            </button>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>

                                            <div className="toolbar center">
                                                <Link to="/login">
                                                    <a className="back-to-login-link">
                                                        Back to login
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
);


export default ForgotForm;
