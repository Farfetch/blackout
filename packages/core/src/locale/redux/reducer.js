/**
 * @module locale/reducer
 * @category Locale
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import get from 'lodash/get';

export const INITIAL_STATE = {
  countryCode: null,
  cities: {
    error: null,
    isLoading: false,
  },
  countries: {
    error: null,
    isLoading: false,
  },
  currencies: {
    error: null,
    isLoading: false,
  },
  states: {
    error: null,
    isLoading: false,
  },
};

const countryCode = (state = INITIAL_STATE.countryCode, action) => {
  switch (action.type) {
    case actionTypes.SET_COUNTRY:
      return get(action, 'payload.countryCode', INITIAL_STATE.countryCode);
    default:
      return state;
  }
};

const cities = (state = INITIAL_STATE.cities, action) => {
  switch (action.type) {
    case actionTypes.GET_CITIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.cities.error,
      };
    case actionTypes.GET_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE.cities.isLoading,
      };
    case actionTypes.GET_CITIES_FAILURE:
      return {
        isLoading: INITIAL_STATE.cities.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const countries = (state = INITIAL_STATE.countries, action) => {
  switch (action.type) {
    case actionTypes.GET_COUNTRY_REQUEST:
    case actionTypes.GET_COUNTRIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.countries.error,
      };
    case actionTypes.GET_COUNTRY_SUCCESS:
    case actionTypes.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE.countries.isLoading,
      };
    case actionTypes.GET_COUNTRY_FAILURE:
    case actionTypes.GET_COUNTRIES_FAILURE:
      return {
        isLoading: INITIAL_STATE.countries.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const currencies = (state = INITIAL_STATE.currencies, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENCIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.currencies.error,
      };
    case actionTypes.GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE.currencies.isLoading,
      };
    case actionTypes.GET_CURRENCIES_FAILURE:
      return {
        isLoading: INITIAL_STATE.currencies.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const states = (state = INITIAL_STATE.states, action) => {
  switch (action.type) {
    case actionTypes.GET_STATES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.states.error,
      };
    case actionTypes.GET_STATES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE.states.isLoading,
      };
    case actionTypes.GET_STATES_FAILURE:
      return {
        isLoading: INITIAL_STATE.states.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const getAreCitiesLoading = state => state.cities.isLoading;
export const getAreCountriesLoading = state => state.countries.isLoading;
export const getAreCurrenciesLoading = state => state.currencies.isLoading;
export const getAreStatesLoading = state => state.states.isLoading;
export const getCitiesError = state => state.cities.error;
export const getCountriesError = state => state.countries.error;
export const getCountryCode = state => state.countryCode;
export const getCurrenciesError = state => state.currencies.error;
export const getStatesError = state => state.states.error;

const reducers = combineReducers({
  cities,
  countries,
  countryCode,
  currencies,
  states,
});

/**
 * Reducer for locale state.
 *
 * @function localeReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_LOCALE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
