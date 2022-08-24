import * as actionTypes from '../../actionTypes';
import { fetchOrderDocument } from '..';
import {
  fileId,
  mockOrderDocumentsResponse,
  orderId,
} from 'tests/__fixtures__/orders';
import { getOrderDocument } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';

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

    expect.assertions(4);

    await fetchOrderDocument(
      orderId,
      fileId,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the fetch order document procedure is successful', async () => {
    (getOrderDocument as jest.Mock).mockResolvedValueOnce(
      mockOrderDocumentsResponse,
    );

    expect.assertions(4);

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
