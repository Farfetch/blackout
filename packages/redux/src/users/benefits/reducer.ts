import * as actionTypes from './actionTypes';
import reducerFactory from '../../helpers/reducerFactory';
import type { AnyAction } from 'redux';
import type { StoreState } from '../../types/storeState.types';
import type { UserEntity } from '../../entities';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
};

export const entitiesMapper = {
  [actionTypes.FETCH_USER_BENEFITS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { user: currentUser } = state;

    if (!currentUser) {
      return state;
    }

    const { benefits } = action.payload.entities;
    // Add benefits reference to user entity
    const user = {
      ...(state.user as NonNullable<UserEntity>),
      benefits: action.payload.result,
    };

    return {
      ...state,
      user,
      benefits,
    };
  },
};

export default reducerFactory(
  'FETCH_USER_BENEFITS',
  INITIAL_STATE,
  actionTypes,
);
