import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  City,
  Country,
  CountryAddressSchema,
  Currency,
  State,
} from '@farfetch/blackout-client';

export interface SetCountryCodeAction extends Action {
  type: typeof actionTypes.SET_COUNTRY_CODE;
}

export interface FetchCountriesFailureAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRIES_FAILURE;
  payload: { error: BlackoutError | null };
}
export interface FetchCountriesRequestAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRIES_REQUEST;
}

export interface FetchCountriesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRIES_SUCCESS;
  payload: { result: Country[] };
}

export interface FetchCountryFailureAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_FAILURE;
  payload: { error: BlackoutError | null };
}

export interface FetchCountryRequestAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_REQUEST;
}

export interface FetchCountrySuccessAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_SUCCESS;
  payload: { result: Country };
}

export interface FetchCountryStateCitiesFailureAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_STATE_CITIES_FAILURE;
  payload: { error: BlackoutError };
  meta: {
    countryCode: string;
    stateId: number;
  };
}

export interface FetchCountryStateCitiesRequestAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_STATE_CITIES_REQUEST;
  meta: {
    countryCode: string;
    stateId: number;
  };
}

export interface FetchCountryStateCitiesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_COUNTRY_STATE_CITIES_SUCCESS;
  payload: { result: City[] };
  meta: {
    countryCode: string;
    stateId: number;
  };
}

export interface FetchCountryCurrenciesFailureAction extends Action {
  meta: { countryCode: string };
  payload: { error: BlackoutError | null };
  type: typeof actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE;
}

export interface FetchCountryCurrenciesRequestAction extends Action {
  meta: { countryCode: string };
  type: typeof actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST;
}

export interface FetchCountryCurrenciesSuccessAction extends Action {
  meta: { countryCode: string };
  payload: {
    result: Currency[];
  };
  type: typeof actionTypes.FETCH_COUNTRY_CURRENCIES_SUCCESS;
}

export interface FetchCountryStatesFailureAction extends Action {
  meta: { countryCode: string };
  payload: { error: BlackoutError | null };
  type: typeof actionTypes.FETCH_COUNTRY_STATES_FAILURE;
}

export interface FetchCountryStatesRequestAction extends Action {
  meta: { countryCode: string };
  type: typeof actionTypes.FETCH_COUNTRY_STATES_REQUEST;
}

export interface FetchCountryStatesSuccessAction extends Action {
  meta: { countryCode: string };
  payload: {
    result: State[];
  };
  type: typeof actionTypes.FETCH_COUNTRY_STATES_SUCCESS;
}

export interface FetchCountryAddressSchemasFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_FAILURE;
}

export interface FetchCountryAddressSchemasRequestAction extends Action {
  meta: { isoCode: string };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_REQUEST;
}

export interface FetchCountryAddressSchemasSuccessAction extends Action {
  payload: {
    entities: {
      countriesAddressSchemas: Record<string, CountryAddressSchema[]>;
    };
    result: string;
  };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_SUCCESS;
}

export type FetchCountryAction =
  | FetchCountryFailureAction
  | FetchCountryRequestAction
  | FetchCountrySuccessAction;

export type FetchCountriesAction =
  | FetchCountriesFailureAction
  | FetchCountriesRequestAction
  | FetchCountriesSuccessAction;

export type FetchCountryStateCitiesAction =
  | FetchCountryStateCitiesFailureAction
  | FetchCountryStateCitiesRequestAction
  | FetchCountryStateCitiesSuccessAction;

export type FetchCountryCurrenciesAction =
  | FetchCountryCurrenciesFailureAction
  | FetchCountryCurrenciesRequestAction
  | FetchCountryCurrenciesSuccessAction;

export type FetchCountryStatesAction =
  | FetchCountryStatesFailureAction
  | FetchCountryStatesRequestAction
  | FetchCountryStatesSuccessAction;

export type FetchCountryAddressSchemasAction =
  | FetchCountryAddressSchemasFailureAction
  | FetchCountryAddressSchemasRequestAction
  | FetchCountryAddressSchemasSuccessAction;
