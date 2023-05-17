import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type {
  ResetBagOperationsAction,
  ResetBagOperationsEntitiesAction,
  ResetBagOperationsStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

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
export const resetEntities =
  () => (dispatch: Dispatch<ResetBagOperationsEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_BAG_OPERATIONS_ENTITIES,
    });
  };

/**
 * Reset bag operations state to its initial value.
 *
 * @example
 * ```
 * // State object before executing action
 * const state = {
 *   isLoading: { 456: true },
 *   error: { 123: new Error('...') }
 * };
 *
 * // Result of reset:
 * const state = {
 *   isLoading: {},
 *   error: {}
 * };
 *
 * // Usage
 * dispatch(resetBagOperationsState();
 * ```
 *
 * @returns Dispatch reset bag operations state action.
 */
const resetBagOperationsState =
  () =>
  (dispatch: Dispatch<ResetBagOperationsStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_BAG_OPERATIONS_STATE,
    });
  };

/**
 * Reset bag operations state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetBagOperations } from '@farfetch/blackout-redux';
 *
 * // State and store before executing action
 * const state = { error: { 123: new Error('...') }, isLoading: { 456: false } };
 * const store = {
 *     entities: {
 *         bagOperations: { 456: {...} }
 *     }
 * }
 *
 * // Result of resetBagOperations:
 * const state =  { error: {}, isLoading: {} }
 * const store = { entities: {} }
 *
 * // Usage
 * dispatch(resetBagOperations());
 *
 * ```
 *
 * @returns Dispatch reset bag operations state and entities action.
 */
const resetBagOperations =
  () =>
  (
    dispatch: ThunkDispatch<StoreState, unknown, ResetBagOperationsAction>,
  ): void => {
    dispatch(resetBagOperationsState());
    dispatch(resetEntities());
  };

export default resetBagOperations;
