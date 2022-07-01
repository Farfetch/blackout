import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockPaymentsResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import { putPaymentIntentInstrument } from '@farfetch/blackout-client';
import find from 'lodash/find';
import updatePaymentIntentInstrument from '../updatePaymentIntentInstrument';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putPaymentIntentInstrument: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('updatePaymentIntentInstrument() action creator', () => {
  const intentId = '123123';
  const instrumentId = '123123';
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the update payment intent instrument procedure fails', async () => {
    const expectedError = new Error('update instruments error');

    putPaymentIntentInstrument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        updatePaymentIntentInstrument(intentId, instrumentId, data),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putPaymentIntentInstrument).toHaveBeenCalledTimes(1);
      expect(putPaymentIntentInstrument).toHaveBeenCalledWith(
        intentId,
        instrumentId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_REQUEST },
          {
            type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update payment intent instruments procedure is successful', async () => {
    putPaymentIntentInstrument.mockResolvedValueOnce(mockPaymentsResponse);
    await store.dispatch(
      updatePaymentIntentInstrument(intentId, instrumentId, data),
    );

    const actionResults = store.getActions();

    expect(putPaymentIntentInstrument).toHaveBeenCalledTimes(1);
    expect(putPaymentIntentInstrument).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_REQUEST },
      {
        type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('update payment intent instrument success payload');
  });
});
