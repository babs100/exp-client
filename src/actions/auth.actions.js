import { userConstants } from '../constants';
import AuthService from '../services/AuthService';
// import { alertActions } from './';
import Router from 'next/router';

export const authActions = {
    cleanState,
    login,
    changePassword,
    logout,
    loggedIn,
    register,
    
    delete: _delete
};

const auth = new AuthService()



function login(email, password) {
    return (dispatch, getState) => {
        dispatch(request({ email }));

        auth.loginAdmin(email, password)
            .then(
                result => { 
                    const payload = result.data
                    dispatch(success(payload));
                    Router.replace('/home');
                },
                error => {
                    //console.log(error.toString())
                    dispatch(failure(error.toString()));
                    
                }
            );
    };

    
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(payload) { return { type: userConstants.LOGIN_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }










}

function changePassword(password) {
    return (dispatch, getState) => {
        //dispatch(request({ email }));
        const {token} = getState().authentication;
        //console.log('Lo in user action ' + token)
        auth.changeAdminPassword({password}, token)
            .then(
                result => { 
                    dispatch(success());
                },
                error => {
                    //console.log(error.toString())
                    dispatch(failure(error.toString()));
                    
                }
            );
    };

    
    function request() { return { type: userConstants.PASSWORD_CHANGE_REQUEST } }
    function success() { return { type: userConstants.PASSWORD_CHANGE_SUCCESS } }
    function failure(error) { return { type: userConstants.PASSWORD_CHANGE_FAILURE, error } }



}

function loggedIn() {
    return dispatch => {
        dispatch(request());
        dispatch(success(auth.loggedIn()));
    };
    function request() { return { type: userConstants.TOKEN_REQUEST } }
    function success(status) { return { type: userConstants.TOKEN_SUCCESS, status } }
}



function logout() {
    return dispatch => {

        auth.logout()
        //dispatch(success())

        Router.replace('/');
           
    };

    function success() { return { type: userConstants.LOGOUT } }
}


function cleanState() {
    return dispatch => {

        dispatch(success())
           
    };

    function success() { return { type: userConstants.LOGOUT } }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        auth.register(user)
            .then(
                user => { 
                    dispatch(success());
                    Router.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        auth.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}