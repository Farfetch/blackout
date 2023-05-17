import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import { getPaymentMethodsByIntent } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  intentId,
  mockFetchPaymentMethodsResponse,
} from 'tests/__fixtures__/payments/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import fetchPaymentMethodsByIntent from '../fetchPaymentMethodsByIntent.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentMethodsByIntent: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('fetchPaymentMethodsByIntent() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the get payment methods by intent procedure fails', async () => {
    const expectedError = new Error('get payment methods by intent error');

    (getPaymentMethodsByIntent as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await fetchPaymentMethodsByIntent(intentId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getPaymentMethodsByIntent).toHaveBeenCalledTimes(1);
    expect(getPaymentMethodsByIntent).toHaveBeenCalledWith(
      intentId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
        },
        {
          type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE,

          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions when the get payment methods by intent procedure is successful', async () => {
    (getPaymentMethodsByIntent as jest.Mock).mockResolvedValueOnce(
      mockFetchPaymentMethodsResponse,
    );
    await fetchPaymentMethodsByIntent(intentId)(store.dispatch);

    const actionResults = store.getActions();

    expect(getPaymentMethodsByIntent).toHaveBeenCalledTimes(1);
    expect(getPaymentMethodsByIntent).toHaveBeenCalledWith(
      intentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
      },
      {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
        payload: mockFetchPaymentMethodsResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
      }),
    ).toMatchSnapshot('get payment methods by intent success payload');
  });
});
