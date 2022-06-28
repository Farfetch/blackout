import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { deleteCheckoutOrderItem as originalDeleteCheckoutOrderItem } from '@farfetch/blackout-client';
import {
  REMOVE_CHECKOUT_ORDER_ITEM_FAILURE,
  REMOVE_CHECKOUT_ORDER_ITEM_REQUEST,
  REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS,
} from '../../actionTypes';
import removeCheckoutOrderItem from '../removeCheckoutOrderItem';
import type { AnyAction } from 'redux';
import type { MockStoreEnhanced } from 'redux-mock-store';
import type { StoreState } from '../../../types';
import type { ThunkDispatch } from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteCheckoutOrderItem: jest.fn(),
}));

const deleteCheckoutOrderItem =
  originalDeleteCheckoutOrderItem as jest.MockedFunction<
    typeof originalDeleteCheckoutOrderItem
  >;

describe('removeCheckoutOrderItem() action creator', () => {
  const checkoutOrderId = 1;
  const itemId = 98743;
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
    deleteCheckoutOrderItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removeCheckoutOrderItem(checkoutOrderId, itemId));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the remove checkout order item procedure is successful', async () => {
    deleteCheckoutOrderItem.mockResolvedValueOnce(200);
    await store.dispatch(removeCheckoutOrderItem(checkoutOrderId, itemId));

    const actionResults = store.getActions();

    expect.assertions(3);
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
