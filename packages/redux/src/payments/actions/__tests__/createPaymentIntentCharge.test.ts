import * as actionTypes from '../../actionTypes';
import {
  chargeId,
  paymentIntentChargeData as data,
  intentId,
  mockCharge,
  mockChargeWithoutHeaders,
} from 'tests/__fixtures__/payments';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postPaymentIntentCharge } from '@farfetch/blackout-client';
import createPaymentIntentCharge from '../createPaymentIntentCharge';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPaymentIntentCharge: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('createPaymentIntentCharge() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the create payment intent charge procedure fails', async () => {
    const expectedError = new Error('charge error');

    (postPaymentIntentCharge as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await createPaymentIntentCharge(
      intentId,
      data,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(postPaymentIntentCharge).toHaveBeenCalledTimes(1);
      expect(postPaymentIntentCharge).toHaveBeenCalledWith(
        intentId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_REQUEST },
          {
            type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the create payment intent charge procedure is successful', async () => {
    (postPaymentIntentCharge as jest.Mock).mockResolvedValueOnce(mockCharge);
    await createPaymentIntentCharge(intentId, data)(store.dispatch);

    const actionResults = store.getActions();

    expect(postPaymentIntentCharge).toHaveBeenCalledTimes(1);
    expect(postPaymentIntentCharge).toHaveBeenCalledWith(
      intentId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_REQUEST },
      {
        type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_SUCCESS,
        payload: mockCharge.data,
        meta: { chargeId },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_SUCCESS,
      }),
    ).toMatchSnapshot('createPaymentIntentCharge success payload');
  });

  it('should create the correct actions for when the create payment intent charge procedure is successful even if location header is missing', async () => {
    (postPaymentIntentCharge as jest.Mock).mockResolvedValueOnce(
      mockChargeWithoutHeaders,
    );
    await createPaymentIntentCharge(intentId, data)(store.dispatch);

    const actionResults = store.getActions();

    expect(postPaymentIntentCharge).toHaveBeenCalledTimes(1);
    expect(postPaymentIntentCharge).toHaveBeenCalledWith(
      intentId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_REQUEST },
      {
        type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_SUCCESS,
        payload: mockChargeWithoutHeaders.data,
        meta: { chargeId: '' },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_SUCCESS,
      }),
    ).toMatchSnapshot('createPaymentIntentCharge success payload');
  });
});