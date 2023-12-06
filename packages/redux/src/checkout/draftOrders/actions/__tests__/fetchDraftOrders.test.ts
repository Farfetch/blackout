import * as actionTypes from '../../actionTypes.js';
import { fetchDraftOrders } from '../index.js';
import { getDraftOrders } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockFetchDraftOrdersNormalizedPayload,
  mockDraftOrdersQuery as query,
  mockDraftOrdersResponses as response,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getDraftOrders: jest.fn(),
}));

const hash = '?customerid=123';

const ordersMockStore = (state = {}) =>
  mockStore({ draftOrders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchDraftOrders() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should get the correct actions for when the get all draft orders procedure fails', async () => {
    const expectedError = new Error('get all draft orders error');

    (getDraftOrders as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchDraftOrders(query)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getDraftOrders).toHaveBeenCalledTimes(1);
    expect(getDraftOrders).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_DRAFT_ORDERS_REQUEST,
          meta: { hash },
        },
        {
          type: actionTypes.FETCH_DRAFT_ORDERS_FAILURE,
          payload: { error: expectedError },
          meta: { hash },
        },
      ]),
    );
  });

  it('should get the correct actions for when the get all draft orders procedure is successful', async () => {
    (getDraftOrders as jest.Mock).mockResolvedValueOnce(response);

    await fetchDraftOrders(query)(store.dispatch).then(
      (clientResult: unknown) => {
        expect(clientResult).toEqual(response);
      },
    );

    expect(getDraftOrders).toHaveBeenCalledTimes(1);
    expect(getDraftOrders).toHaveBeenCalledWith(query, expectedConfig);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_DRAFT_ORDERS_REQUEST,
        meta: { hash },
      },
      {
        type: actionTypes.FETCH_DRAFT_ORDERS_SUCCESS,
        payload: mockFetchDraftOrdersNormalizedPayload,
        meta: { hash },
      },
    ]);
  });
});
