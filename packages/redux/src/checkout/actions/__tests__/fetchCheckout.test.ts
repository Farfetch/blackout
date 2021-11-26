import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { fetchCheckout } from '..';
import { getCheckout } from '@farfetch/blackout-client/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  getCheckout: jest.fn(),
}));

describe('fetchCheckout() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const userId = 1;
  const query = {
    isGuest: false,
    userId,
    fields: ['paymentMethods'],
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

    getCheckout.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCheckout(checkoutId, query));
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
    getCheckout.mockResolvedValueOnce(mockResponse);
    await store.dispatch(fetchCheckout(checkoutId, query));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckout).toHaveBeenCalledTimes(1);
    expect(getCheckout).toHaveBeenCalledWith(checkoutId, query, expectedConfig);
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
