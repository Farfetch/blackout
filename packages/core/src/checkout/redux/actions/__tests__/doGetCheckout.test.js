import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetCheckout from '../doGetCheckout';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetCheckout() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const userId = 1;
  const query = {
    isGuest: false,
    userId,
    fields: ['paymentMethods'],
  };
  const getCheckout = jest.fn();
  const action = doGetCheckout(getCheckout);
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the get checkout procedure fails', async () => {
    const expectedError = new Error('get checkout error');

    getCheckout.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCheckout).toHaveBeenCalledTimes(1);
      expect(getCheckout).toHaveBeenCalledWith(
        checkoutId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_CHECKOUT_REQUEST },
          {
            type: actionTypes.GET_CHECKOUT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get checkout procedure is successful', async () => {
    getCheckout.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(checkoutId, query));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckout).toHaveBeenCalledTimes(1);
    expect(getCheckout).toHaveBeenCalledWith(checkoutId, query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_CHECKOUT_REQUEST },
      {
        type: actionTypes.GET_CHECKOUT_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_CHECKOUT_SUCCESS }),
    ).toMatchSnapshot('get checkout success payload');
  });
});
