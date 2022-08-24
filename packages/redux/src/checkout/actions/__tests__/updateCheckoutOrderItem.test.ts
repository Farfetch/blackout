import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchCheckoutOrderItem } from '@farfetch/blackout-client';
import {
  UPDATE_CHECKOUT_ORDER_ITEM_FAILURE,
  UPDATE_CHECKOUT_ORDER_ITEM_REQUEST,
  UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS,
} from '../../actionTypes';
import { updateCheckoutOrderItem } from '../';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchCheckoutOrderItem: jest.fn(),
}));

describe('updateCheckoutOrderItem() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);

  const checkoutOrderId = 1;
  const itemId = 98743;
  const data = {
    quantity: 2,
  };
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ checkout: INITIAL_STATE }, undefined) as typeof store;
  });

  it('should create the correct actions for when the update checkout order item procedure fails', async () => {
    const expectedError = new Error('update update checkout order item error');

    (patchCheckoutOrderItem as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await updateCheckoutOrderItem(
      checkoutOrderId,
      itemId,
      data,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(patchCheckoutOrderItem).toHaveBeenCalledTimes(1);
      expect(patchCheckoutOrderItem).toHaveBeenCalledWith(
        checkoutOrderId,
        itemId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: UPDATE_CHECKOUT_ORDER_ITEM_REQUEST },
          {
            type: UPDATE_CHECKOUT_ORDER_ITEM_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the update checkout order item procedure is successful', async () => {
    (patchCheckoutOrderItem as jest.Mock).mockResolvedValueOnce(200);

    await updateCheckoutOrderItem(
      checkoutOrderId,
      itemId,
      data,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(200);
    });
    const actionResults = store.getActions();

    expect.assertions(4);
    expect(patchCheckoutOrderItem).toHaveBeenCalledTimes(1);
    expect(patchCheckoutOrderItem).toHaveBeenCalledWith(
      checkoutOrderId,
      itemId,
      data,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      { type: UPDATE_CHECKOUT_ORDER_ITEM_REQUEST },
      { type: UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS },
    ]);
  });
});
