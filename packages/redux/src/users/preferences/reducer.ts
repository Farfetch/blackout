import * as actionTypes from './actionTypes';
import reducerFactory from '../../helpers/reducerFactory';
import type { AnyAction } from 'redux';
import type { StoreState } from '../../types/storeState.types';
import type { UserEntity } from '../../entities';

export const INITIAL_STATE = {
  preferences: {
    error: null,
    isLoading: false,
  },
  updatePreferences: {
    error: null,
    isLoading: false,
  },
};

export const entitiesMapper = {
  [actionTypes.FETCH_USER_PREFERENCES_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { user: currentUser } = state;

    if (!currentUser) {
      return state;
    }

    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user: UserEntity = {
      ...(state.user as NonNullable<UserEntity>),
      preferences: action.payload.result,
    };

    return {
      ...state,
      user,
      preferences: preferences || {},
    };
  },
  [actionTypes.UPDATE_USER_PREFERENCES_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { user: currentUser } = state;

    if (!currentUser) {
      return state;
    }

    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user: UserEntity = {
      ...(state.user as NonNullable<UserEntity>),
      preferences: action.payload.result,
    };

    return {
      ...state,
      user,
      preferences,
    };
  },
};

const preferences = reducerFactory(
  'FETCH_USER_PREFERENCES',
  INITIAL_STATE.preferences,
  actionTypes,
);

const updatePreferences = reducerFactory(
  'UPDATE_USER_PREFERENCES',
  INITIAL_STATE.updatePreferences,
  actionTypes,
);

const reducer = {
  preferences,
  updatePreferences,
};

export default reducer;
