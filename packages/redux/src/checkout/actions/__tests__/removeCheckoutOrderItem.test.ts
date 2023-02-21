import { deleteCheckoutOrderItem } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import {
  REMOVE_CHECKOUT_ORDER_ITEM_FAILURE,
  REMOVE_CHECKOUT_ORDER_ITEM_REQUEST,
  REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS,
} from '../../actionTypes';
import removeCheckoutOrderItem from '../removeCheckoutOrderItem';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteCheckoutOrderItem: jest.fn(),
}));

describe('removeCheckoutOrderItem() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);

  const checkoutOrderId = 1;
  const itemId = 98743;
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ checkout: INITIAL_STATE }, undefined) as typeof store;
  });

  it('should create the correct actions for when the remove checkout order item procedure fails', async () => {
    const expectedError = new Error('remove checkout order item error');

    (deleteCheckoutOrderItem as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await removeCheckoutOrderItem(checkoutOrderId, itemId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteCheckoutOrderItem).toHaveBeenCalledTimes(1);
    expect(deleteCheckoutOrderItem).toHaveBeenCalledWith(
      checkoutOrderId,
      itemId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: REMOVE_CHECKOUT_ORDER_ITEM_REQUEST },
        {
          type: REMOVE_CHECKOUT_ORDER_ITEM_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the remove checkout order item procedure is successful', async () => {
    (deleteCheckoutOrderItem as jest.Mock).mockResolvedValueOnce(200);

    await removeCheckoutOrderItem(
      checkoutOrderId,
      itemId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(200);
    });

    const actionResults = store.getActions();

    expect(deleteCheckoutOrderItem).toHaveBeenCalledTimes(1);
    expect(deleteCheckoutOrderItem).toHaveBeenCalledWith(
      checkoutOrderId,
      itemId,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      { type: REMOVE_CHECKOUT_ORDER_ITEM_REQUEST },
      { type: REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS },
    ]);
  });
});
