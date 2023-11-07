import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type {
  ResetExchangeFiltersEntitiesAction,
  ResetExchangeFilterStateAction,
} from '../index.js';
import type { StoreState } from '../../index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset exchange filters slice state only
 * to its initial value.
 *
 * @returns - Thunk.
 */
const resetExchangeFilterState =
  () => (dispatch: Dispatch<ResetExchangeFilterStateAction>) => {
    dispatch({
      type: actionTypes.RESET_EXCHANGE_FILTERS_STATE,
    });
  };

/**
 * Reset exchange filters related entities to its initial value.
 *
 * @returns Dispatch reset bag entities action.
 */
const resetEntities =
  () => (dispatch: Dispatch<ResetExchangeFiltersEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_EXCHANGE_FILTERS_ENTITIES,
    });
  };

/**
 * Reset exchange filters state and related entities to its initial value.
 *
 * @returns Dispatch reset exchange filters state and entities action.
 */
const resetExchangeFilters =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetExchangeFilterStateAction | ResetExchangeFiltersEntitiesAction
    >,
  ): void => {
    dispatch(resetExchangeFilterState());
    dispatch(resetEntities());
  };

export default resetExchangeFilters;
