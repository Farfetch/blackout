import * as actionTypes from '../../actionTypes';
import { getPaymentMethodsByCountryAndCurrency } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockmockFetchPaymentMethodsResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchPaymentMethodsByCountryAndCurrency from '../fetchPaymentMethodsByCountryAndCurrency';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentMethodsByCountryAndCurrency: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchPaymentMethodsByCountryAndCurrency() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch payment methods with country and currency procedure fails', async () => {
    const expectedError = new Error(
      'fetch payment methods with country and currency error',
    );

    getPaymentMethodsByCountryAndCurrency.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPaymentMethodsByCountryAndCurrency());
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions when the fetch payment methods with country and currency procedure is successful', async () => {
    getPaymentMethodsByCountryAndCurrency.mockResolvedValueOnce(
      mockmockFetchPaymentMethodsResponse,
    );
    await store.dispatch(fetchPaymentMethodsByCountryAndCurrency());

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
        payload: mockmockFetchPaymentMethodsResponse,
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
