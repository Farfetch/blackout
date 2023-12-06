import * as actionTypes from '../../actionTypes.js';
import { createDraftOrder } from '../index.js';
import {
  mockDataDraftOrder as data,
  mockFetchDraftOrderNormalizedPayload,
  mockDraftOrderResponse as response,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { checkoutId as orderId } from 'tests/__fixtures__/checkout/checkout.fixtures.mjs';
import { postDraftOrders } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postDraftOrders: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ draftOrders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('createDraftOrder() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the create draft order procedure fails', async () => {
    const expectedError = new Error('create draft order error');

    (postDraftOrders as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await createDraftOrder(data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postDraftOrders).toHaveBeenCalledTimes(1);
    expect(postDraftOrders).toHaveBeenCalledWith(data, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_DRAFT_ORDER_REQUEST, meta: { orderId } },
        {
          type: actionTypes.CREATE_DRAFT_ORDER_FAILURE,
          payload: { error: expectedError },
          meta: { orderId },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create draft order procedure is successful', async () => {
    (postDraftOrders as jest.Mock).mockResolvedValueOnce(response);

    await createDraftOrder(data)(store.dispatch).then(clientResult => {
      expect(clientResult).toEqual(response);
    });

    expect(postDraftOrders).toHaveBeenCalledTimes(1);
    expect(postDraftOrders).toHaveBeenCalledWith(data, expectedConfig);

    expect(store.getActions()).toEqual([
      { type: actionTypes.CREATE_DRAFT_ORDER_REQUEST, meta: { orderId } },
      {
        type: actionTypes.CREATE_DRAFT_ORDER_SUCCESS,
        meta: { orderId },
        payload: mockFetchDraftOrderNormalizedPayload,
      },
    ]);
  });
});
