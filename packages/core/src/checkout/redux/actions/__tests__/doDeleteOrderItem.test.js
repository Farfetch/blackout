import { checkoutId } from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doDeleteOrderItem from '../doDeleteOrderItem';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doDeleteOrderItem() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const deleteOrderItem = jest.fn();
  const action = doDeleteOrderItem(deleteOrderItem);
  const itemId = '8234758754';
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the delete order item procedure fails', async () => {
    const expectedError = new Error('delete order item error');

    deleteOrderItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, itemId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteOrderItem).toHaveBeenCalledTimes(1);
      expect(deleteOrderItem).toHaveBeenCalledWith(
        checkoutId,
        itemId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.DELETE_ORDER_ITEM_REQUEST },
          {
            type: actionTypes.DELETE_ORDER_ITEM_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete order item procedure is successful', async () => {
    await store.dispatch(action(checkoutId, itemId));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(deleteOrderItem).toHaveBeenCalledTimes(1);
    expect(deleteOrderItem).toHaveBeenCalledWith(
      checkoutId,
      itemId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_ORDER_ITEM_REQUEST },
      {
        meta: { itemId },
        type: actionTypes.DELETE_ORDER_ITEM_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_ORDER_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('delete order item success payload');
  });
});
