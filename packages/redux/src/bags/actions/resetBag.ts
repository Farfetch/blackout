import * as actionTypes from '../actionTypes';
import resetBagState from './resetBagState';
import type { Dispatch } from 'redux';
import type {
  ResetBagAction,
  ResetBagEntitiesAction,
  ResetBagOperationsEntitiesAction,
} from '../types';
import type { StoreState } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset bag related entities to its initial value.
 *
 * @example
 * ```
 * // Store before executing action
 * const store = {
 *  entities: {
 *    bagItems: { 1: {...} }
 *  }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: {} }
 * ```
 *
 * @returns Dispatch reset bag entities action.
 */
const resetEntities = () => (dispatch: Dispatch<ResetBagEntitiesAction>) => {
  dispatch({
    type: actionTypes.RESET_BAG_ENTITIES,
  });
};

/**
 * Reset bag operations entities to its initial value.
 *
 * @example
 * ```
 * // Store before executing action
 * const store = {
 *     entities: {
 *         bag: { 123: {...} },
 *         bagItems: { 1: {...} },
 *         bagOperations: { 1: {...} }
 *     }
 * }
 *
 * // Result of reset bag operations entities:
 * const store = {
 *     entities: {
 *         bag: { 123: {...} },
 *         bagItems: { 1: {...} }
 *     }
 * }
 * ```
 *
 * @returns Dispatch reset bag operations entities action.
 */
export const resetBagOperationsEntities =
  () => (dispatch: Dispatch<ResetBagOperationsEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_BAG_OPERATIONS_ENTITIES,
    });
  };

/**
 * Reset bag state and related entities to its initial value.
 *
 * @example
 * ```
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
 * ```
 *
 * @returns Dispatch reset bag state and entities action.
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
