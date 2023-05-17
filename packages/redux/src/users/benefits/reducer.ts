import * as actionTypes from './actionTypes.js';
import reducerFactory from '../../helpers/reducerFactory.js';
import type { AnyAction } from 'redux';
import type { StoreState } from '../../types/storeState.types.js';
import type { UserEntity } from '../../entities/index.js';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
};

export const entitiesMapper = {
  [actionTypes.FETCH_USER_BENEFITS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
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
