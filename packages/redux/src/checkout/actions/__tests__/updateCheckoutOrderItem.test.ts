import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchCheckoutOrderItem as orginalPatchCheckoutOrderItem } from '@farfetch/blackout-client/checkout';
import {
  UPDATE_CHECKOUT_ORDER_ITEM_FAILURE,
  UPDATE_CHECKOUT_ORDER_ITEM_REQUEST,
  UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS,
} from '../../actionTypes';
import { updateCheckoutOrderItem } from '../';
import type { AnyAction } from 'redux';
import type { MockStoreEnhanced } from 'redux-mock-store';
import type { StoreState } from '../../../types';
import type { ThunkDispatch } from 'redux-thunk';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  patchCheckoutOrderItem: jest.fn(),
}));

const patchCheckoutOrderItem =
  orginalPatchCheckoutOrderItem as jest.MockedFunction<
    typeof orginalPatchCheckoutOrderItem
  >;

describe('updateCheckoutOrderItem() action creator', () => {
  const checkoutOrderId = 1;
  const itemId = 98743;
  const data = {
    quantity: 2,
  };
  const expectedConfig = undefined;
  let store: MockStoreEnhanced<
    StoreState,
    ThunkDispatch<StoreState, undefined, AnyAction>
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ checkout: INITIAL_STATE }, undefined) as typeof store;
  });

  it('should create the correct actions for when the remove checkout order item procedure fails', async () => {
    const expectedError = new Error('fetch checkout error');
    patchCheckoutOrderItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        updateCheckoutOrderItem(checkoutOrderId, itemId, data),
      );
    } catch (error) {
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
    }
  });

  it('should create the correct actions for when the remove checkout order item procedure is successful', async () => {
    patchCheckoutOrderItem.mockResolvedValueOnce(200);
    await store.dispatch(
      updateCheckoutOrderItem(checkoutOrderId, itemId, data),
    );

    const actionResults = store.getActions();

    expect.assertions(3);
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
