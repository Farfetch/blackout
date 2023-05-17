import * as actionTypes from '../../actionTypes.js';
import { fetchOrderDocument } from '../index.js';
import {
  fileId,
  mockOrderDocumentsResponse,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import { getOrderDocument } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrderDocument: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchOrderDocument() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions fetch when the get order document procedure fails', async () => {
    const expectedError = new Error('fetch order document error');

    (getOrderDocument as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchOrderDocument(orderId, fileId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getOrderDocument).toHaveBeenCalledTimes(1);
    expect(getOrderDocument).toHaveBeenCalledWith(
      orderId,
      fileId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_ORDER_DOCUMENT_REQUEST },
        {
          type: actionTypes.FETCH_ORDER_DOCUMENT_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch order document procedure is successful', async () => {
    (getOrderDocument as jest.Mock).mockResolvedValueOnce(
      mockOrderDocumentsResponse,
    );

    await fetchOrderDocument(
      orderId,
      fileId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDocumentsResponse);
    });

    expect(getOrderDocument).toHaveBeenCalledTimes(1);
    expect(getOrderDocument).toHaveBeenCalledWith(
      orderId,
      fileId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ORDER_DOCUMENT_REQUEST },
      { type: actionTypes.FETCH_ORDER_DOCUMENT_SUCCESS },
    ]);
  });
});
