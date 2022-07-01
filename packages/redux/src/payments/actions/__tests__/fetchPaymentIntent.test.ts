import * as actionTypes from '../../actionTypes';
import { getPaymentIntent } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockFetchIntentResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchPaymentIntent from '../fetchPaymentIntent';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentIntent: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchPaymentIntent() action creator', () => {
  const intentId = '123123';

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch payment intent procedure fails', async () => {
    const expectedError = new Error('fetch intent error');

    getPaymentIntent.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPaymentIntent(intentId));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions when the fetch intent procedure is successful', async () => {
    getPaymentIntent.mockResolvedValueOnce(mockFetchIntentResponse);
    await store.dispatch(fetchPaymentIntent(intentId));

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
