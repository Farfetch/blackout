import * as actionTypes from '../../actionTypes.js';
import {
  draftOrderId,
  mockDraftOrderItemId as itemId,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import {
  patchDraftOrderItem,
  type PatchDraftOrderItemData,
} from '@farfetch/blackout-client';
import { updateDraftOrderItem } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchDraftOrderItem: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ draftOrders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

const data: PatchDraftOrderItemData = {
  quantity: 2,
  metadata: {
    message: 'Some engraved message within the product',
  },
};

describe('updateDraftOrderItem() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should update item the correct actions for when the update draft order item procedure fails', async () => {
    const expectedError = new Error('update draft order item error');

    (patchDraftOrderItem as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateDraftOrderItem(draftOrderId, itemId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(patchDraftOrderItem).toHaveBeenCalledTimes(1);
    expect(patchDraftOrderItem).toHaveBeenCalledWith(
      draftOrderId,
      itemId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_REQUEST,
          meta: { draftOrderId, itemId },
        },
        {
          type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_FAILURE,
          payload: { error: expectedError },
          meta: { draftOrderId, itemId },
        },
      ]),
    );
  });

  it('should update item the correct actions for when the update draft order item procedure is successful', async () => {
    const response = 204;

    (patchDraftOrderItem as jest.Mock).mockResolvedValueOnce(response);

    await updateDraftOrderItem(
      draftOrderId,
      itemId,
      data,
    )(store.dispatch).then((clientResult: unknown) => {
      expect(clientResult).toEqual(response);
    });

    expect(patchDraftOrderItem).toHaveBeenCalledTimes(1);
    expect(patchDraftOrderItem).toHaveBeenCalledWith(
      draftOrderId,
      itemId,
      data,
      expectedConfig,
    );

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_REQUEST,
        meta: { draftOrderId, itemId },
      },
      {
        type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_SUCCESS,
        payload: response,
        meta: { draftOrderId, itemId },
      },
    ]);
  });
});
