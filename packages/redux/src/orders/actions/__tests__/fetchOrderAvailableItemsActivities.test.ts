import * as actionTypes from '../../actionTypes';
import { fetchOrderAvailableItemsActivities } from '..';
import { getOrderAvailableItemsActivities } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockOrderDocumentsResponse, orderId } from 'tests/__fixtures__/orders';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrderAvailableItemsActivities: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchOrderAvailableItemsActivities() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions fetch when the get order available items activities procedure fails', async () => {
    const expectedError = new Error(
      'fetch order available items activities error',
    );

    (getOrderAvailableItemsActivities as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchOrderAvailableItemsActivities(orderId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getOrderAvailableItemsActivities).toHaveBeenCalledTimes(1);
    expect(getOrderAvailableItemsActivities).toHaveBeenCalledWith(
      orderId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST,
        },
        {
          type: actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch order available items activities procedure is successful', async () => {
    (getOrderAvailableItemsActivities as jest.Mock).mockResolvedValueOnce(
      mockOrderDocumentsResponse,
    );

    await fetchOrderAvailableItemsActivities(orderId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toEqual(mockOrderDocumentsResponse);
      },
    );

    expect(getOrderAvailableItemsActivities).toHaveBeenCalledTimes(1);
    expect(getOrderAvailableItemsActivities).toHaveBeenCalledWith(
      orderId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST },
      { type: actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS },
    ]);
  });
});
