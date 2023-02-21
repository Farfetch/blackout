import * as actionTypes from '../../actionTypes';
import { addOrderItemActivity } from '..';
import { INITIAL_STATE } from '../../reducer';
import {
  itemId,
  mockOrderItemActivityPayload,
  orderId,
} from 'tests/__fixtures__/orders';
import { mockStore } from '../../../../tests';
import { postOrderItemActivity } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postOrderItemActivity: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('addOrderItemActivity() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the add order item activity procedure fails', async () => {
    const expectedError = new Error('add order item activity error');

    (postOrderItemActivity as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await addOrderItemActivity(
          orderId,
          itemId,
          mockOrderItemActivityPayload,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postOrderItemActivity).toHaveBeenCalledTimes(1);
    expect(postOrderItemActivity).toHaveBeenCalledWith(
      orderId,
      itemId,
      mockOrderItemActivityPayload,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.ADD_ORDER_ITEM_ACTIVITY_REQUEST },
        {
          type: actionTypes.ADD_ORDER_ITEM_ACTIVITY_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the add order item activities procedure is successful', async () => {
    (postOrderItemActivity as jest.Mock).mockResolvedValueOnce(undefined);

    await addOrderItemActivity(
      orderId,
      itemId,
      mockOrderItemActivityPayload,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(postOrderItemActivity).toHaveBeenCalledTimes(1);
    expect(postOrderItemActivity).toHaveBeenCalledWith(
      orderId,
      itemId,
      mockOrderItemActivityPayload,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.ADD_ORDER_ITEM_ACTIVITY_REQUEST },
      { type: actionTypes.ADD_ORDER_ITEM_ACTIVITY_SUCCESS },
    ]);
  });
});
