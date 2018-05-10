import { LOADER_SHOW, LOADER_HIDE } from 'src/actions';

export default (state = false, action) => {
  switch (action.type) {
    case LOADER_SHOW:
      return true;

    case LOADER_HIDE:
      return false;

    default:
      return state;
  }
};
