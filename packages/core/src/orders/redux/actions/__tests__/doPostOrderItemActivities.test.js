import {
  itemId,
  mockOrderDocumentPayload,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doPostOrderItemActivities from '../doPostOrderItemActivities';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const ordersMockStore = (state = {}) => mockStore({ orders: reducer() }, state);
const orderId = '24BJKS';
const expectedConfig = undefined;
let store;

describe('doPostOrderItemActivities() action creator', () => {
  const postOrderItemActivities = jest.fn();
  const action = doPostOrderItemActivities(postOrderItemActivities);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the post order item activities procedure fails', async () => {
    const expectedError = new Error('post order item activities error');

    postOrderItemActivities.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        action({ orderId, itemId }, mockOrderDocumentPayload),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postOrderItemActivities).toHaveBeenCalledTimes(1);
      expect(postOrderItemActivities).toHaveBeenCalledWith(
        { orderId, itemId },
        mockOrderDocumentPayload,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_ORDER_ITEM_ACTIVITIES_REQUEST },
          {
            type: actionTypes.POST_ORDER_ITEM_ACTIVITIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post order item activities procedure is successful', async () => {
    postOrderItemActivities.mockResolvedValueOnce();
    await store.dispatch(action({ orderId, itemId }, mockOrderDocumentPayload));

    const actionResults = store.getActions();

    expect(postOrderItemActivities).toHaveBeenCalledTimes(1);
    expect(postOrderItemActivities).toHaveBeenCalledWith(
      { orderId, itemId },
      mockOrderDocumentPayload,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_ORDER_ITEM_ACTIVITIES_REQUEST },
      {
        type: actionTypes.POST_ORDER_ITEM_ACTIVITIES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_ORDER_ITEM_ACTIVITIES_SUCCESS,
      }),
    ).toMatchSnapshot('post order item activities success payload');
  });
});
