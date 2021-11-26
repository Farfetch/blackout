/**
 * @module locale/reducer
 * @category Locale
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import get from 'lodash/get';
import type {
  ActionFetchCountries,
  ActionFetchCountry,
  ActionFetchCountryCities,
  ActionFetchCountryCurrencies,
  ActionFetchCountryStates,
  ActionSetCountryCode,
  State,
} from './types';

export const INITIAL_STATE: State = {
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

const countryCode = (
  state = INITIAL_STATE.countryCode,
  action: ActionSetCountryCode,
): State['countryCode'] => {
  switch (action.type) {
    case actionTypes.SET_COUNTRY_CODE:
      return get(action, 'payload.countryCode', INITIAL_STATE.countryCode);
    default:
      return state;
  }
};

const cities = (
  state = INITIAL_STATE.cities,
  action: ActionFetchCountryCities,
): State['cities'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_CITIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.cities.error,
      };
    case actionTypes.FETCH_COUNTRY_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE.cities.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_CITIES_FAILURE:
      return {
        isLoading: INITIAL_STATE.cities.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const countries = (
  state = INITIAL_STATE.countries,
  action: ActionFetchCountries | ActionFetchCountry,
): State['countries'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_REQUEST:
    case actionTypes.FETCH_COUNTRIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.countries.error,
      };
    case actionTypes.FETCH_COUNTRY_SUCCESS:
    case actionTypes.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE.countries.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_FAILURE:
    case actionTypes.FETCH_COUNTRIES_FAILURE:
      return {
        isLoading: INITIAL_STATE.countries.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const currencies = (
  state = INITIAL_STATE.currencies,
  action: ActionFetchCountryCurrencies,
): State['currencies'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.currencies.error,
      };
    case actionTypes.FETCH_COUNTRY_CURRENCIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE.currencies.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE:
      return {
        isLoading: INITIAL_STATE.currencies.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const states = (
  state = INITIAL_STATE.states,
  action: ActionFetchCountryStates,
): State['states'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_STATES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.states.error,
      };
    case actionTypes.FETCH_COUNTRY_STATES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE.states.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_STATES_FAILURE:
      return {
        isLoading: INITIAL_STATE.states.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const getAreCountryCitiesLoading = (
  state: State,
): State['cities']['isLoading'] => state.cities.isLoading;
export const getAreCountriesLoading = (
  state: State,
): State['countries']['isLoading'] => state.countries.isLoading;
export const getAreCountryCurrenciesLoading = (
  state: State,
): State['currencies']['isLoading'] => state.currencies.isLoading;
export const getAreCountryStatesLoading = (
  state: State,
): State['states']['isLoading'] => state.states.isLoading;
export const getCountryCitiesError = (state: State): State['cities']['error'] =>
  state.cities.error;
export const getCountriesError = (state: State): State['countries']['error'] =>
  state.countries.error;
export const getCountryCode = (state: State): State['countryCode'] =>
  state.countryCode;
export const getCountryCurrenciesError = (
  state: State,
): State['currencies']['error'] => state.currencies.error;
export const getCountryStatesError = (state: State): State['states']['error'] =>
  state.states.error;

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
export default (state: State, action: AnyAction): State => {
  if (action.type === actionTypes.RESET_LOCALE_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
