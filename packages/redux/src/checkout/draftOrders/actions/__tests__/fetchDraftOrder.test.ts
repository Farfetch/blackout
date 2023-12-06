import * as actionTypes from '../../actionTypes.js';
import {
  draftOrderId,
  mockFetchDraftOrderNormalizedPayload,
  mockDraftOrdersQuery as query,
  mockDraftOrderResponse as response,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { fetchDraftOrder } from '../index.js';
import { getDraftOrder } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getDraftOrder: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ draftOrders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchDraftOrder() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should get the correct actions for when the get draft order procedure fails', async () => {
    const expectedError = new Error('get draft order error');

    (getDraftOrder as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchDraftOrder(draftOrderId, query)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getDraftOrder).toHaveBeenCalledTimes(1);
    expect(getDraftOrder).toHaveBeenCalledWith(
      draftOrderId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_DRAFT_ORDER_REQUEST, meta: { draftOrderId } },
        {
          type: actionTypes.FETCH_DRAFT_ORDER_FAILURE,
          payload: { error: expectedError },
          meta: { draftOrderId },
        },
      ]),
    );
  });

  it('should get the correct actions for when the get draft order procedure is successful', async () => {
    (getDraftOrder as jest.Mock).mockResolvedValueOnce(response);

    await fetchDraftOrder(
      draftOrderId,
      query,
    )(store.dispatch).then((clientResult: unknown) => {
      expect(clientResult).toEqual(response);
    });

    expect(getDraftOrder).toHaveBeenCalledTimes(1);
    expect(getDraftOrder).toHaveBeenCalledWith(
      draftOrderId,
      query,
      expectedConfig,
    );

    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_DRAFT_ORDER_REQUEST, meta: { draftOrderId } },
      {
        type: actionTypes.FETCH_DRAFT_ORDER_SUCCESS,
        payload: mockFetchDraftOrderNormalizedPayload,
        meta: { draftOrderId },
      },
    ]);
  });
});
