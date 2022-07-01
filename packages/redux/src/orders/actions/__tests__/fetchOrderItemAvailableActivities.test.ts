import * as actionTypes from '../../actionTypes';
import { fetchOrderItemAvailableActivities } from '..';
import { getOrderItemAvailableActivities } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { itemId, mockOrderDocumentsResponse } from 'tests/__fixtures__/orders';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrderItemAvailableActivities: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const orderId = '24BJKS';
const expectedConfig = undefined;
let store;

describe('fetchOrderItemAvailableActivities() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions fetch when the get order item activities procedure fails', async () => {
    const expectedError = new Error('fetch order item activities error');

    getOrderItemAvailableActivities.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchOrderItemAvailableActivities(orderId, itemId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderItemAvailableActivities).toHaveBeenCalledTimes(1);
      expect(getOrderItemAvailableActivities).toHaveBeenCalledWith(
        orderId,
        itemId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST },
          {
            type: actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch order item activities procedure is successful', async () => {
    getOrderItemAvailableActivities.mockResolvedValueOnce(
      mockOrderDocumentsResponse,
    );

    expect.assertions(4);

    await store
      .dispatch(fetchOrderItemAvailableActivities(orderId, itemId))
      .then(clientResult => {
        expect(clientResult).toEqual(mockOrderDocumentsResponse);
      });

    expect(getOrderItemAvailableActivities).toHaveBeenCalledTimes(1);
    expect(getOrderItemAvailableActivities).toHaveBeenCalledWith(
      orderId,
      itemId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST },
      { type: actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS },
    ]);
  });
});
