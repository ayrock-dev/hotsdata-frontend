import axios from 'axios';

import Auth from '../lib/Auth';

export const SESSION_IS_LOGGING_IN = 'SESSION_IS_LOGGING_IN';
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAILED = 'SESSION_LOGIN_FAILED';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export function loginInProgress(bool) {
  return {
    type: SESSION_IS_LOGGING_IN,
    isLoading: bool
  }
}

export function loginSuccess(userResponse) {
  return {
    type: SESSION_LOGIN_SUCCESS,
    session: userResponse
  }
}

export function loginFailed(response) {
  return {
    type: SESSION_LOGIN_FAILED,
    error: response.msg
  }
}

export function logoutUser() {
  Auth.deauthenticateUser();

  return {
    type: SESSION_LOGOUT,
    payload: { msg: "Logout Successful" }
  }
}

export function loginUser(credentials) {
  return (dispatch) => {
    dispatch(loginInProgress(true));

    axios.post("http://api.hotsdata.com/login", credentials)
      .then(response => {
        let responseData = response.data;

        if (responseData.hasOwnProperty('msg') && responseData.msg.indexOf('Error') > -1) {
          dispatch(loginInProgress(false));
          dispatch(loginFailed(responseData));
        } else {
          dispatch(loginInProgress(false));
          dispatch(loginSuccess(responseData));
        }
      });
  };
}