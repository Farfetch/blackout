import {
  RESET_EXCHANGE_FILTERS_ENTITIES,
  RESET_EXCHANGE_FILTERS_STATE,
} from '../actionTypes';

/**
 * Reset exchange filters slice state only
 * to its initial value.
 *
 * @returns {Function} - Thunk.
 */
const resetExchangeFilterState = () => dispatch => {
  dispatch({
    type: RESET_EXCHANGE_FILTERS_STATE,
  });
};

/**
 * Reset exchange filters related entities to its initial value.
 *
 * @returns {Function} - Dispatch reset bag entities action.
 */
const resetEntities = () => dispatch => {
  dispatch({
    type: RESET_EXCHANGE_FILTERS_ENTITIES,
  });
};

/**
 * Reset exchange filters state and related entities to its initial value.
 *
 * @returns {Function} - Dispatch reset exchange filters state and entities action.
 */
const resetExchangeFilters = () => dispatch => {
  dispatch(resetExchangeFilterState());
  dispatch(resetEntities());
};

export default resetExchangeFilters;
