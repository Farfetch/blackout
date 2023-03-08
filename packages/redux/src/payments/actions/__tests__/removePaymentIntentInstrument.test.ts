import * as actionTypes from '../../actionTypes.js';
import { deletePaymentIntentInstrument } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { instrumentId, intentId } from 'tests/__fixtures__/payments/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import removePaymentIntentInstrument from '../removePaymentIntentInstrument.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deletePaymentIntentInstrument: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('removePaymentIntentInstrument() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the remove payment intent instrument procedure fails', async () => {
    const expectedError = new Error('remove payment intent instrument error');

    (deletePaymentIntentInstrument as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await removePaymentIntentInstrument(
          intentId,
          instrumentId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deletePaymentIntentInstrument).toHaveBeenCalledTimes(1);
    expect(deletePaymentIntentInstrument).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_REQUEST },
        {
          type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions when the remove payment intent instrument procedure is successful', async () => {
    (deletePaymentIntentInstrument as jest.Mock).mockResolvedValueOnce(200);
    await removePaymentIntentInstrument(
      intentId,
      instrumentId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(200);
    });

    const actionResults = store.getActions();

    expect(deletePaymentIntentInstrument).toHaveBeenCalledTimes(1);
    expect(deletePaymentIntentInstrument).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_REQUEST },
      {
        meta: {
          instrumentId: instrumentId,
        },
        type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('remove payment intent instrument success payload');
  });
});
