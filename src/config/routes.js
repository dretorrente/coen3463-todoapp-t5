import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import { render } from 'react-dom';
import Todo from '../containers/TodoPage';
import LoginPage from '../containers/LoginPage';
import SignUpPage from '../containers/SignUpPage';
import ForgotPage from '../containers/ForgotPage';
import ResetPage from '../containers/ResetPage';
import reqAuth from '../containers/reqAuth';

const Routes = (props) => (
	<Router {...props}>
		<Route path='register' title="Register" component={SignUpPage} />
		<Route path='login' title="Login" component={LoginPage} />
		<Route path='/' title="Home" component={reqAuth(Todo)} />
        <Route path='reset' title="Reset" component={ResetPage} />
		<Route path='forgot' title="Forgot" component={ForgotPage} />

	</Router>
);

export default Routes;
