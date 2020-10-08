import { userConstants } from '../constants';

import UserService from '../services/UserService';

export const userActions = {
    addUser,
    updateUser,
    getAllUsers,
    selectUser,
    searchUser,
    resetFilter,
    uploadReport,
    delete: _delete
};

const userService = new UserService()


function addUser(data) {
    return (dispatch, getState) => {
        const {token} = getState().authentication;
        dispatch(request());

        userService.addUser(data, token)
            .then(
                result => { 
                    //console.log(JSON.stringify(result))
                    dispatch(success(result.data.user));
                    
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function updateUser(data) {
    return (dispatch, getState) => {
        const {token} = getState().authentication;
        dispatch(request());

        userService.updateUser(data, token)
            .then(
                result => { 
                    //console.log(JSON.stringify(result))
                    dispatch(updateUserInStore(result.data.user));
                    dispatch(success())
                    
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.UPDATE_USER_REQUEST } }
    function updateUserInStore(user) { return { type: userConstants.UPDATE_USER_IN_STORE, user } }
    function success(user) { return { type: userConstants.UPDATE_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}


function getAllUsers() {
    return (dispatch, getState) => {
        dispatch(request());
        const token = getState().authentication.token
        userService.getAllUser(token)
            .then(
                
                result => dispatch(success(result.data.users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { 
        return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function selectUser(userId) {
    return (dispatch, getState) => {
        dispatch({ type: userConstants.SELECT_USER, userId });
        dispatch(request());
        const data = {userId}
        const token = getState().authentication.token
        userService.getUserReport(data, token)
            .then(
                
                result => dispatch(success(result.data.report)),
                error => dispatch(failure(error.toString()))
            );
        
    };

    function request() { return { type: userConstants.USER_REPORT_REQUEST } }
    function success(report) { return { type: userConstants.USER_REPORT_SUCCESS, report } }
    function failure(error) { return { type: userConstants.USER_REPORT_FAILURE, error } }
    
}

function resetFilter() {
    return (dispatch, getState) => {
        const users = getState().users.allUsers
        dispatch({ type: userConstants.RESET_FILTER, users });
        
    };
    
}

function searchUser(s) {
    return (dispatch, getState) => {
        const all = getState().users.allUsers
        const  query = s.toLowerCase()

        if (query && query != ""){
            const q = query.split(" ")
            const filtered = all.filter(user => {
                if (q[0] && user.email.toLowerCase().includes(q[0])){
                    return user
                }

                if (q[1] && user.email.toLowerCase().includes(q[1])){
                    return user
                }

                if (q[0] && user.firstName.toLowerCase().includes(q[0])){
                    return user
                }

                if (q[1] && user.firstName.toLowerCase().includes(q[1])){
                    return user
                }

                if (q[0] && user.lastName.toLowerCase().includes(q[0])){
                    return user
                }

                if (q[1] && user.lastName.toLowerCase().includes(q[1])){
                    return user
                }
                    
            })

            dispatch({ type: userConstants.FILTERED_USER, users: filtered })

        } else {

            dispatch({ type: userConstants.FILTERED_USER, user: all })
        }
        
    };
    
}


function uploadReport(data) {
    return (dispatch, getState) => {
        const {token} = getState().authentication;
        dispatch(request());

        userService.uploadReport(data, token)
            
            .then(
                result => { 
                    
        
                    dispatch(success(result.data))
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.REPORT_UPLOAD_REQUEST} }
    function success(data) { return { type: userConstants.REPORT_UPLOAD_SUCCESS, data } }
    function failure(error) { return { type: userConstants.REPORT_UPLOAD_FAILURE, error } }
}



// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}