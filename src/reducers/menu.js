import { MENU_OPEN, MENU_CLOSE, MENU_TOGGLE } from 'src/actions';

export default (state = false, action) => {
  switch (action.type) {
    case MENU_OPEN:
      return true;

    case MENU_CLOSE:
      return false;

    case MENU_TOGGLE:
      return !state;

    default:
      return state;
  }
};
