import {
  fileId,
  mockOrderDocumentPayload,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doPostOrderDocument from '../doPostOrderDocument';
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

describe('doPostOrderDocuments() action creator', () => {
  const postOrderDocument = jest.fn();
  const action = doPostOrderDocument(postOrderDocument);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the post order document procedure fails', async () => {
    const expectedError = new Error('post order document error');

    postOrderDocument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        action({ orderId, fileId }, mockOrderDocumentPayload),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postOrderDocument).toHaveBeenCalledTimes(1);
      expect(postOrderDocument).toHaveBeenCalledWith(
        { orderId, fileId },
        mockOrderDocumentPayload,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_ORDER_DOCUMENT_REQUEST },
          {
            type: actionTypes.POST_ORDER_DOCUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post order document procedure is successful', async () => {
    postOrderDocument.mockResolvedValueOnce();
    await store.dispatch(action({ orderId, fileId }, mockOrderDocumentPayload));

    const actionResults = store.getActions();

    expect(postOrderDocument).toHaveBeenCalledTimes(1);
    expect(postOrderDocument).toHaveBeenCalledWith(
      { orderId, fileId },
      mockOrderDocumentPayload,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_ORDER_DOCUMENT_REQUEST },
      {
        type: actionTypes.POST_ORDER_DOCUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_ORDER_DOCUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('post order document success payload');
  });
});
