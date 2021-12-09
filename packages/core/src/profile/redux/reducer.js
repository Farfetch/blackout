/**
 * @module profile/reducer
 * @category Profile
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult, reducerFactory } from '../../helpers/redux';

const INITIAL_STATE = {
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
  attribute: {
    result: null,
    error: null,
    isLoading: false,
  },
};

export const entitiesMapper = {
  [actionTypes.GET_BENEFITS_SUCCESS]: (state, action) => {
    const { benefits } = action.payload.entities;
    // Add benefits reference to user entity
    const user = { ...state.user, benefits: action.payload.result };

    return {
      ...state,
      user,
      benefits,
    };
  },
  [actionTypes.GET_PREFERENCES_SUCCESS]: (state, action) => {
    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user = { ...state.user, preferences: action.payload.result };

    return {
      ...state,
      user,
      preferences: preferences || {},
    };
  },
  [actionTypes.GET_CREDIT_SUCCESS]: (state, action) => {
    const { credit } = action.payload;
    // Add credit to user entity
    const user = { ...state.user, credit };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.GET_CREDIT_MOVEMENTS_SUCCESS]: (state, action) => {
    const { creditMovements } = action.payload;
    // Add movements to user entity
    const user = { ...state.user, creditMovements };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.GET_CONTACTS_SUCCESS]: (state, action) => {
    const { contacts } = action.payload.entities;
    // Add contacts reference to user entity
    const user = { ...state.user, contacts: action.payload.result };

    return {
      ...state,
      user,
      contacts,
    };
  },
  [actionTypes.UPDATE_PREFERENCES_SUCCESS]: (state, action) => {
    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user = { ...state.user, preferences: action.payload.result };

    return {
      ...state,
      user,
      preferences,
    };
  },
};

/**
 * `error` reducer.
 */

const error = (state = INITIAL_STATE.error, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE_FAILURE:
    case actionTypes.UPDATE_PROFILE_FAILURE:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.GET_GUEST_USER_FAILURE:
    case actionTypes.GET_USER_ATTRIBUTES_FAILURE:
    case actionTypes.POST_USER_ATTRIBUTES_FAILURE:
    case actionTypes.GET_USER_ATTRIBUTE_FAILURE:
    case actionTypes.PUT_USER_ATTRIBUTE_FAILURE:
    case actionTypes.PATCH_USER_ATTRIBUTE_FAILURE:
    case actionTypes.DELETE_USER_ATTRIBUTE_FAILURE:
      return action.payload.error;
    case actionTypes.GET_PROFILE_REQUEST:
    case actionTypes.UPDATE_PROFILE_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.GET_GUEST_USER_REQUEST:
    case actionTypes.GET_USER_ATTRIBUTES_REQUEST:
    case actionTypes.POST_USER_ATTRIBUTES_REQUEST:
    case actionTypes.GET_USER_ATTRIBUTE_REQUEST:
    case actionTypes.PUT_USER_ATTRIBUTE_REQUEST:
    case actionTypes.PATCH_USER_ATTRIBUTE_REQUEST:
    case actionTypes.DELETE_USER_ATTRIBUTE_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PROFILE_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.GET_GUEST_USER_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE_REQUEST:
    case actionTypes.UPDATE_PROFILE_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.GET_GUEST_USER_REQUEST:
    case actionTypes.GET_USER_ATTRIBUTES_REQUEST:
    case actionTypes.POST_USER_ATTRIBUTES_REQUEST:
    case actionTypes.GET_USER_ATTRIBUTE_REQUEST:
    case actionTypes.PUT_USER_ATTRIBUTE_REQUEST:
    case actionTypes.PATCH_USER_ATTRIBUTE_REQUEST:
    case actionTypes.DELETE_USER_ATTRIBUTE_REQUEST:
      return true;
    case actionTypes.GET_PROFILE_FAILURE:
    case actionTypes.GET_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PROFILE_FAILURE:
    case actionTypes.UPDATE_PROFILE_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.GET_GUEST_USER_FAILURE:
    case actionTypes.GET_GUEST_USER_SUCCESS:
    case actionTypes.GET_USER_ATTRIBUTES_FAILURE:
    case actionTypes.GET_USER_ATTRIBUTES_SUCCESS:
    case actionTypes.POST_USER_ATTRIBUTES_FAILURE:
    case actionTypes.POST_USER_ATTRIBUTES_SUCCESS:
    case actionTypes.GET_USER_ATTRIBUTE_FAILURE:
    case actionTypes.GET_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.PUT_USER_ATTRIBUTE_FAILURE:
    case actionTypes.PUT_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.PATCH_USER_ATTRIBUTE_FAILURE:
    case actionTypes.PATCH_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.DELETE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.DELETE_USER_ATTRIBUTE_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const benefits = reducerFactory(
  'GET_BENEFITS',
  INITIAL_STATE.benefits,
  actionTypes,
);

export const preferences = reducerFactory(
  'GET_PREFERENCES',
  INITIAL_STATE.preferences,
  actionTypes,
);

export const updatePreferences = reducerFactory(
  'UPDATE_PREFERENCES',
  INITIAL_STATE.preferences,
  actionTypes,
);

export const titles = reducerFactory(
  'GET_TITLES',
  INITIAL_STATE.titles,
  actionTypes,
);

export const credit = reducerFactory(
  'GET_CREDITS',
  INITIAL_STATE.credit,
  actionTypes,
);

export const creditMovements = reducerFactory(
  'GET_CREDIT_MOVEMENTS',
  INITIAL_STATE.creditMovements,
  actionTypes,
);

export const contacts = reducerFactory(
  ['GET_CONTACTS', 'GET_CONTACT'],
  INITIAL_STATE.contacts,
  actionTypes,
);

export const userAttributes = createReducerWithResult(
  'GET_USER_ATTRIBUTES',
  INITIAL_STATE.userAttributes,
  actionTypes,
);

export const attribute = createReducerWithResult(
  'GET_USER_ATTRIBUTE',
  INITIAL_STATE.attribute,
  actionTypes,
);

export const getError = state => state.error;
export const getResult = state => state.result;
export const getIsLoading = state => state.isLoading;
export const getBenefits = state => state.benefits;
export const getPreferences = state => state.preferences;
export const getUpdatePreferences = state => state.updatePreferences;
export const getTitles = state => state.titles;
export const getCredit = state => state.credit;
export const getCreditMovements = state => state.creditMovements;
export const getContacts = state => state.contacts;
export const getUserAttributes = state => state.userAttributes;
export const getUserAttribute = state => state.attribute;

/**
 * Reducer for profile state.
 *
 * @function profileReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default combineReducers({
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
  attribute,
});
