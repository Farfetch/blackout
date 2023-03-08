import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { get } from 'lodash-es';
import { produce } from 'immer';
import reducerFactory from '../helpers/reducerFactory.js';
import type { LocaleState } from './types/index.js';
import type { StoreState } from '../types/index.js';

export const INITIAL_STATE_LOCALE: LocaleState = {
  countryCode: '',
  sourceCountryCode: null,
  subfolder: null,
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
  countriesAddressSchemas: {
    error: null,
    isLoading: false,
  },
};

const countryCode = (
  state = INITIAL_STATE_LOCALE.countryCode,
  action: AnyAction,
): LocaleState['countryCode'] => {
  switch (action.type) {
    case actionTypes.SET_COUNTRY_CODE:
      return get(
        action,
        'payload.countryCode',
        INITIAL_STATE_LOCALE.countryCode,
      );
    default:
      return state;
  }
};

const subfolder = (
  state = INITIAL_STATE_LOCALE.subfolder,
): LocaleState['subfolder'] => {
  return state;
};

const cities = (
  state = INITIAL_STATE_LOCALE.cities,
  action: AnyAction,
): LocaleState['cities'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_STATE_CITIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE_LOCALE.cities.error,
      };
    case actionTypes.FETCH_COUNTRY_STATE_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE_LOCALE.cities.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_STATE_CITIES_FAILURE:
      return {
        isLoading: INITIAL_STATE_LOCALE.cities.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const countries = (
  state = INITIAL_STATE_LOCALE.countries,
  action: AnyAction,
): LocaleState['countries'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_REQUEST:
    case actionTypes.FETCH_COUNTRIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE_LOCALE.countries.error,
      };
    case actionTypes.FETCH_COUNTRY_SUCCESS:
    case actionTypes.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE_LOCALE.countries.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_FAILURE:
    case actionTypes.FETCH_COUNTRIES_FAILURE:
      return {
        isLoading: INITIAL_STATE_LOCALE.countries.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const currencies = (
  state = INITIAL_STATE_LOCALE.currencies,
  action: AnyAction,
): LocaleState['currencies'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE_LOCALE.currencies.error,
      };
    case actionTypes.FETCH_COUNTRY_CURRENCIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE_LOCALE.currencies.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE:
      return {
        isLoading: INITIAL_STATE_LOCALE.currencies.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const states = (
  state = INITIAL_STATE_LOCALE.states,
  action: AnyAction,
): LocaleState['states'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_STATES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE_LOCALE.states.error,
      };
    case actionTypes.FETCH_COUNTRY_STATES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE_LOCALE.states.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_STATES_FAILURE:
      return {
        isLoading: INITIAL_STATE_LOCALE.states.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const sourceCountryCode = (state = INITIAL_STATE_LOCALE.sourceCountryCode) => {
  // No action changes this value in state.
  // sourceCountryCode is only available from the server
  // initial state (see serverInitialState.ts in locale for more details)
  return state;
};

export const countriesAddressSchemas = reducerFactory(
  'FETCH_COUNTRY_ADDRESS_SCHEMA',
  INITIAL_STATE_LOCALE.countriesAddressSchemas,
  actionTypes,
);

export const getAreCountryStateCitiesLoading = (
  state: LocaleState,
): LocaleState['cities']['isLoading'] => state.cities.isLoading;
export const getAreCountriesLoading = (
  state: LocaleState,
): LocaleState['countries']['isLoading'] => state.countries.isLoading;
export const getAreCountryCurrenciesLoading = (
  state: LocaleState,
): LocaleState['currencies']['isLoading'] => state.currencies.isLoading;
export const getAreCountryStatesLoading = (
  state: LocaleState,
): LocaleState['states']['isLoading'] => state.states.isLoading;
export const getCountryStateCitiesError = (
  state: LocaleState,
): LocaleState['cities']['error'] => state.cities.error;
export const getCountriesError = (
  state: LocaleState,
): LocaleState['countries']['error'] => state.countries.error;
export const getCountryCode = (
  state: LocaleState,
): LocaleState['countryCode'] => state.countryCode;
export const getSubfolder = (state: LocaleState): LocaleState['subfolder'] =>
  state.subfolder;
export const getSourceCountryCode = (
  state: LocaleState,
): LocaleState['sourceCountryCode'] => state.sourceCountryCode;
export const getCountryCurrenciesError = (
  state: LocaleState,
): LocaleState['currencies']['error'] => state.currencies.error;
export const getCountryStatesError = (
  state: LocaleState,
): LocaleState['states']['error'] => state.states.error;
export const getCountriesAddressSchemas = (
  state: LocaleState,
): LocaleState['countriesAddressSchemas'] => state.countriesAddressSchemas;

const reducers = combineReducers({
  cities,
  countries,
  countryCode,
  currencies,
  states,
  sourceCountryCode,
  countriesAddressSchemas,
  subfolder,
});

export const entitiesMapper = {
  [actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_SUCCESS]: (
    state: StoreState['entities'],
    action: AnyAction,
  ): StoreState['entities'] => {
    const countryId = action.payload.result;
    const countrySchema = get(
      action,
      `payload.entities.countriesAddressSchemas[${countryId}]`,
      {},
    );

    return produce(state, draftState => {
      if (draftState) {
        if (!draftState.countriesAddressSchemas) {
          draftState.countriesAddressSchemas = {};
        }

        draftState.countriesAddressSchemas[countryId] = { ...countrySchema };
      }
    });
  },
};

/**
 * Reducer for locale state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const localeReducer: Reducer<LocaleState> = (state, action) => {
  if (action.type === actionTypes.RESET_LOCALE_STATE) {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};

export default localeReducer;
