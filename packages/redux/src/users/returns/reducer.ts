import * as actionTypes from './actionTypes.js';
import { createReducerWithResult } from '../../helpers/reducerFactory.js';

import type { UserReturnsState } from './types/index.js';

const isNormalized = true;

export const INITIAL_STATE: UserReturnsState = {
  result: null,
  error: null,
  isLoading: false,
};

const userReturns = createReducerWithResult(
  'FETCH_USER_RETURNS',
  INITIAL_STATE,
  actionTypes,
  isNormalized,
);

export default userReturns;
