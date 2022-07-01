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
  [actionTypes.FETCH_USER_CONTACTS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { user: currentUser } = state;

    if (!currentUser) {
      return state;
    }

    const { contacts } = action.payload.entities;
    // Add contacts reference to user entity
    const user = {
      ...(state.user as NonNullable<UserEntity>),
      contacts: action.payload.result,
    };

    return {
      ...state,
      user,
      contacts,
    };
  },
};

export default reducerFactory(
  ['FETCH_USER_CONTACTS', 'FETCH_USER_CONTACT'],
  INITIAL_STATE,
  actionTypes,
);
