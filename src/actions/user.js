import request from 'src/utils/request';

export const USER_SET = 'USER_LOGGING_SET';
export const USER_CLEAR = 'USER_CLEAR';
export const USER_SIGNING_SET = 'USER_SIGNING_SET';
export const USER_SIGNING_UNSET = 'USER_SIGNING_UNSET';
export const USER_SIGNING_TOGGLE = 'USER_SIGNING_TOGGLE';
export const USER_LOGGING_SET = 'USER_LOGGING_SET';
export const USER_LOGGING_UNSET = 'USER_LOGGING_UNSET';
export const USER_LOGGING_TOGGLE = 'USER_LOGGING_TOGGLE';
export const USER_SET_IS_LOGGING_OUT = 'USER_SET_IS_LOGGING_OUT';

export const userSet = payload => ({
  type: USER_SET,
  payload,
});

export const userClear = () => ({
  type: USER_CLEAR,
});

export const userToggleSignupForm = () => ({
  type: USER_SIGNING_TOGGLE,
});

export const userToggleLoginForm = () => ({
  type: USER_LOGGING_TOGGLE,
});

export const userSignup = values => dispatch => request(
  '/xhr/auth/signup',
  { signup: values },
  'POST',
  true
).then(data => dispatch(userSet(data)));

export const userLogin = values => dispatch => request(
  '/xhr/auth/login',
  { login: values },
  'POST',
  true
).then(data => dispatch(userSet(data)));

export const userSetIsLoggingOut = (value = true) => ({
  type: USER_SET_IS_LOGGING_OUT,
  value,
});

export const userLogout = () => dispatch => {
  dispatch(userSetIsLoggingOut());
  return request('/xhr/auth/logout')
    .catch(() => dispatch(userSetIsLoggingOut(false)))
    .then(() => dispatch(userClear()));
};
