import lang from './lang';
import loader from './loader';
import menu from './menu';
import translate from './translate';
import user from './user';
import viewport from './viewport';

import components from './components';

export default {
  _csrf: (state = {}) => state,
  lang,
  loader,
  menu,
  translate,
  user,
  components,
  viewport,
};
