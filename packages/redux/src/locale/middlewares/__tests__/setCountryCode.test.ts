import * as actionTypes from '../../actionTypes.js';
import { client, HttpHeaders } from '@farfetch/blackout-client';
import { mockLocaleState } from 'tests/__fixtures__/locale/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { setCountryCodeMiddleware } from '../index.js';

const mockCountryCode = 'US';
const mockCurrencyCode = 'USD';
const mockCultureCode = 'en-US';
const mockInitialCountryCode = 'US';
const mockInitialCurrencyCode = 'USD';
const mockInitialCultureCode = 'en-US';

const mockState = {
  entities: {
    ...mockLocaleState.entities,
  },
  locale: {
    ...mockLocaleState.locale,
  },
};

describe('setCountryMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    client.defaults.headers.common[HttpHeaders.AcceptLanguage] =
      mockInitialCultureCode;
    client.defaults.headers.common[HttpHeaders.FFCountry] =
      mockInitialCountryCode;
    client.defaults.headers.common[HttpHeaders.FFCurrency] =
      mockInitialCurrencyCode;
  });

  it('Should change the client headers defaults with the correct values when a country is set', () => {
    const store = mockStore(null, mockState, [setCountryCodeMiddleware()]);

    expect(client.defaults.headers.common[HttpHeaders.AcceptLanguage]).toEqual(
      mockInitialCultureCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCountry]).toEqual(
      mockInitialCountryCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCurrency]).toEqual(
      mockInitialCurrencyCode,
    );

    store.dispatch({
      type: actionTypes.SET_COUNTRY_CODE,
      payload: {
        countryCode: mockCountryCode,
      },
    });

    expect(client.defaults.headers.common[HttpHeaders.AcceptLanguage]).toEqual(
      mockCultureCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCountry]).toEqual(
      mockCountryCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCurrency]).toEqual(
      mockCurrencyCode,
    );
  });

  it('Should allow to specify a set of action types that will be listened to instead of the default ones', () => {
    const NEW_TYPE = '@farfetch/blackout-client';
    const NEW_ACTION_TYPE = '@farfetch/blackout-client';

    const store = mockStore(null, mockState, [
      setCountryCodeMiddleware(new Set([NEW_TYPE, NEW_ACTION_TYPE])),
    ]);

    expect(client.defaults.headers.common[HttpHeaders.AcceptLanguage]).toEqual(
      mockInitialCultureCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCountry]).toEqual(
      mockInitialCountryCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCurrency]).toEqual(
      mockInitialCurrencyCode,
    );

    store.dispatch({
      type: 'NEW_LOGIN_SUCCESS_TYPE',
      payload: {
        countryCode: mockCountryCode,
      },
    });

    expect(client.defaults.headers.common[HttpHeaders.FFCountry]).toEqual(
      mockCountryCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCurrency]).toEqual(
      mockCurrencyCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.AcceptLanguage]).toEqual(
      mockCultureCode,
    );
  });

  it('Should allow to specify an array of action types that will be listened to instead of the default ones', () => {
    const NEW_TYPE = '@farfetch/blackout-client';
    const NEW_ACTION_TYPE = '@farfetch/blackout-client';

    const store = mockStore(null, mockState, [
      setCountryCodeMiddleware(new Set<string>([NEW_TYPE, NEW_ACTION_TYPE])),
    ]);

    expect(client.defaults.headers.common[HttpHeaders.AcceptLanguage]).toEqual(
      mockInitialCultureCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCountry]).toEqual(
      mockInitialCountryCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCurrency]).toEqual(
      mockInitialCurrencyCode,
    );

    store.dispatch({
      type: 'NEW_LOGIN_SUCCESS_TYPE',
      payload: {
        countryCode: mockCountryCode,
      },
    });

    expect(client.defaults.headers.common[HttpHeaders.FFCountry]).toEqual(
      mockCountryCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.FFCurrency]).toEqual(
      mockCurrencyCode,
    );
    expect(client.defaults.headers.common[HttpHeaders.AcceptLanguage]).toEqual(
      mockCultureCode,
    );
  });
});
