import * as actionTypes from '../../actionTypes';
import { client, headers } from '@farfetch/blackout-client';
import { mockStore } from '../../../../tests';
import { setCountryCodeMiddleware } from '..';

const mockCountryCode = 'US';
const mockCurrencyCode = 'USD';
const mockCultureCode = 'en-US';
const mockInitialCountryCode = 'US';
const mockInitialCurrencyCode = 'USD';
const mockInitialCultureCode = 'en-US';

const mockState = {
  entities: {
    countries: {
      [mockCountryCode]: {
        cultures: [mockCultureCode],
        currencies: [{ isoCode: mockCurrencyCode }],
        defaultCulture: mockInitialCultureCode,
      },
    },
  },
  locale: {
    countryCode: mockCountryCode,
  },
};

describe('setCountryMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    client.defaults.headers.common[headers.ACCEPT_LANGUAGE] =
      mockInitialCultureCode;
    client.defaults.headers.common[headers.FF_COUNTRY] = mockInitialCountryCode;
    client.defaults.headers.common[headers.FF_CURRENCY] =
      mockInitialCurrencyCode;
  });

  it('Should change the client headers defaults with the correct values when a country is set', () => {
    const store = mockStore(null, mockState, [setCountryCodeMiddleware()]);

    expect(client.defaults.headers.common[headers.ACCEPT_LANGUAGE]).toEqual(
      mockInitialCultureCode,
    );
    expect(client.defaults.headers.common[headers.FF_COUNTRY]).toEqual(
      mockInitialCountryCode,
    );
    expect(client.defaults.headers.common[headers.FF_CURRENCY]).toEqual(
      mockInitialCurrencyCode,
    );

    store.dispatch({
      type: actionTypes.SET_COUNTRY_CODE,
      payload: {
        countryCode: mockCountryCode,
      },
    });

    expect(client.defaults.headers.common[headers.ACCEPT_LANGUAGE]).toEqual(
      mockCultureCode,
    );
    expect(client.defaults.headers.common[headers.FF_COUNTRY]).toEqual(
      mockCountryCode,
    );
    expect(client.defaults.headers.common[headers.FF_CURRENCY]).toEqual(
      mockCurrencyCode,
    );
  });

  it('Should allow to specify a set of action types that will be listened to instead of the default ones', () => {
    const NEW_TYPE = '@farfetch/blackout-client/NEW_TYPE';
    const NEW_ACTION_TYPE = '@farfetch/blackout-client/NEW_ACTION_TYPE';

    const store = mockStore(null, mockState, [
      setCountryCodeMiddleware(new Set([NEW_TYPE, NEW_ACTION_TYPE])),
    ]);

    expect(client.defaults.headers.common[headers.ACCEPT_LANGUAGE]).toEqual(
      mockInitialCultureCode,
    );
    expect(client.defaults.headers.common[headers.FF_COUNTRY]).toEqual(
      mockInitialCountryCode,
    );
    expect(client.defaults.headers.common[headers.FF_CURRENCY]).toEqual(
      mockInitialCurrencyCode,
    );

    store.dispatch({
      type: 'NEW_LOGIN_SUCCESS_TYPE',
      payload: {
        countryCode: mockCountryCode,
      },
    });

    expect(client.defaults.headers.common[headers.FF_COUNTRY]).toEqual(
      mockCountryCode,
    );
    expect(client.defaults.headers.common[headers.FF_CURRENCY]).toEqual(
      mockCurrencyCode,
    );
    expect(client.defaults.headers.common[headers.ACCEPT_LANGUAGE]).toEqual(
      mockCultureCode,
    );
  });

  it('Should allow to specify an array of action types that will be listened to instead of the default ones', () => {
    const NEW_TYPE = '@farfetch/blackout-client/NEW_TYPE';
    const NEW_ACTION_TYPE = '@farfetch/blackout-client/NEW_ACTION_TYPE';

    const store = mockStore(null, mockState, [
      setCountryCodeMiddleware([NEW_TYPE, NEW_ACTION_TYPE]),
    ]);

    expect(client.defaults.headers.common[headers.ACCEPT_LANGUAGE]).toEqual(
      mockInitialCultureCode,
    );
    expect(client.defaults.headers.common[headers.FF_COUNTRY]).toEqual(
      mockInitialCountryCode,
    );
    expect(client.defaults.headers.common[headers.FF_CURRENCY]).toEqual(
      mockInitialCurrencyCode,
    );

    store.dispatch({
      type: 'NEW_LOGIN_SUCCESS_TYPE',
      payload: {
        countryCode: mockCountryCode,
      },
    });

    expect(client.defaults.headers.common[headers.FF_COUNTRY]).toEqual(
      mockCountryCode,
    );
    expect(client.defaults.headers.common[headers.FF_CURRENCY]).toEqual(
      mockCurrencyCode,
    );
    expect(client.defaults.headers.common[headers.ACCEPT_LANGUAGE]).toEqual(
      mockCultureCode,
    );
  });
});
