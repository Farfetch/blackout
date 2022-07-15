import * as actionTypes from '../actionTypes';
import resetUserState from './resetUserState';
import type { Dispatch } from 'redux';
import type { ResetUserAction, ResetUserEntitiesAction } from '../types';
import type { StoreState } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset user related entities to its initial value.
 *
 * @example
 * ```ts
 * // Store before executing action
 * const store = {
 *  entities: {
 *    userItems: { 1: {...} }
 *  }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: {} }
 * ```
 * @returns Dispatch reset user entities action.
 */
const resetEntities = () => (dispatch: Dispatch<ResetUserEntitiesAction>) => {
  dispatch({
    type: actionTypes.RESET_USER_ENTITIES,
  });
};

/**
 * Reset user state and related entities to its initial value.
 *
 * @example
 * ```ts
 * import { resetUser } from '@farfetch/blackout-redux/users';
 *
 * // State and store before executing action
 * const state = { id: '123', error: null, isLoading: false, result: {...}, items: {...} };
 * const store = {
 *     entities: {
 *         userItems: { 1: {...} }
 *     }
 * }
 *
 * // Result of resetUser:
 * const state =  { id: null, error: null, isLoading: false, result: null, items: {} }
 * const store = { entities: {} }
 *
 * // Usage
 * dispatch(resetUser());
 * ```
 *
 * @returns Dispatch reset user state and entities action.
 */
const resetUser =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetUserAction | ResetUserEntitiesAction
    >,
  ): void => {
    dispatch(resetUserState());
    dispatch(resetEntities());
  };

export default resetUser;
