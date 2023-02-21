import * as actionTypes from '../../actionTypes';
import { getPaymentIntentInstruments } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  intentId,
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
let store: ReturnType<typeof paymentsMockStore>;

describe('fetchPaymentIntentInstruments() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch payment intent instruments procedure fails', async () => {
    const expectedError = new Error('fetch instruments error');

    (getPaymentIntentInstruments as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await fetchPaymentIntentInstruments(intentId)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions when the fetch payment intent instruments procedure is successful', async () => {
    (getPaymentIntentInstruments as jest.Mock).mockResolvedValueOnce(
      mockFetchInstrumentsResponse,
    );
    await fetchPaymentIntentInstruments(intentId)(store.dispatch);

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
