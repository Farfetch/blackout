import { actionTypes } from '../..';
import {
  checkoutId,
  mockCompletePaymentResponse,
} from 'tests/__fixtures__/checkout';
import { completePaymentCheckout } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchCheckoutCompletePayment } from '@farfetch/blackout-client/checkout';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  patchCheckoutCompletePayment: jest.fn(),
}));

describe('completePaymentCheckout() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const data = {
    something: 'something',
  };
  const expectedCompletePaymentResult = {
    entities: {
      ...mockCompletePaymentResponse,
      createdDate: 12345,
    },
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the complete payment checkout procedure fails', async () => {
    const expectedError = new Error('complete payment checkout error');

    patchCheckoutCompletePayment.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(completePaymentCheckout(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchCheckoutCompletePayment).toHaveBeenCalledTimes(1);
      expect(patchCheckoutCompletePayment).toHaveBeenCalledWith(
        checkoutId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.COMPLETE_PAYMENT_CHECKOUT_REQUEST },
          {
            type: actionTypes.COMPLETE_PAYMENT_CHECKOUT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the complete payment checkout procedure is successful', async () => {
    patchCheckoutCompletePayment.mockResolvedValueOnce(
      mockCompletePaymentResponse,
    );
    await store.dispatch(completePaymentCheckout(checkoutId, data));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(patchCheckoutCompletePayment).toHaveBeenCalledTimes(1);
    expect(patchCheckoutCompletePayment).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.COMPLETE_PAYMENT_CHECKOUT_REQUEST },
      {
        type: actionTypes.COMPLETE_PAYMENT_CHECKOUT_SUCCESS,
        meta: { id: checkoutId },
        payload: expectedCompletePaymentResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.COMPLETE_PAYMENT_CHECKOUT_SUCCESS,
      }),
    ).toMatchSnapshot('complete payment checkout success payload');
  });
});
