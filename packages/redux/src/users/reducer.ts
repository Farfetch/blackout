/**
 * @module users/reducer
 * @category Users
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../authentication/actionTypes';
import { reducerFactory } from '../helpers';
import type {
  CreateGuestUserAction,
  CreateGuestUserFailureAction,
  CreateGuestUserRequestAction,
  CreateGuestUserSuccessAction,
  CreateUserAttributesAction,
  CreateUserAttributesFailureAction,
  CreateUserAttributesRequestAction,
  FetchGuestUserAction,
  FetchGuestUserFailureAction,
  FetchGuestUserRequestAction,
  FetchGuestUserSuccessAction,
  FetchUserAction,
  FetchUserAttributeAction,
  FetchUserAttributeFailureAction,
  FetchUserAttributeRequestAction,
  FetchUserAttributesAction,
  FetchUserAttributesFailureAction,
  FetchUserAttributesRequestAction,
  FetchUserAttributesSuccessAction,
  FetchUserAttributeSuccessAction,
  FetchUserFailureAction,
  FetchUserRequestAction,
  FetchUserSuccessAction,
  LogoutAction,
  RemoveUserAttributeAction,
  RemoveUserAttributeFailureAction,
  RemoveUserAttributeRequestAction,
  SetUserAttributeAction,
  SetUserAttributeFailureAction,
  SetUserAttributeRequestAction,
  State,
  UpdateUserAction,
  UpdateUserAttributeAction,
  UpdateUserAttributeFailureAction,
  UpdateUserAttributeRequestAction,
  UpdateUserFailureAction,
  UpdateUserRequestAction,
  UpdateUserSuccessAction,
} from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: State = {
  error: null,
  result: null,
  isLoading: false,
  benefits: {
    error: null,
    isLoading: false,
  },
  preferences: {
    error: null,
    isLoading: false,
  },
  updatePreferences: {
    error: null,
    isLoading: false,
  },
  titles: {
    error: null,
    isLoading: false,
  },
  credit: {
    error: null,
    isLoading: false,
  },
  creditMovements: {
    error: null,
    isLoading: false,
  },
  contacts: {
    error: null,
    isLoading: false,
  },
  userAttributes: {
    result: null,
    error: null,
    isLoading: false,
  },
};

export const entitiesMapper = {
  [actionTypes.FETCH_BENEFITS_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { benefits } = action.payload.entities;
    // Add benefits reference to user entity
    const user = { ...state?.user, benefits: action.payload.result };

    return {
      ...state,
      user,
      benefits,
    };
  },
  [actionTypes.FETCH_PREFERENCES_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user = { ...state?.user, preferences: action.payload.result };

    return {
      ...state,
      user,
      preferences: preferences || {},
    };
  },
  [actionTypes.FETCH_CREDIT_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { credit } = action.payload;
    // Add credit to user entity
    const user = { ...state?.user, credit };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.FETCH_CREDIT_MOVEMENTS_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { creditMovements } = action.payload;
    // Add movements to user entity
    const user = { ...state?.user, creditMovements };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.FETCH_CONTACTS_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { contacts } = action.payload.entities;
    // Add contacts reference to user entity
    const user = { ...state?.user, contacts: action.payload.result };

    return {
      ...state,
      user,
      contacts,
    };
  },
  [actionTypes.UPDATE_PREFERENCES_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user = { ...state?.user, preferences: action.payload.result };

    return {
      ...state,
      user,
      preferences,
    };
  },
  [LOGOUT_SUCCESS]: (state: State) => {
    const {
      result,
      benefits,
      preferences,
      updatePreferences,
      titles,
      credit,
      creditMovements,
      contacts,
      userAttributes,
      ...rest
    } = state;

    return { ...rest };
  },
};

/**
 * `error` reducer.
 */

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchUserAttributesFailureAction
    | FetchUserAttributesRequestAction
    | CreateUserAttributesFailureAction
    | CreateUserAttributesRequestAction
    | FetchUserAttributeFailureAction
    | FetchUserAttributeRequestAction
    | SetUserAttributeFailureAction
    | SetUserAttributeRequestAction
    | UpdateUserAttributeFailureAction
    | UpdateUserAttributeRequestAction
    | RemoveUserAttributeFailureAction
    | RemoveUserAttributeRequestAction
    | FetchUserFailureAction
    | FetchUserRequestAction
    | UpdateUserFailureAction
    | UpdateUserRequestAction
    | CreateGuestUserFailureAction
    | CreateGuestUserRequestAction
    | FetchGuestUserFailureAction
    | FetchGuestUserRequestAction
    | LogoutAction,
): State['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.UPDATE_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.FETCH_GUEST_USER_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTES_FAILURE:
    case actionTypes.CREATE_USER_ATTRIBUTES_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTE_FAILURE:
    case actionTypes.SET_USER_ATTRIBUTE_FAILURE:
    case actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.FETCH_GUEST_USER_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTES_REQUEST:
    case actionTypes.CREATE_USER_ATTRIBUTES_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTE_REQUEST:
    case actionTypes.SET_USER_ATTRIBUTE_REQUEST:
    case actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST:
    case actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action:
    | FetchGuestUserSuccessAction
    | FetchUserSuccessAction
    | UpdateUserSuccessAction
    | CreateGuestUserSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_GUEST_USER_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | FetchUserAttributesAction
    | CreateUserAttributesAction
    | FetchUserAttributeAction
    | SetUserAttributeAction
    | UpdateUserAttributeAction
    | RemoveUserAttributeAction
    | FetchUserAction
    | UpdateUserAction
    | CreateGuestUserAction
    | FetchGuestUserAction
    | LogoutAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.FETCH_GUEST_USER_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTES_REQUEST:
    case actionTypes.CREATE_USER_ATTRIBUTES_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTE_REQUEST:
    case actionTypes.SET_USER_ATTRIBUTE_REQUEST:
    case actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST:
    case actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST:
      return true;
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.UPDATE_USER_FAILURE:
    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_GUEST_USER_FAILURE:
    case actionTypes.FETCH_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_USER_ATTRIBUTES_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS:
    case actionTypes.CREATE_USER_ATTRIBUTES_FAILURE:
    case actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS:
    case actionTypes.FETCH_USER_ATTRIBUTE_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.SET_USER_ATTRIBUTE_FAILURE:
    case actionTypes.SET_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const benefits = reducerFactory(
  'FETCH_BENEFITS',
  INITIAL_STATE.benefits,
  actionTypes,
);

export const preferences = reducerFactory(
  'FETCH_PREFERENCES',
  INITIAL_STATE.preferences,
  actionTypes,
);

export const updatePreferences = reducerFactory(
  'UPDATE_PREFERENCES',
  INITIAL_STATE.preferences,
  actionTypes,
);

export const titles = reducerFactory(
  'FETCH_TITLES',
  INITIAL_STATE.titles,
  actionTypes,
);

export const credit = reducerFactory(
  'FETCH_CREDITS',
  INITIAL_STATE.credit,
  actionTypes,
);

export const creditMovements = reducerFactory(
  'FETCH_CREDIT_MOVEMENTS',
  INITIAL_STATE.creditMovements,
  actionTypes,
);

export const contacts = reducerFactory(
  ['FETCH_CONTACTS', 'FETCH_CONTACT'],
  INITIAL_STATE.contacts,
  actionTypes,
);

export const userAttributes = (
  state = INITIAL_STATE.userAttributes,
  action: FetchUserAttributesSuccessAction | FetchUserAttributeSuccessAction,
): State['userAttributes'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS:
      return {
        error: INITIAL_STATE.userAttributes.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS:
      const newArray = state.result && [...state.result];
      const index =
        state.result &&
        state.result.findIndex(
          attribute => attribute?.id === action.payload.id,
        );

      if (index !== -1 && index && newArray) {
        newArray[index] = action.payload;
      }

      return {
        error: INITIAL_STATE.userAttributes.error,
        isLoading: false,
        result:
          index !== -1
            ? newArray
            : state.result && [...state.result, action.payload],
      };
    default:
      return state;
  }
};

export const getError = (state: State): State['error'] => state.error;
export const getResult = (state: State): State['result'] => state.result;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;
export const getBenefits = (state: State): State['benefits'] => state.benefits;
export const getPreferences = (state: State): State['preferences'] =>
  state.preferences;
export const getUpdatePreferences = (
  state: State,
): State['updatePreferences'] => state.updatePreferences;
export const getTitles = (state: State): State['titles'] => state.titles;
export const getCredit = (state: State): State['credit'] => state.credit;
export const getCreditMovements = (state: State): State['creditMovements'] =>
  state.creditMovements;
export const getContacts = (state: State): State['contacts'] => state.contacts;
export const getUserAttributes = (state: State): State['userAttributes'] =>
  state.userAttributes;

const reducer = combineReducers({
  benefits,
  contacts,
  credit,
  creditMovements,
  error,
  isLoading,
  preferences,
  result,
  titles,
  updatePreferences,
  userAttributes,
});

/**
 * Reducer for users state.
 *
 * @function usersReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */

const usersReducer = (
  state: State,
  action:
    | FetchUserAttributesFailureAction
    | FetchUserAttributesRequestAction
    | CreateUserAttributesFailureAction
    | CreateUserAttributesRequestAction
    | FetchUserAttributeFailureAction
    | FetchUserAttributeRequestAction
    | SetUserAttributeFailureAction
    | SetUserAttributeRequestAction
    | UpdateUserAttributeFailureAction
    | UpdateUserAttributeRequestAction
    | RemoveUserAttributeFailureAction
    | RemoveUserAttributeRequestAction
    | FetchUserFailureAction
    | FetchUserRequestAction
    | UpdateUserFailureAction
    | UpdateUserRequestAction
    | CreateGuestUserFailureAction
    | CreateGuestUserRequestAction
    | FetchGuestUserFailureAction
    | FetchGuestUserRequestAction
    | LogoutAction,
) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default usersReducer;
