import * as actionTypes from '../../actionTypes.js';
import {
  type DraftOrderData,
  patchDraftOrder,
} from '@farfetch/blackout-client';
import { draftOrderId } from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { updateDraftOrder } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchDraftOrder: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ draftOrders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

const data: DraftOrderData = {
  metadata: {
    message: 'Some engraved message within the product',
  },
};

describe('updateDraftOrder() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should update the correct actions for when the update draft order procedure fails', async () => {
    const expectedError = new Error('update draft order error');

    (patchDraftOrder as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await updateDraftOrder(draftOrderId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(patchDraftOrder).toHaveBeenCalledTimes(1);
    expect(patchDraftOrder).toHaveBeenCalledWith(
      draftOrderId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.UPDATE_DRAFT_ORDER_REQUEST,
          meta: { draftOrderId },
        },
        {
          type: actionTypes.UPDATE_DRAFT_ORDER_FAILURE,
          payload: { error: expectedError },
          meta: { draftOrderId },
        },
      ]),
    );
  });

  it('should update the correct actions for when the update draft order procedure is successful', async () => {
    const response = 204;

    (patchDraftOrder as jest.Mock).mockResolvedValueOnce(response);

    await updateDraftOrder(
      draftOrderId,
      data,
    )(store.dispatch).then((clientResult: unknown) => {
      expect(clientResult).toEqual(response);
    });

    expect(patchDraftOrder).toHaveBeenCalledTimes(1);
    expect(patchDraftOrder).toHaveBeenCalledWith(
      draftOrderId,
      data,
      expectedConfig,
    );

    expect(store.getActions()).toEqual([
      { type: actionTypes.UPDATE_DRAFT_ORDER_REQUEST, meta: { draftOrderId } },
      {
        type: actionTypes.UPDATE_DRAFT_ORDER_SUCCESS,
        payload: response,
        meta: { draftOrderId },
      },
    ]);
  });
});
