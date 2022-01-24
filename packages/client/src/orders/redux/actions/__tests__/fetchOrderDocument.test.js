import { actionTypes } from '../..';
import { fetchOrderDocument } from '../';
import {
  fileId,
  mockOrderDocumentsResponse,
} from '../../__fixtures__/orders.fixtures';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const orderId = '24BJKS';
const expectedConfig = undefined;
let store;

describe('fetchOrderDocuments() action creator', () => {
  const getOrderDocument = jest.fn();
  const action = fetchOrderDocument(getOrderDocument);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions fetch when the get order document procedure fails', async () => {
    const expectedError = new Error('fetch order document error');

    getOrderDocument.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(action({ orderId, fileId })).catch(error => {
      expect(error).toBe(expectedError);
      expect(getOrderDocument).toHaveBeenCalledTimes(1);
      expect(getOrderDocument).toHaveBeenCalledWith(
        { orderId, fileId },
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        { type: actionTypes.FETCH_ORDER_DOCUMENT_REQUEST },
        {
          payload: { error: expectedError },
          type: actionTypes.FETCH_ORDER_DOCUMENT_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch order document procedure is successful', async () => {
    getOrderDocument.mockResolvedValueOnce(mockOrderDocumentsResponse);

    expect.assertions(4);

    await store.dispatch(action({ orderId, fileId })).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDocumentsResponse);
    });

    expect(getOrderDocument).toHaveBeenCalledTimes(1);
    expect(getOrderDocument).toHaveBeenCalledWith(
      { orderId, fileId },
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ORDER_DOCUMENT_REQUEST },
      { type: actionTypes.FETCH_ORDER_DOCUMENT_SUCCESS },
    ]);
  });
});
