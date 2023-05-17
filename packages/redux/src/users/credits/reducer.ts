import * as actionTypes from './actionTypes.js';
import reducerFactory from '../../helpers/reducerFactory.js';
import type { AnyAction } from 'redux';
import type { StoreState } from '../../types/storeState.types.js';
import type { UserEntity } from '../../entities/index.js';

export const INITIAL_STATE = {
  credits: {
    error: null,
    isLoading: false,
  },
  creditMovements: {
    error: null,
    isLoading: false,
  },
};

export const entitiesMapper = {
  [actionTypes.FETCH_USER_CREDITS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { user: currentUser } = state;

    if (!currentUser) {
      return state;
    }

    // Not type safe, should have an action type here...
    const { credits } = action.payload;
    // Add credit to user entity
    const user = { ...(state.user as NonNullable<UserEntity>), credits };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { user: currentUser } = state;

    if (!currentUser) {
      return state;
    }

    // Not type safe, should have an action type here...
    const { creditMovements } = action.payload;
    // Add movements to user entity
    const user = {
      ...(state.user as NonNullable<UserEntity>),
      creditMovements,
    };

    return {
      ...state,
      user,
    };
  },
};

const reducer = {
  credits: reducerFactory(
    'FETCH_USER_CREDITS',
    INITIAL_STATE.credits,
    actionTypes,
  ),
  creditMovements: reducerFactory(
    'FETCH_USER_CREDIT_MOVEMENTS',
    INITIAL_STATE.creditMovements,
    actionTypes,
  ),
};

export default reducer;
