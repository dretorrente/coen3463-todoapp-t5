import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Routes from './config/routes';
import { Provider } from 'react-redux';
import store from './containers/store/store'
import { saveState } from './containers/store/localStorage';
import throttle from 'lodash/throttle';
store.subscribe(throttle(() => {
        saveState({
            todo: store.getState().todo,
            user: store.getState().user,
            token: store.getState().token
        });
}, 1000));
render(
    <Provider store={store}>
        <Routes history={browserHistory} />
    </Provider>, document.getElementById('root'));


