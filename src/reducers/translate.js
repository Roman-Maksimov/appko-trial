import { TRANSLATE_SET } from 'src/actions';
import { LANGS } from 'src/components/langs';

export default (state = require(`src/translations/${Object.keys(LANGS)[0]}.json`), action) => {
  switch (action.type) {
    case TRANSLATE_SET:
      return require(`src/translations/${action.lang}.json`);

    default:
      return state;
  }
};
