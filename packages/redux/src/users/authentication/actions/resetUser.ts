import * as actionTypes from '../../actionTypes';
import resetUserState from './resetUserState';
import type { Dispatch } from 'redux';
import type { ResetUserAction, ResetUserEntitiesAction } from '../../types';
import type { StoreState } from '../../../types';
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
 * Reset user state and related entities to its initial value.
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
    dispatch(resetUserEntities());
  };

export default resetUser;
