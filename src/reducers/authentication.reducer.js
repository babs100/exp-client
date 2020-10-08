import { userConstants } from '../constants';

// let user = JSON.parse(localStorage.getItem('id_token'));
// const initialState = user ? { loggedIn: true, user } : {};
const initialState = {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    
    
    case userConstants.USER_PROFILE:
      return {
        
        profile: action.profile
      };
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        user: action.payload.user,
        token: action.payload.token,

      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn:false,
        loggingIn: false,
        error: action.error
      };
    case userConstants.TOKEN_SUCCESS:
      return {
        loggedIn: true,
        token: action.token
      };
    case userConstants.PASSWORD_CHANGE_REQUEST:
      return {
        ...state,
        changingPassword: true,
      };
    case userConstants.PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        passwordChangeSuccess: true,

      };
    case userConstants.PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        changingPassword: false,
        passwordChangeSuccess:false,
        passwordChangeError: action.error
      };

    case userConstants.LOGOUT:
      return {};
      
    default:
      return state
  }
}