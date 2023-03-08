import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import { getPaymentIntentInstrument } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  instrumentId,
  intentId,
  mockFetchInstrumentNormalizedPayload,
  mockFetchInstrumentResponse,
} from 'tests/__fixtures__/payments/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import fetchPaymentIntentInstrument from '../fetchPaymentIntentInstrument.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentIntentInstrument: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('fetchPaymentIntentInstrument() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch payment intent instrument procedure fails', async () => {
    const expectedError = new Error('fetch payment intent instrument error');

    (getPaymentIntentInstrument as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchPaymentIntentInstrument(
          intentId,
          instrumentId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions when the fetch payment intent instrument procedure is successful', async () => {
    (getPaymentIntentInstrument as jest.Mock).mockResolvedValueOnce(
      mockFetchInstrumentResponse,
    );
    await fetchPaymentIntentInstrument(intentId, instrumentId)(store.dispatch);

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
