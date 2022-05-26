import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type {
  FetchSizeGuidesAction,
  ResetSizeGuidesStateAction,
  State,
} from './types';
import type { ReducerSwitch } from '../types';
import type { SizeGuide } from '@farfetch/blackout-client/sizeGuides/types';

export const INITIAL_STATE: State = {
  error: null,
  isLoading: false,
  result: null,
};

const error = (
  state: BlackoutError | null = INITIAL_STATE.error,
  action: FetchSizeGuidesAction,
): BlackoutError | null => {
  switch (action.type) {
    case actionTypes.FETCH_SIZE_GUIDES_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_SIZE_GUIDES_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state: boolean = INITIAL_STATE.isLoading,
  action: FetchSizeGuidesAction | AnyAction,
): boolean => {
  switch (action.type) {
    case actionTypes.FETCH_SIZE_GUIDES_REQUEST:
      return true;
    case actionTypes.FETCH_SIZE_GUIDES_SUCCESS:
    case actionTypes.FETCH_SIZE_GUIDES_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (
  state: SizeGuide[] | null = INITIAL_STATE.result,
  action: FetchSizeGuidesAction,
): SizeGuide[] | null => {
  switch (action.type) {
    case actionTypes.FETCH_SIZE_GUIDES_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = (state: State): State['error'] => state.error;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;
export const getResult = (state: State): State['result'] => state.result;

const reducers = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for sizeGuides state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const sizeGuidesReducer: ReducerSwitch<
  State,
  FetchSizeGuidesAction | ResetSizeGuidesStateAction
> = (state, action): State => {
  if (action.type === actionTypes.RESET_SIZE_GUIDES_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default sizeGuidesReducer;
