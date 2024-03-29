import * as actionTypes from '../../actionTypes.js';
import { fetchOrderDocuments } from '../index.js';
import {
  getOrderDocuments,
  OrderDocumentType,
} from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockOrderDocumentsResponse,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrderDocuments: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const expectedConfig = undefined;
const types = [OrderDocumentType.ComercialInvoice];
let store: ReturnType<typeof ordersMockStore>;

describe('fetchOrderDocuments() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order documents procedure fails', async () => {
    const expectedError = new Error('fetch order documents error');

    (getOrderDocuments as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchOrderDocuments(orderId, types)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getOrderDocuments).toHaveBeenCalledTimes(1);
    expect(getOrderDocuments).toHaveBeenCalledWith(
      orderId,
      types,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_ORDER_DOCUMENTS_REQUEST },
        {
          type: actionTypes.FETCH_ORDER_DOCUMENTS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch order documents procedure is successful', async () => {
    (getOrderDocuments as jest.Mock).mockResolvedValueOnce(
      mockOrderDocumentsResponse,
    );

    await fetchOrderDocuments(
      orderId,
      types,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDocumentsResponse);
    });

    expect(getOrderDocuments).toHaveBeenCalledTimes(1);
    expect(getOrderDocuments).toHaveBeenCalledWith(
      orderId,
      types,
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
