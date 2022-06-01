import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchDesignersAction,
  FetchDesignersFailureAction,
  FetchDesignersRequestAction,
  FetchDesignersSuccessAction,
  SetDesignersResultHashAction,
  State,
} from './types';
import type { ReducerSwitch } from '../types';

export const INITIAL_STATE: State = {
  error: {},
  hash: null,
  isLoading: {},
  result: {},
};

const error = (state = INITIAL_STATE.error, action: FetchDesignersAction) => {
  switch (action.type) {
    case actionTypes.FETCH_DESIGNERS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: undefined,
      };
    case actionTypes.FETCH_DESIGNERS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: action.payload.error,
      };
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: FetchDesignersAction) => {
  switch (action.type) {
    case actionTypes.FETCH_DESIGNERS_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: action.payload.result,
      };
    default:
      return state;
  }
};

const hash = (
  state = INITIAL_STATE.hash,
  action: SetDesignersResultHashAction,
) => {
  switch (action.type) {
    case actionTypes.SET_DESIGNERS_RESULT_HASH:
      return action.meta.hash;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | FetchDesignersRequestAction
    | FetchDesignersSuccessAction
    | FetchDesignersFailureAction
    | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_DESIGNERS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: true,
      };
    case actionTypes.FETCH_DESIGNERS_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: false,
      };
    case actionTypes.FETCH_DESIGNERS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: undefined,
      };
    default:
      return state;
  }
};

export const getError = (state: State): State['error'] => state.error;
export const getHash = (state: State): State['hash'] => state.hash;
export const getResult = (state: State): State['result'] => state.result;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;

const reducers = combineReducers({
  error,
  hash,
  isLoading,
  result,
});

/**
 * Switch for designers state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const designersReducer: ReducerSwitch<
  State,
  FetchDesignersAction | SetDesignersResultHashAction
> = (state, action): State => {
  if (action.type === actionTypes.RESET_DESIGNERS_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default designersReducer;
