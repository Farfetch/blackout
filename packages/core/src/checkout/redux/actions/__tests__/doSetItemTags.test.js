import {
  checkoutId,
  checkoutOrderItemId,
  expectedNormalizedPayload,
  mockResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doSetItemTags from '../doSetItemTags';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doSetItemTags() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const putItemTags = jest.fn();
  const action = doSetItemTags(putItemTags);
  const data = {
    something: 'something',
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set items tags procedure fails', async () => {
    const expectedError = new Error('set item tags error');

    putItemTags.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, checkoutOrderItemId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putItemTags).toHaveBeenCalledTimes(1);
      expect(putItemTags).toHaveBeenCalledWith(
        checkoutId,
        checkoutOrderItemId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.SET_ITEM_TAGS_REQUEST },
          {
            type: actionTypes.SET_ITEM_TAGS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set items tags procedure is successful', async () => {
    putItemTags.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(checkoutId, checkoutOrderItemId, data));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putItemTags).toHaveBeenCalledTimes(1);
    expect(putItemTags).toHaveBeenCalledWith(
      checkoutId,
      checkoutOrderItemId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_ITEM_TAGS_REQUEST },
      {
        type: actionTypes.SET_ITEM_TAGS_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_ITEM_TAGS_SUCCESS,
      }),
    ).toMatchSnapshot('set item tags success payload');
  });
});
