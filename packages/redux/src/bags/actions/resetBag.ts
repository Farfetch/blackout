import { RESET_BAG_ENTITIES } from '../actionTypes';
import resetBagState from './resetBagState';
import type { Dispatch } from 'redux';
import type { ResetBagAction, ResetBagEntitiesAction } from '../types';
import type { StoreState } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset bag related entities to its initial value.
 *
 * @private
 *
 * @name resetEntities
 *
 * @example
 * // Store before executing action
 * const store = {
 *  entities: {
 *    bagItems: { 1: {...} }
 *  }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: {} }
 * @returns {Function} Dispatch reset bag entities action.
 */
const resetEntities = () => (dispatch: Dispatch<ResetBagEntitiesAction>) => {
  dispatch({
    type: RESET_BAG_ENTITIES,
  });
};

/**
 * Reset bag state and related entities to its initial value.
 *
 * @memberof module:bags/actions
 *
 * @name resetBag
 *
 * @example
 * import { resetBag } from '@farfetch/blackout-redux/bags';
 *
 * // State and store before executing action
 * const state = { id: '123', error: null, isLoading: false, result: {...}, items: {...} };
 * const store = {
 *     entities: {
 *         bagItems: { 1: {...} }
 *     }
 * }
 *
 * // Result of resetBag:
 * const state =  { id: null, error: null, isLoading: false, result: null, items: {} }
 * const store = { entities: {} }
 *
 * // Usage
 * dispatch(resetBag());
 *
 * @returns {Function} Dispatch reset bag state and entities action.
 */
const resetBag =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetBagAction | ResetBagEntitiesAction
    >,
  ): void => {
    dispatch(resetBagState());
    dispatch(resetEntities());
  };

export default resetBag;
