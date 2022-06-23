import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type {
  Cities,
  Countries,
  Country,
  Currencies,
  States,
} from '@farfetch/blackout-client/locale/types';

export interface ActionSetCountryCode extends Action {
  type: typeof actionTypes.SET_COUNTRY_CODE;
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
  payload: { result: Countries };
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

export interface ActionFetchCountryCitiesFailure extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_CITIES_FAILURE;
  payload: { error: BlackoutError };
  meta: {
    countryCode: string;
    stateId: number;
  };
}

export interface ActionFetchCountryCitiesRequest extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_CITIES_REQUEST;
  meta: {
    countryCode: string;
    stateId: number;
  };
}

export interface ActionFetchCountryCitiesSuccess extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_CITIES_SUCCESS;
  payload: Array<Cities>;
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
    result: Array<Currencies>;
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
    result: Array<States>;
  };
  type: typeof actionTypes.FETCH_COUNTRY_STATES_SUCCESS;
}

export type ActionFetchCountry =
  | ActionFetchCountryFailure
  | ActionFetchCountryRequest
  | ActionFetchCountrySuccess;

export type ActionFetchCountries =
  | ActionFetchCountriesFailure
  | ActionFetchCountriesRequest
  | ActionFetchCountriesSuccess;

export type ActionFetchCountryCities =
  | ActionFetchCountryCitiesFailure
  | ActionFetchCountryCitiesRequest
  | ActionFetchCountryCitiesSuccess;

export type ActionFetchCountryCurrencies =
  | ActionFetchCountryCurrenciesFailure
  | ActionFetchCountryCurrenciesRequest
  | ActionFetchCountryCurrenciesSuccess;

export type ActionFetchCountryStates =
  | ActionFetchCountryStatesFailure
  | ActionFetchCountryStatesRequest
  | ActionFetchCountryStatesSuccess;
