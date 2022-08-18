import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { createCheckoutOrder } from '..';
import {
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postCheckoutOrder } from '@farfetch/blackout-client';
import find from 'lodash/find';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postCheckoutOrder: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: mockProductImgQueryParam }),
  }),
];

describe('createCheckoutOrder() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const usePaymentIntent = true;
  const bagId = '3243-343424-2545';
  const guestUserEmail = 'optional@optinal.com';
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the create checkout procedure fails', async () => {
    const expectedError = new Error('create checkout error');

    postCheckoutOrder.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        createCheckoutOrder({ bagId, usePaymentIntent, guestUserEmail }),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCheckoutOrder).toHaveBeenCalledTimes(1);
      expect(postCheckoutOrder).toHaveBeenCalledWith(
        { bagId, usePaymentIntent, guestUserEmail },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_CHECKOUT_ORDER_REQUEST },
          {
            type: actionTypes.CREATE_CHECKOUT_ORDER_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create checkout procedure is successful', async () => {
    postCheckoutOrder.mockResolvedValueOnce(mockResponse);
    await store.dispatch(
      createCheckoutOrder({ bagId, usePaymentIntent, guestUserEmail }),
    );

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrder).toHaveBeenCalledWith(
      { bagId, usePaymentIntent, guestUserEmail },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_CHECKOUT_ORDER_REQUEST },
      {
        type: actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
      }),
    ).toMatchSnapshot('create checkout success payload');
  });
});
