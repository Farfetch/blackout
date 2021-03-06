import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import { setCountryMiddleware } from '../';
import client, { headers } from '../../../../helpers/client';

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
        cultureCode: mockCultureCode,
        currencies: [{ isoCode: mockCurrencyCode }],
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
    const store = mockStore(null, mockState, [setCountryMiddleware()]);

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
      type: actionTypes.SET_COUNTRY,
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
    const NEW_TYPE = '@farfetch/blackout-core/NEW_TYPE';
    const NEW_ACTION_TYPE = '@farfetch/blackout-core/NEW_ACTION_TYPE';

    const store = mockStore(null, mockState, [
      setCountryMiddleware(new Set([NEW_TYPE, NEW_ACTION_TYPE])),
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
    const NEW_TYPE = '@farfetch/blackout-core/NEW_TYPE';
    const NEW_ACTION_TYPE = '@farfetch/blackout-core/NEW_ACTION_TYPE';

    const store = mockStore(null, mockState, [
      setCountryMiddleware([NEW_TYPE, NEW_ACTION_TYPE]),
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
