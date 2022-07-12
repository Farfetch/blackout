import * as normalizr from 'normalizr';
import {
  localeActionTypes as actionTypes,
  localeReducer as INITIAL_STATE,
} from '../..';
import { fetchCountryCurrencies } from '..';
import { getCountryCurrencies } from '@farfetch/blackout-client/locale';
import { mockCountryCode, mockCurrencies } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import type { Currencies } from '@farfetch/blackout-client/locale/types';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE }, state);

jest.mock('@farfetch/blackout-client/locale', () => ({
  ...jest.requireActual('@farfetch/blackout-client/locale'),
  getCountryCurrencies: jest.fn(),
}));

describe('fetchCountryCurrencies() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get currencies procedure fails', async () => {
    const expectedError = new Error('Get currencies error');

    getCountryCurrencies.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchCountryCurrencies(mockCountryCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountryCurrencies).toHaveBeenCalledTimes(1);
      expect(getCountryCurrencies).toHaveBeenCalledWith(
        mockCountryCode,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: {
            countryCode: mockCountryCode,
          },
          type: actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST,
        },
        {
          meta: {
            countryCode: mockCountryCode,
          },
          payload: { error: expectedError },
          type: actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get currencies procedure is successful', async () => {
    getCountryCurrencies.mockResolvedValueOnce(mockCurrencies);

    const actionResults = store.getActions();

    await store
      .dispatch(fetchCountryCurrencies(mockCountryCode))
      .then((result: Currencies) => expect(result).toBe(mockCurrencies));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountryCurrencies).toHaveBeenCalledTimes(1);
    expect(getCountryCurrencies).toHaveBeenCalledWith(
      mockCountryCode,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        meta: {
          countryCode: mockCountryCode,
        },
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST,
      },
      expect.objectContaining({
        meta: {
          countryCode: mockCountryCode,
        },
        payload: expect.any(Object),
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get currencies success payload');
  });
});
