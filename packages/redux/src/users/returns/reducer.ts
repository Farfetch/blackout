import * as actionTypes from './actionTypes';
import { createReducerWithResult } from '../../helpers/reducerFactory';
import type * as T from './types';

export const INITIAL_STATE: T.UserReturnsState = {
  result: null,
  error: null,
  isLoading: false,
};

const userReturnsReducer = createReducerWithResult(
  'FETCH_USER_RETURNS',
  INITIAL_STATE,
  actionTypes,
);

export default userReturnsReducer;
