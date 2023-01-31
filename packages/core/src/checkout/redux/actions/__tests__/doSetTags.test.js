import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doSetTags from '../doSetTags';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doSetTags() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const putTags = jest.fn();
  const action = doSetTags(putTags);
  const data = {
    something: 'something',
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set tags procedure fails', async () => {
    const expectedError = new Error('set tags error');

    putTags.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putTags).toHaveBeenCalledTimes(1);
      expect(putTags).toHaveBeenCalledWith(checkoutId, data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.SET_TAGS_REQUEST },
          {
            type: actionTypes.SET_TAGS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set tags procedure is successful', async () => {
    putTags.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(checkoutId, data));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putTags).toHaveBeenCalledTimes(1);
    expect(putTags).toHaveBeenCalledWith(checkoutId, data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_TAGS_REQUEST },
      {
        type: actionTypes.SET_TAGS_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_TAGS_SUCCESS,
      }),
    ).toMatchSnapshot('set tags success payload');
  });
});
