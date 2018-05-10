import AOS from 'aos';
import { push } from 'react-router-redux';

export const TRANSLATE_SET = 'TRANSLATE_SET';
export const translateSet = lang => dispatch => {
  dispatch(push(`/${lang}`));

  dispatch({
    type: TRANSLATE_SET,
    lang,
  });

  setTimeout(AOS.refreshHard, 300);
};
