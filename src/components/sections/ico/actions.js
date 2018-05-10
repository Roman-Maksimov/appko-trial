import { SubmissionError } from 'redux-form';
import request from 'src/utils/request';

export const COMPONENTS_ICO_DONE = 'COMPONENTS_ICO_DONE';
export const done = () => ({ type: COMPONENTS_ICO_DONE });

export const submit = (values, dispatch) => request(
  '/xhr/ico/whitelist',
  { subscribe: values },
  'POST',
  true
)
  .then(() => dispatch(done()))
  .catch(error => {
    throw new SubmissionError({ email: `ico.errors.${error.errors._error}` });
  });
