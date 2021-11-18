import { mockOrderDocumentsResponse } from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrderDocuments from '../doGetOrderDocuments';
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
const types = ['ComercialInvoice'];
let store;

describe('doGetOrderDocuments() action creator', () => {
  const getOrderDocuments = jest.fn();
  const action = doGetOrderDocuments(getOrderDocuments);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order documents procedure fails', async () => {
    const expectedError = new Error('get order documents error');

    getOrderDocuments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action({ orderId, types }));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderDocuments).toHaveBeenCalledTimes(1);
      expect(getOrderDocuments).toHaveBeenCalledWith(
        { orderId, types },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_ORDER_DOCUMENTS_REQUEST },
          {
            type: actionTypes.GET_ORDER_DOCUMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get order documents procedure is successful', async () => {
    getOrderDocuments.mockResolvedValueOnce(mockOrderDocumentsResponse);
    await store.dispatch(action({ orderId, types }));

    const actionResults = store.getActions();

    expect(getOrderDocuments).toHaveBeenCalledTimes(1);
    expect(getOrderDocuments).toHaveBeenCalledWith(
      { orderId, types },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDER_DOCUMENTS_REQUEST },
      {
        type: actionTypes.GET_ORDER_DOCUMENTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDER_DOCUMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('get order documents success payload');
  });
});
