import {
  fileId,
  mockOrderDocumentsResponse,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrderDocument from '../doGetOrderDocument';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: reducer() }, state, mockMiddlewares);

const orderId = '24BJKS';
const expectedConfig = undefined;
let store;

describe('doGetOrderDocuments() action creator', () => {
  const getOrderDocument = jest.fn();
  const action = doGetOrderDocument(getOrderDocument);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order document procedure fails', async () => {
    const expectedError = new Error('get order document error');

    getOrderDocument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action({ orderId, fileId }));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderDocument).toHaveBeenCalledTimes(1);
      expect(getOrderDocument).toHaveBeenCalledWith(
        { orderId, fileId },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_ORDER_DOCUMENT_REQUEST },
          {
            type: actionTypes.GET_ORDER_DOCUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get order document procedure is successful', async () => {
    getOrderDocument.mockResolvedValueOnce(mockOrderDocumentsResponse);
    await store.dispatch(action({ orderId, fileId }));

    const actionResults = store.getActions();

    expect(getOrderDocument).toHaveBeenCalledTimes(1);
    expect(getOrderDocument).toHaveBeenCalledWith(
      { orderId, fileId },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDER_DOCUMENT_REQUEST },
      { type: actionTypes.GET_ORDER_DOCUMENT_SUCCESS },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDER_DOCUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('get order document success payload');
  });
});
