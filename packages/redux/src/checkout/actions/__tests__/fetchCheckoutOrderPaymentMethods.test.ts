import * as actionTypes from '../../actionTypes';
import { getCheckoutOrderPaymentMethods } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../payments/reducer';
import {
  mockFetchPaymentMethodsResponse,
  orderId,
} from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchCheckoutOrderPaymentMethods from '../fetchCheckoutOrderPaymentMethods';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderPaymentMethods: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('fetchCheckoutOrderPaymentMethods() action creator', () => {
  const expectedPaymentMethodsResult = {
    entities: {
      checkout: {
        [orderId]: {
          paymentMethods: mockFetchPaymentMethodsResponse,
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the fetch checkout order payment methods procedure fails', async () => {
    const expectedError = new Error('fetch payment methods error');

    (getCheckoutOrderPaymentMethods as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchCheckoutOrderPaymentMethods(orderId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCheckoutOrderPaymentMethods).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderPaymentMethods).toHaveBeenCalledWith(
      orderId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_REQUEST },
        {
          type: actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch checkout order payment methods procedure is successful', async () => {
    (getCheckoutOrderPaymentMethods as jest.Mock).mockResolvedValueOnce(
      mockFetchPaymentMethodsResponse,
    );
    await fetchCheckoutOrderPaymentMethods(orderId)(store.dispatch);

    const actionResults = store.getActions();

    expect(getCheckoutOrderPaymentMethods).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderPaymentMethods).toHaveBeenCalledWith(
      orderId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_REQUEST },
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_SUCCESS,
        payload: expectedPaymentMethodsResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch checkout order payment methods success payload');
  });
});
