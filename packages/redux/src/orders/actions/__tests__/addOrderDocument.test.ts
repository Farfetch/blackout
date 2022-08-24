import * as actionTypes from '../../actionTypes';
import { addOrderDocument } from '..';
import {
  fileId,
  mockOrderDocumentPayload,
  orderId,
} from 'tests/__fixtures__/orders';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postOrderDocument } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postOrderDocument: jest.fn(),
}));

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('addOrderDocument() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the add order document procedure fails', async () => {
    const expectedError = new Error('add order document error');

    (postOrderDocument as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await addOrderDocument(
      orderId,
      fileId,
      mockOrderDocumentPayload,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(postOrderDocument).toHaveBeenCalledTimes(1);
      expect(postOrderDocument).toHaveBeenCalledWith(
        orderId,
        fileId,
        mockOrderDocumentPayload,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.ADD_ORDER_DOCUMENT_REQUEST },
          {
            type: actionTypes.ADD_ORDER_DOCUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the add order document procedure is successful', async () => {
    (postOrderDocument as jest.Mock).mockResolvedValueOnce(undefined);

    await addOrderDocument(
      orderId,
      fileId,
      mockOrderDocumentPayload,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(postOrderDocument).toHaveBeenCalledTimes(1);
    expect(postOrderDocument).toHaveBeenCalledWith(
      orderId,
      fileId,
      mockOrderDocumentPayload,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.ADD_ORDER_DOCUMENT_REQUEST },
      { type: actionTypes.ADD_ORDER_DOCUMENT_SUCCESS },
    ]);
  });
});
