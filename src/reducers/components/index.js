import demo from './demo';
import ico from './ico';

const initialState = {
  demo: demo(undefined, {}),
  ico: ico(undefined, {}),
};

export default (state = initialState, action) => ({
  demo: demo(state.demo, action),
  ico: ico(state.ico, action),
});
