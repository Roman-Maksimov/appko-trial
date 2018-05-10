import { COMPONENTS_DEMO_DONE } from 'src/components/sections/demo/actions';

const initialState = {
  isDone: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPONENTS_DEMO_DONE:
      return {
        ...state,
        isDone: true,
      };

    default:
      return state;
  }
};
