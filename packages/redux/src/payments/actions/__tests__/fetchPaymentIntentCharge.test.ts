import * as actionTypes from '../../actionTypes.js';
import { chargeId, intentId } from 'tests/__fixtures__/payments/index.mjs';
import { fetchPaymentIntentCharge } from '../index.js';
import { find } from 'lodash-es';
import { getPaymentIntentCharge } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockCharges } from 'tests/__fixtures__/checkout/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentIntentCharge: jest.fn(),
}));

describe('fetchPaymentIntentCharge() action creator', () => {
  const paymentsMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const expectedConfig = undefined;
  let store: ReturnType<typeof paymentsMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the fetch payment intent charge procedure fails', async () => {
    const expectedError = new Error('fetch payment intent charge error');

    (getPaymentIntentCharge as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchPaymentIntentCharge(intentId, chargeId)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the fetch payment intent charge procedure is successful', async () => {
    (getPaymentIntentCharge as jest.Mock).mockResolvedValueOnce(mockCharges);
    await fetchPaymentIntentCharge(intentId, chargeId)(store.dispatch);

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
    ).toMatchSnapshot('fetch payment intent charge success payload');
  });
});
