import * as actionTypes from '../../actionTypes';
import { addOrderItemActivities } from '..';
import { INITIAL_STATE } from '../../reducer';
import {
  itemId,
  mockOrderItemActivityPayload,
} from 'tests/__fixtures__/orders';
import { mockStore } from '../../../../tests';
import { postOrderItemActivities } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postOrderItemActivities: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);

const orderId = '24BJKS';
const expectedConfig = undefined;
let store;

describe('addOrderItemActivities() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the add order item activities procedure fails', async () => {
    const expectedError = new Error('add order item activities error');

    postOrderItemActivities.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(
        addOrderItemActivities(orderId, itemId, mockOrderItemActivityPayload),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postOrderItemActivities).toHaveBeenCalledTimes(1);
      expect(postOrderItemActivities).toHaveBeenCalledWith(
        orderId,
        itemId,
        mockOrderItemActivityPayload,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_REQUEST },
          {
            type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the add order item activities procedure is successful', async () => {
    postOrderItemActivities.mockResolvedValueOnce();

    await store
      .dispatch(
        addOrderItemActivities(orderId, itemId, mockOrderItemActivityPayload),
      )
      .then(clientResult => {
        expect(clientResult).toBeUndefined();
      });

    expect(postOrderItemActivities).toHaveBeenCalledTimes(1);
    expect(postOrderItemActivities).toHaveBeenCalledWith(
      orderId,
      itemId,
      mockOrderItemActivityPayload,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_REQUEST },
      { type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_SUCCESS },
    ]);
  });
});
