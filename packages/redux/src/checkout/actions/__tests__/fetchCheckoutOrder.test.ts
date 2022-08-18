import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { fetchCheckoutOrder } from '..';
import { getCheckoutOrder } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrder: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: mockProductImgQueryParam }),
  }),
];

describe('fetchCheckoutOrder() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
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
      await store.dispatch(fetchCheckoutOrder(checkoutId, query));
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
          { type: actionTypes.FETCH_CHECKOUT_ORDER_REQUEST },
          {
            type: actionTypes.FETCH_CHECKOUT_ORDER_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch checkout procedure is successful', async () => {
    getCheckoutOrder.mockResolvedValueOnce(mockResponse);
    await store.dispatch(fetchCheckoutOrder(checkoutId, query));

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
      { type: actionTypes.FETCH_CHECKOUT_ORDER_REQUEST },
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS }),
    ).toMatchSnapshot('fetch checkout success payload');
  });
});
