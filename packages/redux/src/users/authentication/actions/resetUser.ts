import * as actionTypes from '../../actionTypes.js';
import type { Dispatch } from 'redux';
import type {
  ResetUserAction,
  ResetUserEntitiesAction,
  ResetUserStateAction,
} from '../../types/index.js';
import type { StoreState } from '../../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset user related entities to its initial value.
 *
 * @returns Dispatch reset user entities action.
 */
const resetUserEntities =
  () => (dispatch: Dispatch<ResetUserEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_USER_ENTITIES,
    });
  };

/**
 * Reset user state to its initial value.
 *
 * @returns Dispatch reset user state action.
 */
const resetUserState =
  (fieldsToReset?: string[]) =>
  (dispatch: Dispatch<ResetUserStateAction>): void => {
    dispatch({
      payload: { fieldsToReset },
      type: actionTypes.RESET_USER_STATE,
    });
  };

/**
 * Reset user state and related entities to its initial value.
 *
 * @returns Dispatch reset user state and entities action.
 */
const resetUser =
  () =>
  (dispatch: ThunkDispatch<StoreState, unknown, ResetUserAction>): void => {
    dispatch(resetUserState());
    dispatch(resetUserEntities());
  };

export default resetUser;
