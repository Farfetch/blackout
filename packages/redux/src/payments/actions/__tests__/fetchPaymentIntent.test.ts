import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import { getPaymentIntent } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  intentId,
  mockFetchIntentResponse,
} from 'tests/__fixtures__/payments/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import fetchPaymentIntent from '../fetchPaymentIntent.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentIntent: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('fetchPaymentIntent() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch payment intent procedure fails', async () => {
    const expectedError = new Error('fetch payment intent error');

    (getPaymentIntent as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchPaymentIntent(intentId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getPaymentIntent).toHaveBeenCalledTimes(1);
    expect(getPaymentIntent).toHaveBeenCalledWith(intentId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_PAYMENT_INTENT_REQUEST },
        {
          type: actionTypes.FETCH_PAYMENT_INTENT_FAILURE,

          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions when the fetch payment intent procedure is successful', async () => {
    (getPaymentIntent as jest.Mock).mockResolvedValueOnce(
      mockFetchIntentResponse,
    );
    await fetchPaymentIntent(intentId)(store.dispatch);

    const actionResults = store.getActions();

    expect(getPaymentIntent).toHaveBeenCalledTimes(1);
    expect(getPaymentIntent).toHaveBeenCalledWith(intentId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PAYMENT_INTENT_REQUEST },
      {
        type: actionTypes.FETCH_PAYMENT_INTENT_SUCCESS,
        payload: mockFetchIntentResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_INTENT_SUCCESS,
      }),
    ).toMatchSnapshot('fetch payment intent success payload');
  });
});
