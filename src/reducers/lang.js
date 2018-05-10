import { TRANSLATE_SET } from 'src/actions';
import { LANGS } from 'src/components/langs';

export default (state = Object.keys(LANGS)[0], action) => {
  switch (action.type) {
    case TRANSLATE_SET:
      return action.lang;

    default:
      return state;
  }
};
