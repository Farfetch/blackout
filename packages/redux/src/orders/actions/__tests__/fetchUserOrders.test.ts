import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  expectedOrdersResponseNormalizedPayload,
  mockOrdersResponse,
  orderId,
  orderId2,
  userId,
} from 'tests/__fixtures__/orders';
import { fetchUserOrders } from '..';
import { getUserOrders } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import merge from 'lodash/merge';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserOrders: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const getUserOrdersQuery = {
  page: 1,
  pageSize: 10,
};

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchUserOrders() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch user orders procedure fails', async () => {
    const expectedError = new Error('fetch order details error');

    (getUserOrders as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await fetchUserOrders(
      userId,
      getUserOrdersQuery,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getUserOrders).toHaveBeenCalledTimes(1);
      expect(getUserOrders).toHaveBeenCalledWith(
        userId,
        getUserOrdersQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.FETCH_USER_ORDERS_REQUEST,
        },
        {
          payload: { error: expectedError },
          type: actionTypes.FETCH_USER_ORDERS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch user orders procedure is successful', async () => {
    (getUserOrders as jest.Mock).mockResolvedValueOnce(mockOrdersResponse);

    expect.assertions(5);

    const expectedPayload = merge({}, expectedOrdersResponseNormalizedPayload);
    expectedPayload.result.entries = [orderId, orderId2];
    expectedPayload.result.totalItems = expectedPayload.result.entries.length;

    await fetchUserOrders(
      userId,
      getUserOrdersQuery,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toEqual(mockOrdersResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUserOrders).toHaveBeenCalledTimes(1);
    expect(getUserOrders).toHaveBeenCalledWith(
      userId,
      getUserOrdersQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_USER_ORDERS_REQUEST,
      },
      {
        payload: expectedPayload,
        type: actionTypes.FETCH_USER_ORDERS_SUCCESS,
      },
    ]);
  });
});
