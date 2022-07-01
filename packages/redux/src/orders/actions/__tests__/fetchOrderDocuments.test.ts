import * as actionTypes from '../../actionTypes';
import { fetchOrderDocuments } from '..';
import { getOrderDocuments } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockOrderDocumentsResponse } from 'tests/__fixtures__/orders';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrderDocuments: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const orderId = '24BJKS';
const expectedConfig = undefined;
const types = ['ComercialInvoice'];
let store;

describe('fetchOrderDocuments() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order documents procedure fails', async () => {
    const expectedError = new Error('fetch order documents error');

    getOrderDocuments.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchOrderDocuments(orderId, types));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the fetch order documents procedure is successful', async () => {
    getOrderDocuments.mockResolvedValueOnce(mockOrderDocumentsResponse);

    expect.assertions(4);

    await store
      .dispatch(fetchOrderDocuments(orderId, types))
      .then(clientResult => {
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
