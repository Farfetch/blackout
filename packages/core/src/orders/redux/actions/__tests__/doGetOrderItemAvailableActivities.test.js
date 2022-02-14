import {
  itemId,
  mockOrderDocumentsResponse,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrderItemAvailableActivities from '../doGetOrderItemAvailableActivities';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const ordersMockStore = (state = {}) => mockStore({ orders: reducer() }, state);
const orderId = '24BJKS';
const expectedConfig = undefined;
let store;

describe('doGetOrderItemAvailableActivities() action creator', () => {
  const getOrderItemAvailableActivities = jest.fn();
  const action = doGetOrderItemAvailableActivities(
    getOrderItemAvailableActivities,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order item available activities procedure fails', async () => {
    const expectedError = new Error(
      'get order item available activities error',
    );

    getOrderItemAvailableActivities.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action({ orderId, itemId }));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderItemAvailableActivities).toHaveBeenCalledTimes(1);
      expect(getOrderItemAvailableActivities).toHaveBeenCalledWith(
        { orderId, itemId },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST },
          {
            type: actionTypes.GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get order item available activities procedure is successful', async () => {
    getOrderItemAvailableActivities.mockResolvedValueOnce(
      mockOrderDocumentsResponse,
    );
    await store.dispatch(action({ orderId, itemId }));

    const actionResults = store.getActions();

    expect(getOrderItemAvailableActivities).toHaveBeenCalledTimes(1);
    expect(getOrderItemAvailableActivities).toHaveBeenCalledWith(
      { orderId, itemId },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST },
      { type: actionTypes.GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS,
      }),
    ).toMatchSnapshot('get order item available activities success payload');
  });
});
