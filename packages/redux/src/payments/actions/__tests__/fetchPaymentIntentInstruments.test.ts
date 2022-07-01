import * as actionTypes from '../../actionTypes';
import { getPaymentIntentInstruments } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockFetchInstrumentsNormalizedPayload,
  mockFetchInstrumentsResponse,
} from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchPaymentIntentInstruments from '../fetchPaymentIntentInstruments';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentIntentInstruments: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchPaymentIntentInstruments() action creator', () => {
  const intentId = '123123';

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch payment intent instruments procedure fails', async () => {
    const expectedError = new Error('fetch instruments error');

    getPaymentIntentInstruments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPaymentIntentInstruments(intentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentIntentInstruments).toHaveBeenCalledTimes(1);
      expect(getPaymentIntentInstruments).toHaveBeenCalledWith(
        intentId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_REQUEST },
          {
            type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the fetch payment intent instruments procedure is successful', async () => {
    getPaymentIntentInstruments.mockResolvedValueOnce(
      mockFetchInstrumentsResponse,
    );
    await store.dispatch(fetchPaymentIntentInstruments(intentId));

    const actionResults = store.getActions();

    expect(getPaymentIntentInstruments).toHaveBeenCalledTimes(1);
    expect(getPaymentIntentInstruments).toHaveBeenCalledWith(
      intentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_REQUEST },
      {
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_SUCCESS,
        payload: mockFetchInstrumentsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch payment intent instruments success payload');
  });
});
