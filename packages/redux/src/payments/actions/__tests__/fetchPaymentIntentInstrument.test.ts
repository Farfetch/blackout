import * as actionTypes from '../../actionTypes';
import { getPaymentIntentInstrument } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockFetchInstrumentNormalizedPayload,
  mockFetchInstrumentResponse,
} from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchPaymentIntentInstrument from '../fetchPaymentIntentInstrument';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentIntentInstrument: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchPaymentIntentInstrument() action creator', () => {
  const intentId = '123123';
  const instrumentId = '123123';

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch payment intent instrument procedure fails', async () => {
    const expectedError = new Error('fetch instrument error');

    getPaymentIntentInstrument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchPaymentIntentInstrument(intentId, instrumentId),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentIntentInstrument).toHaveBeenCalledTimes(1);
      expect(getPaymentIntentInstrument).toHaveBeenCalledWith(
        intentId,
        instrumentId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_REQUEST },
          {
            type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_FAILURE,

            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the fetch payment intent instrument procedure is successful', async () => {
    getPaymentIntentInstrument.mockResolvedValueOnce(
      mockFetchInstrumentResponse,
    );
    await store.dispatch(fetchPaymentIntentInstrument(intentId, instrumentId));

    const actionResults = store.getActions();

    expect(getPaymentIntentInstrument).toHaveBeenCalledTimes(1);
    expect(getPaymentIntentInstrument).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_REQUEST },
      {
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
        payload: mockFetchInstrumentNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('fetch payment intent instrument success payload');
  });
});
