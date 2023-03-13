import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  City,
  Country,
  CountryAddressSchema,
  Currency,
  State,
} from '@farfetch/blackout-client';

export interface ActionSetCountryCode extends Action {
  type: typeof actionTypes.SET_COUNTRY_CODE;
}

export interface ActionSetSubFolder extends Action {
  type: typeof actionTypes.SET_SUBFOLDER;
}

export interface ActionFetchCountriesFailure extends Action {
  type: typeof actionTypes.FETCH_COUNTRIES_FAILURE;
  payload: { error: BlackoutError | null };
}
export interface ActionFetchCountriesRequest extends Action {
  type: typeof actionTypes.FETCH_COUNTRIES_REQUEST;
}

export interface ActionFetchCountriesSuccess extends Action {
  type: typeof actionTypes.FETCH_COUNTRIES_SUCCESS;
  payload: { result: Country[] };
}

export interface ActionFetchCountryFailure extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_FAILURE;
  payload: { error: BlackoutError | null };
}

export interface ActionFetchCountryRequest extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_REQUEST;
}

export interface ActionFetchCountrySuccess extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_SUCCESS;
  payload: { result: Country };
}

export interface ActionFetchCountryStateCitiesFailure extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_STATE_CITIES_FAILURE;
  payload: { error: BlackoutError };
  meta: {
    countryCode: string;
    stateId: number;
  };
}

export interface ActionFetchCountryStateCitiesRequest extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_STATE_CITIES_REQUEST;
  meta: {
    countryCode: string;
    stateId: number;
  };
}

export interface ActionFetchCountryStateCitiesSuccess extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_STATE_CITIES_SUCCESS;
  payload: City[];
  meta: {
    countryCode: string;
    stateId: number;
  };
}

export interface ActionFetchCountryCurrenciesFailure extends Action {
  meta: { countryCode: string };
  payload: { error: BlackoutError | null };
  type: typeof actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE;
}

export interface ActionFetchCountryCurrenciesRequest extends Action {
  meta: { countryCode: string };
  type: typeof actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST;
}

export interface ActionFetchCountryCurrenciesSuccess extends Action {
  meta: { countryCode: string };
  payload: {
    result: Currency[];
  };
  type: typeof actionTypes.FETCH_COUNTRY_CURRENCIES_SUCCESS;
}

export interface ActionFetchCountryStatesFailure extends Action {
  meta: { countryCode: string };
  payload: { error: BlackoutError | null };
  type: typeof actionTypes.FETCH_COUNTRY_STATES_FAILURE;
}

export interface ActionFetchCountryStatesRequest extends Action {
  meta: { countryCode: string };
  type: typeof actionTypes.FETCH_COUNTRY_STATES_REQUEST;
}

export interface ActionFetchCountryStatesSuccess extends Action {
  meta: { countryCode: string };
  payload: {
    result: State[];
  };
  type: typeof actionTypes.FETCH_COUNTRY_STATES_SUCCESS;
}

export interface FetchCountryAddressSchemaFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_FAILURE;
}

export interface FetchCountryAddressSchemaRequestAction extends Action {
  meta: { isoCode: string };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_REQUEST;
}

export interface FetchCountryAddressSchemaSuccessAction extends Action {
  payload: {
    entities: {
      countriesAddressSchemas: Record<string, CountryAddressSchema[]>;
    };
    result: string;
  };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_SUCCESS;
}

export type ActionFetchCountry =
  | ActionFetchCountryFailure
  | ActionFetchCountryRequest
  | ActionFetchCountrySuccess;

export type ActionFetchCountries =
  | ActionFetchCountriesFailure
  | ActionFetchCountriesRequest
  | ActionFetchCountriesSuccess;

export type ActionFetchCountryStateCities =
  | ActionFetchCountryStateCitiesFailure
  | ActionFetchCountryStateCitiesRequest
  | ActionFetchCountryStateCitiesSuccess;

export type ActionFetchCountryCurrencies =
  | ActionFetchCountryCurrenciesFailure
  | ActionFetchCountryCurrenciesRequest
  | ActionFetchCountryCurrenciesSuccess;

export type ActionFetchCountryStates =
  | ActionFetchCountryStatesFailure
  | ActionFetchCountryStatesRequest
  | ActionFetchCountryStatesSuccess;

export type FetchCountryAddressSchemaAction =
  | FetchCountryAddressSchemaFailureAction
  | FetchCountryAddressSchemaRequestAction
  | FetchCountryAddressSchemaSuccessAction;
