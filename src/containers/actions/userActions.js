import axios from "axios";

import {SET_CURRENT_USER, SET_CURRENT_USERTOKEN} from './types/types';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
    }
}


export function setCurrentUserToken(user) {
    return {
        type: SET_CURRENT_USERTOKEN,
        user
    }
}
export function setToken(token) {
    return dispatch => {
        return axios.get(`/auth/reset/${token}`);
    }
}




export function fetchUser() {
    return {
        type: "FETCH_USER"
    }
}

export function UserSignUp(data) {
    return dispatch => {
            return axios.post("/auth/register", data)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.success);
                return response;
            })
            .catch((error) => {

                console.log('reponse', error);
                console.log('status', error.response.data.success);
                // console.log('error', error);
                // console.log('errorType', typeof error);
                // console.log('error', Object.assign({}, error));
                // dispatch({type: "FETCH_USER_REJECTED", payload: error.response.data.errors});
                error.data = error.response.data.errors;
                error.data.success = error.response.data.success;
                return error;
            })

    }
}



export function UserLogin(data) {
    return dispatch => {
        return axios.post("/auth/login", data)
            .then((response) => {
                console.log("ASDASDASD", response.data.user);
                console.log("WASADASDASDASDASD", response.data.success);

                // const token = response.data.token;
                // localStorage.setItem('jwtToken', token);
                // setAuthorizationToken(token);

                dispatch(setCurrentUser(response.data.user));
                // // dispatch({type: "FETCH_USER_REJECTED", payload: error.response.data.errors});
                // console.log(jwt.decode(token));

                return response;
            })
            .catch((error) => {
                // console.log('response', error);
                // console.log('data', error.response);
                console.log('ERRORRRRSSS', error.response.data.errors);
                console.log('SUCCESS', error.response.data.success);
                // // console.log('error', error);
                // // console.log('errorType', typeof error);
                // // console.log('error', Object.assign({}, error));
                // // dispatch({type: "FETCH_USER_REJECTED", payload: error.response.data.errors});
                error.data = error.response.data.errors;
                error.data.success = error.response.data.success;
                return error;
            })

    }
}

export function UserForgot(data) {
    return dispatch => {
        return axios.post("/auth/forgot", data)
            .then((response) => {
                console.log(response.data.userToken);
                dispatch(setCurrentUserToken(response.data.userToken));
                console.log(response.data.success);
                return response;
            })
            .catch((error) => {

                console.log('reponse', error);
                console.log('status', error.response.data.success);
                // console.log('error', error);
                // console.log('errorType', typeof error);
                // console.log('error', Object.assign({}, error));
                // dispatch({type: "FETCH_USER_REJECTED", payload: error.response.data.errors});
                error.data = error.response.data.errors;
                error.data.success = error.response.data.success;
                return error;
            })

    }
}
// export function UserRes(data) {
//     return dispatch => {
//         return axios.post("/auth/reset", data)
//             .then((response) => {
//                 console.log(response.data);
//                 console.log(response.data.success);
//                 return response;
//             })
//             .catch((error) => {
//                 console.log('response', error);
//                 console.log('status', error.response.data.success);
//                 // console.log('error', error);
//                 // console.log('errorType', typeof error);
//                 // console.log('error', Object.assign({}, error));
//                 // dispatch({type: "FETCH_USER_REJECTED", payload: error.response.data.errors});
//                 error.data = error.response.data.errors;
//                 error.data.success = error.response.data.success;
//                 return error;
//             })
//
//     }
// }


export function UserReset(token) {
    return dispatch => {
        return axios.post(`/auth/reset/${token}`)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.success);
                return response;
            })
            .catch((error) => {
                console.log('response', error);
                console.log('status', error.response.data.success);
                // console.log('error', error);
                // console.log('errorType', typeof error);
                // console.log('error', Object.assign({}, error));
                // dispatch({type: "FETCH_USER_REJECTED", payload: error.response.data.errors});
                error.data = error.response.data.errors;
                error.data.success = error.response.data.success;
                return error;
            })

    }
}



export function isEmailExists(identifier) {
    return dispatch => {
        return axios.get(`/auth/forgot/${identifier}`);
    }
}




export function logout() {
    return dispatch => {
        return axios.get("/auth/logout")
            .then((response) => {
                localStorage.removeItem('state');

            });
    }
}

export function isUserExists(identifier) {
    return dispatch => {
        return axios.get(`/auth/register/${identifier}`);
    }
}

export function isLogUserExists(identifier) {
    return dispatch => {
        return axios.get(`/auth/login/${identifier}`);
    }
}

