import {
  USER_SET,
  USER_CLEAR,
  USER_SIGNING_SET,
  USER_SIGNING_UNSET,
  USER_SIGNING_TOGGLE,
  USER_LOGGING_SET,
  USER_LOGGING_UNSET,
  USER_LOGGING_TOGGLE,
  USER_SET_IS_LOGGING_OUT,
} from 'src/actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SET:
      return action.payload;

    case USER_CLEAR:
      return initialState;

    case USER_SIGNING_SET:
      return { ...state, isSigning: true, isLogging: false };

    case USER_SIGNING_UNSET:
      return { ...state, isSigning: false };

    case USER_SIGNING_TOGGLE: {
      const res = {
        ...state,
        isSigning: !state.isSigning,
      };

      if (res.isSigning && state.isLogging) {
        res.isLogging = false;
      }

      return res;
    }

    case USER_LOGGING_SET:
      return { ...state, isSigning: false, isLogging: true };

    case USER_LOGGING_UNSET:
      return { ...state, isLogging: false };

    case USER_LOGGING_TOGGLE: {
      const res = {
        ...state,
        isLogging: !state.isLogging,
      };

      if (res.isLogging && state.isSigning) {
        res.isSigning = false;
      }

      return res;
    }

    case USER_SET_IS_LOGGING_OUT:
      return { ...state, isLoggingOut: action.value };

    default:
      return state;
  }
};
