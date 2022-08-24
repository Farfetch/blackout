import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchCountryCurrencies } from '..';
import { getCountryCurrencies } from '@farfetch/blackout-client';
import { INITIAL_STATE_LOCALE } from '../../reducer';
import { mockCountryCode, mockCurrencies } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE_LOCALE }, state);

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountryCurrencies: jest.fn(),
}));

describe('fetchCountryCurrencies() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store: ReturnType<typeof localeMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get currencies procedure fails', async () => {
    const expectedError = new Error('Get currencies error');

    (getCountryCurrencies as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await fetchCountryCurrencies(mockCountryCode)(store.dispatch).catch(
      error => {
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
      },
    );
  });

  it('should create the correct actions for when the get currencies procedure is successful', async () => {
    (getCountryCurrencies as jest.Mock).mockResolvedValueOnce(mockCurrencies);

    const actionResults = store.getActions();

    await fetchCountryCurrencies(mockCountryCode)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockCurrencies);
      },
    );

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
