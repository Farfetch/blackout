import { actionTypes } from '../..';
import { fetchOrderDocuments } from '../';
import { INITIAL_STATE } from '../../reducer';
import { mockOrderDocumentsResponse } from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const orderId = '24BJKS';
const expectedConfig = undefined;
const types = ['ComercialInvoice'];
let store;

describe('fetchOrderDocuments() action creator', () => {
  const getOrderDocuments = jest.fn();
  const action = fetchOrderDocuments(getOrderDocuments);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order documents procedure fails', async () => {
    const expectedError = new Error('fetch order documents error');

    getOrderDocuments.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(action({ orderId, types })).catch(error => {
      expect(error).toBe(expectedError);
      expect(getOrderDocuments).toHaveBeenCalledTimes(1);
      expect(getOrderDocuments).toHaveBeenCalledWith(
        { orderId, types },
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        { type: actionTypes.FETCH_ORDER_DOCUMENTS_REQUEST },
        {
          payload: { error: expectedError },
          type: actionTypes.FETCH_ORDER_DOCUMENTS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch order documents procedure is successful', async () => {
    getOrderDocuments.mockResolvedValueOnce(mockOrderDocumentsResponse);

    expect.assertions(4);

    await store.dispatch(action({ orderId, types })).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDocumentsResponse);
    });

    expect(getOrderDocuments).toHaveBeenCalledTimes(1);
    expect(getOrderDocuments).toHaveBeenCalledWith(
      { orderId, types },
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ORDER_DOCUMENTS_REQUEST },
      {
        type: actionTypes.FETCH_ORDER_DOCUMENTS_SUCCESS,
      },
    ]);
  });
});
