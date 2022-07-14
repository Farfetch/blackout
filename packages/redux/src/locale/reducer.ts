import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import { reducerFactory } from '../helpers';
import get from 'lodash/get';
import produce from 'immer';
import type {
  ActionFetchCountries,
  ActionFetchCountry,
  ActionFetchCountryCities,
  ActionFetchCountryCurrencies,
  ActionFetchCountryStates,
  ActionSetCountryCode,
  FetchCountryAddressSchemaSuccessAction,
  State,
} from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE_LOCALE: State = {
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
  addressSchema: {
    error: null,
    isLoading: false,
  },
};

const countryCode = (
  state = INITIAL_STATE_LOCALE.countryCode,
  action: ActionSetCountryCode,
): State['countryCode'] => {
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
): State['cities'] => {
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
): State['countries'] => {
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
): State['currencies'] => {
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
): State['states'] => {
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

export const addressSchema = reducerFactory(
  'FETCH_COUNTRY_ADDRESS_SCHEMA',
  INITIAL_STATE_LOCALE.addressSchema,
  actionTypes,
);

export const entitiesMapper = {
  [actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_SUCCESS]: (
    state: StoreState['entities'],
    action: FetchCountryAddressSchemaSuccessAction,
  ): StoreState['entities'] => {
    const countryId = action.payload.result;
    const countrySchema = get(
      action,
      `payload.entities.addressSchema[${countryId}]`,
      {},
    );

    return produce(state, draftState => {
      if (draftState) {
        if (!draftState.addressSchema) {
          draftState.addressSchema = {};
        }

        draftState.addressSchema[countryId] = { ...countrySchema };
      }
    });
  },
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
export const getSourceCountryCode = (
  state: State,
): State['sourceCountryCode'] => state.sourceCountryCode;
export const getCountryCurrenciesError = (
  state: State,
): State['currencies']['error'] => state.currencies.error;
export const getCountryStatesError = (state: State): State['states']['error'] =>
  state.states.error;
export const getCountryAddressSchema = (state: State): State['addressSchema'] =>
  state.addressSchema;

const reducers = combineReducers({
  cities,
  countries,
  countryCode,
  currencies,
  states,
  addressSchema,
});

/**
 * Reducer for locale state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
export default (state: State, action: AnyAction): State => {
  if (action.type === actionTypes.RESET_LOCALE_STATE) {
    return reducers(INITIAL_STATE_LOCALE, action);
  }

  return reducers(state, action);
};
