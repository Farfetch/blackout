import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import get from 'lodash/get';
import produce from 'immer';
import reducerFactory from '../helpers/reducerFactory';
import type {
  ActionFetchCountries,
  ActionFetchCountry,
  ActionFetchCountryCities,
  ActionFetchCountryCurrencies,
  ActionFetchCountryStates,
  ActionSetCountryCode,
  FetchCountryAddressSchemaSuccessAction,
  LocaleState,
} from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE_LOCALE: LocaleState = {
  countryCode: null,
  sourceCountryCode: null,
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
  countryAddressSchema: {
    error: null,
    isLoading: false,
  },
};

const countryCode = (
  state = INITIAL_STATE_LOCALE.countryCode,
  action: ActionSetCountryCode,
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

const cities = (
  state = INITIAL_STATE_LOCALE.cities,
  action: ActionFetchCountryCities,
): LocaleState['cities'] => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_CITIES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE_LOCALE.cities.error,
      };
    case actionTypes.FETCH_COUNTRY_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: INITIAL_STATE_LOCALE.cities.isLoading,
      };
    case actionTypes.FETCH_COUNTRY_CITIES_FAILURE:
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
  action: ActionFetchCountries | ActionFetchCountry,
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
  action: ActionFetchCountryCurrencies,
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
  action: ActionFetchCountryStates,
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

export const countryAddressSchema = reducerFactory(
  'FETCH_COUNTRY_ADDRESS_SCHEMA',
  INITIAL_STATE_LOCALE.countryAddressSchema,
  actionTypes,
);

export const getAreCountryCitiesLoading = (
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
export const getCountryCitiesError = (
  state: LocaleState,
): LocaleState['cities']['error'] => state.cities.error;
export const getCountriesError = (
  state: LocaleState,
): LocaleState['countries']['error'] => state.countries.error;
export const getCountryCode = (
  state: LocaleState,
): LocaleState['countryCode'] => state.countryCode;
export const getSourceCountryCode = (
  state: LocaleState,
): LocaleState['sourceCountryCode'] => state.sourceCountryCode;
export const getCountryCurrenciesError = (
  state: LocaleState,
): LocaleState['currencies']['error'] => state.currencies.error;
export const getCountryStatesError = (
  state: LocaleState,
): LocaleState['states']['error'] => state.states.error;
export const getCountryAddressSchema = (
  state: LocaleState,
): LocaleState['countryAddressSchema'] => state.countryAddressSchema;

const reducers = combineReducers({
  cities,
  countries,
  countryCode,
  currencies,
  states,
  sourceCountryCode,
  countryAddressSchema,
});

export const entitiesMapper = {
  [actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_SUCCESS]: (
    state: StoreState['entities'],
    action: FetchCountryAddressSchemaSuccessAction,
  ): StoreState['entities'] => {
    const countryId = action.payload.result;
    const countrySchema = get(
      action,
      `payload.entities.countryAddressSchema[${countryId}]`,
      {},
    );

    return produce(state, draftState => {
      if (draftState) {
        if (!draftState.countryAddressSchemas) {
          draftState.countryAddressSchemas = {};
        }

        draftState.countryAddressSchemas[countryId] = { ...countrySchema };
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

const localeReducer = (
  state: LocaleState | undefined,
  action: AnyAction,
): LocaleState => {
  if (action.type === actionTypes.RESET_LOCALE_STATE) {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};

export default localeReducer;
