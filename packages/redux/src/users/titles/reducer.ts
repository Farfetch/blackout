import * as actionTypes from './actionTypes.js';
import reducerFactory from '../../helpers/reducerFactory.js';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
};

export default reducerFactory('FETCH_USER_TITLES', INITIAL_STATE, actionTypes);
