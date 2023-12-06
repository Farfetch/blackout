import * as actionTypes from '../../actionTypes.js';
import { deleteDraftOrder } from '@farfetch/blackout-client';
import { draftOrderId } from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeDraftOrder } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteDraftOrder: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ draftOrders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('removeDraftOrder() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should delete the correct actions for when the delete draft order procedure fails', async () => {
    const expectedError = new Error('delete draft order error');

    (deleteDraftOrder as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await removeDraftOrder(draftOrderId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteDraftOrder).toHaveBeenCalledTimes(1);
    expect(deleteDraftOrder).toHaveBeenCalledWith(draftOrderId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.REMOVE_DRAFT_ORDER_REQUEST,
          meta: { draftOrderId },
        },
        {
          type: actionTypes.REMOVE_DRAFT_ORDER_FAILURE,
          payload: { error: expectedError },
          meta: { draftOrderId },
        },
      ]),
    );
  });

  it('should delete the correct actions for when the delete draft order procedure is successful', async () => {
    const response = 204;

    (deleteDraftOrder as jest.Mock).mockResolvedValueOnce(response);

    await removeDraftOrder(draftOrderId)(store.dispatch).then(
      (clientResult: unknown) => {
        expect(clientResult).toEqual(response);
      },
    );

    expect(deleteDraftOrder).toHaveBeenCalledTimes(1);
    expect(deleteDraftOrder).toHaveBeenCalledWith(draftOrderId, expectedConfig);

    expect(store.getActions()).toEqual([
      { type: actionTypes.REMOVE_DRAFT_ORDER_REQUEST, meta: { draftOrderId } },
      {
        type: actionTypes.REMOVE_DRAFT_ORDER_SUCCESS,
        payload: response,
        meta: { draftOrderId },
      },
    ]);
  });
});
