import { VIEWPORT_SET } from '../actions';

const getDocumentSize = (param) => {
  let result;

  if (window.document) {
    const name = param.charAt(0).toUpperCase() + param.slice(1);
    const elem = window.document;
    const doc = elem.documentElement;

    result = Math.max(
      elem.body[`scroll${name}`],
      doc[`scroll${name}`],
      elem.body[`offset${name}`],
      doc[`offset${name}`],
      doc[`client${name}`]
    );
  } else {
    result = 0;
  }

  return result;
};

const getViewPort = () => (['innerWidth', 'innerHeight', 'screen'].every(v => v in window)) && ({
  screenWidth: getDocumentSize('width'),
  screenHeight: getDocumentSize('height'),
}) || ({
  screenWidth: 0,
  screenHeight: 0,
});

const initialState = Object.assign({}, getViewPort(), {
  scrollOffset: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case VIEWPORT_SET:
      return {
        ...state,
        ...getViewPort(),
      };

    default:
      return state;
  }
};
