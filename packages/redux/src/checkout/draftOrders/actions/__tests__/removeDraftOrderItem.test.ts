import * as actionTypes from '../../actionTypes.js';
import { deleteDraftOrderItem } from '@farfetch/blackout-client';
import {
  draftOrderId,
  mockDraftOrderItemId as itemId,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeDraftOrderItem } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteDraftOrderItem: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ draftOrders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('removeDraftOrderItem() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should delete the correct actions for when the delete draft order item procedure fails', async () => {
    const expectedError = new Error('Network Error');

    (deleteDraftOrderItem as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await removeDraftOrderItem(draftOrderId, itemId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteDraftOrderItem).toHaveBeenCalledTimes(1);
    expect(deleteDraftOrderItem).toHaveBeenCalledWith(
      draftOrderId,
      itemId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_REQUEST,
          meta: { draftOrderId, itemId },
        },
        {
          type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_FAILURE,
          payload: { error: expectedError },
          meta: { draftOrderId, itemId },
        },
      ]),
    );
  });

  it('should delete the correct actions for when the delete draft order item procedure is successful', async () => {
    const response = 204;

    (deleteDraftOrderItem as jest.Mock).mockResolvedValueOnce(response);

    await removeDraftOrderItem(
      draftOrderId,
      itemId,
    )(store.dispatch).then((clientResult: unknown) => {
      expect(clientResult).toEqual(response);
    });

    expect(deleteDraftOrderItem).toHaveBeenCalledTimes(1);
    expect(deleteDraftOrderItem).toHaveBeenCalledWith(
      draftOrderId,
      itemId,
      expectedConfig,
    );

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_REQUEST,
        meta: { draftOrderId, itemId },
      },
      {
        type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_SUCCESS,
        payload: response,
        meta: { draftOrderId, itemId },
      },
    ]);
  });
});
