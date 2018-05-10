import { COMPONENTS_ICO_DONE } from 'src/components/sections/ico/actions';

const initialState = {
  isDone: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPONENTS_ICO_DONE:
      return {
        ...state,
        isDone: true,
      };

    default:
      return state;
  }
};
