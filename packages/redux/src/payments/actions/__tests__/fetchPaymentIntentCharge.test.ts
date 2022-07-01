import * as actionTypes from '../../actionTypes';
import { fetchPaymentIntentCharge } from '..';
import { getPaymentIntentCharge } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockCharges } from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentIntentCharge: jest.fn(),
}));

describe('fetchPaymentIntentCharge() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const intentId = 12345;
  const chargeId = '5c2855d7-f1c0-4d2a-8ce4-5bf7c37f0dc7';
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch payment intent charge procedure fails', async () => {
    const expectedError = new Error('charges error');

    getPaymentIntentCharge.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPaymentIntentCharge(intentId, chargeId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentIntentCharge).toHaveBeenCalledTimes(1);
      expect(getPaymentIntentCharge).toHaveBeenCalledWith(
        intentId,
        chargeId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_REQUEST },
          {
            type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch payment intent charge procedure is successful', async () => {
    getPaymentIntentCharge.mockResolvedValueOnce(mockCharges);
    await store.dispatch(fetchPaymentIntentCharge(intentId, chargeId));

    const actionResults = store.getActions();

    expect(getPaymentIntentCharge).toHaveBeenCalledTimes(1);
    expect(getPaymentIntentCharge).toHaveBeenCalledWith(
      intentId,
      chargeId,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_REQUEST },
      {
        type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_SUCCESS,
        payload: mockCharges,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_SUCCESS,
      }),
    ).toMatchSnapshot('fetch payment charge success payload');
  });
});
