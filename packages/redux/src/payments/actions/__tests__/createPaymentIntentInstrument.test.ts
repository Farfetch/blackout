import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockPaymentsResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import { postPaymentIntentInstrument } from '@farfetch/blackout-client';
import createPaymentIntentInstrument from '../createPaymentIntentInstrument';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPaymentIntentInstrument: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('createPaymentIntentInstrument() action creator', () => {
  const intentId = '123123';
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the create payment intent instrument procedure fails', async () => {
    const expectedError = new Error('create instruments error');

    postPaymentIntentInstrument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createPaymentIntentInstrument(intentId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPaymentIntentInstrument).toHaveBeenCalledTimes(1);
      expect(postPaymentIntentInstrument).toHaveBeenCalledWith(
        intentId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_REQUEST },
          {
            type: actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create payment intent instrument procedure is successful', async () => {
    postPaymentIntentInstrument.mockResolvedValueOnce(mockPaymentsResponse);
    await store.dispatch(createPaymentIntentInstrument(intentId, data));

    const actionResults = store.getActions();

    expect(postPaymentIntentInstrument).toHaveBeenCalledTimes(1);
    expect(postPaymentIntentInstrument).toHaveBeenCalledWith(
      intentId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_REQUEST },
      {
        type: actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('create payment intent instrument success payload');
  });
});
