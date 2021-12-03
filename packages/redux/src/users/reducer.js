/**
 * @module users/reducer
 * @category Users
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { reducerFactory } from '../helpers';

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
};

export const entitiesMapper = {
  [actionTypes.FETCH_BENEFITS_SUCCESS]: (state, action) => {
    const { benefits } = action.payload.entities;
    // Add benefits reference to user entity
    const user = { ...state.user, benefits: action.payload.result };

    return {
      ...state,
      user,
      benefits,
    };
  },
  [actionTypes.FETCH_PREFERENCES_SUCCESS]: (state, action) => {
    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user = { ...state.user, preferences: action.payload.result };

    return {
      ...state,
      user,
      preferences: preferences || {},
    };
  },
  [actionTypes.FETCH_CREDIT_SUCCESS]: (state, action) => {
    const { credit } = action.payload;
    // Add credit to user entity
    const user = { ...state.user, credit };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.FETCH_CREDIT_MOVEMENTS_SUCCESS]: (state, action) => {
    const { creditMovements } = action.payload;
    // Add movements to user entity
    const user = { ...state.user, creditMovements };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.FETCH_CONTACTS_SUCCESS]: (state, action) => {
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
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.UPDATE_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.FETCH_GUEST_USER_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.FETCH_GUEST_USER_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action = {}) => {
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

const isLoading = (state = INITIAL_STATE.isLoading, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.FETCH_GUEST_USER_REQUEST:
      return true;
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.UPDATE_USER_FAILURE:
    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_GUEST_USER_FAILURE:
    case actionTypes.FETCH_GUEST_USER_SUCCESS:
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
});
