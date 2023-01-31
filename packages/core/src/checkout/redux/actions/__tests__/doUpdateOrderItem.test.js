import { checkoutId } from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doUpdateOrderItem from '../doUpdateOrderItem';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doUpdateOrderItem() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const patchOrderItem = jest.fn();
  const action = doUpdateOrderItem(patchOrderItem);
  const itemId = '8234758754';
  const orderItemUpdateData = {
    quantity: 3,
  };

  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update order item procedure fails', async () => {
    const expectedError = new Error('update order item error');

    patchOrderItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, itemId, orderItemUpdateData));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchOrderItem).toHaveBeenCalledTimes(1);
      expect(patchOrderItem).toHaveBeenCalledWith(
        checkoutId,
        itemId,
        orderItemUpdateData,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_ORDER_ITEM_REQUEST },
          {
            type: actionTypes.UPDATE_ORDER_ITEM_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update order item procedure is successful', async () => {
    await store.dispatch(action(checkoutId, itemId, orderItemUpdateData));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(patchOrderItem).toHaveBeenCalledTimes(1);
    expect(patchOrderItem).toHaveBeenCalledWith(
      checkoutId,
      itemId,
      orderItemUpdateData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_ORDER_ITEM_REQUEST },
      {
        type: actionTypes.UPDATE_ORDER_ITEM_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_ORDER_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('update order item success payload');
  });
});
