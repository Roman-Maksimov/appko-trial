import { SubmissionError } from 'redux-form';
import request from 'src/utils/request';

export const COMPONENTS_DEMO_DONE = 'COMPONENTS_DEMO_DONE';
export const done = () => ({ type: COMPONENTS_DEMO_DONE });

export const submit = (values, dispatch) => request(
  '/xhr/demo/subscribe',
  { subscribe: values },
  'POST',
  true
)
  .then(() => dispatch(done()))
  .catch(error => {
    throw new SubmissionError({ email: `demo.errors.${error.errors._error}` });
  });
