import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { fetchCheckout } from '..';
import { getCheckoutOrder } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrder: jest.fn(),
}));

describe('fetchCheckout() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const query = {
    fields: 'paymentMethods,shippingOptions',
  };
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch checkout procedure fails', async () => {
    const expectedError = new Error('fetch checkout error');

    getCheckoutOrder.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCheckout(checkoutId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCheckoutOrder).toHaveBeenCalledTimes(1);
      expect(getCheckoutOrder).toHaveBeenCalledWith(
        checkoutId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CHECKOUT_REQUEST },
          {
            type: actionTypes.FETCH_CHECKOUT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch checkout procedure is successful', async () => {
    getCheckoutOrder.mockResolvedValueOnce(mockResponse);
    await store.dispatch(fetchCheckout(checkoutId, query));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrder).toHaveBeenCalledWith(
      checkoutId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHECKOUT_REQUEST },
      {
        type: actionTypes.FETCH_CHECKOUT_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_CHECKOUT_SUCCESS }),
    ).toMatchSnapshot('fetch checkout success payload');
  });
});
