import { mockOrderDocumentsResponse } from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrderAvailableItemsActivities from '../doGetOrderAvailableItemsActivities';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const ordersMockStore = (state = {}) => mockStore({ orders: reducer() }, state);
const orderId = '24BJKS';
const expectedConfig = undefined;
let store;

describe('doGetOrderAvailableItemsActivities() action creator', () => {
  const getOrderAvailableItemsActivities = jest.fn();
  const action = doGetOrderAvailableItemsActivities(
    getOrderAvailableItemsActivities,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order available items activities procedure fails', async () => {
    const expectedError = new Error(
      'get order available items activities error',
    );

    getOrderAvailableItemsActivities.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action({ orderId }));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderAvailableItemsActivities).toHaveBeenCalledTimes(1);
      expect(getOrderAvailableItemsActivities).toHaveBeenCalledWith(
        { orderId },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST },
          {
            type: actionTypes.GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get order available items activities procedure is successful', async () => {
    getOrderAvailableItemsActivities.mockResolvedValueOnce(
      mockOrderDocumentsResponse,
    );
    await store.dispatch(action({ orderId }));

    const actionResults = store.getActions();

    expect(getOrderAvailableItemsActivities).toHaveBeenCalledTimes(1);
    expect(getOrderAvailableItemsActivities).toHaveBeenCalledWith(
      { orderId },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST },
      { type: actionTypes.GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS,
      }),
    ).toMatchSnapshot('get order available items activities success payload');
  });
});
