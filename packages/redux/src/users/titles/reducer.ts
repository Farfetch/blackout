import * as actionTypes from './actionTypes';
import reducerFactory from '../../helpers/reducerFactory';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
};

export default reducerFactory('FETCH_USER_TITLES', INITIAL_STATE, actionTypes);
