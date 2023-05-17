import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import { getPaymentMethodsByCountryAndCurrency } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockFetchPaymentMethodsResponse } from 'tests/__fixtures__/payments/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import fetchPaymentMethodsByCountryAndCurrency from '../fetchPaymentMethodsByCountryAndCurrency.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentMethodsByCountryAndCurrency: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('fetchPaymentMethodsByCountryAndCurrency() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch payment methods with country and currency procedure fails', async () => {
    const expectedError = new Error(
      'fetch payment methods with country and currency error',
    );

    (getPaymentMethodsByCountryAndCurrency as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchPaymentMethodsByCountryAndCurrency()(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getPaymentMethodsByCountryAndCurrency).toHaveBeenCalledTimes(1);
    expect(getPaymentMethodsByCountryAndCurrency).toHaveBeenCalledWith(
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
        },
        {
          type: actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE,

          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions when the fetch payment methods with country and currency procedure is successful', async () => {
    (getPaymentMethodsByCountryAndCurrency as jest.Mock).mockResolvedValueOnce(
      mockFetchPaymentMethodsResponse,
    );
    await fetchPaymentMethodsByCountryAndCurrency()(store.dispatch);

    const actionResults = store.getActions();

    expect(getPaymentMethodsByCountryAndCurrency).toHaveBeenCalledTimes(1);
    expect(getPaymentMethodsByCountryAndCurrency).toHaveBeenCalledWith(
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
      },
      {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
        payload: mockFetchPaymentMethodsResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
      }),
    ).toMatchSnapshot(
      'fetch payment methods with country and currency success payload',
    );
  });
});
