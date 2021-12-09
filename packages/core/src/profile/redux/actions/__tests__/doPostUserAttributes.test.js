import { mockPostUserAttributesResponse } from '../../__fixtures__/userAttributes.fixtures';
import { mockStore } from '../../../../../tests';
import doPostUserAttributes from '../doPostUserAttributes';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doPostUserAttributes action creator', () => {
  const profileMockStore = (state = {}) =>
    mockStore({ profile: reducer() }, state);

  let store;
  const data = {
    type: 'Generic',
    channelCode: 'channel_abc',
    details: {
      items: {
        key1: 'value1',
        key2: 'value2',
      },
    },
  };
  const postUserAttributes = jest.fn();
  const action = doPostUserAttributes(postUserAttributes);
  const userId = 12345;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the post user attributes procedure fails', async () => {
    const expectedError = new Error('post user attributes error');

    postUserAttributes.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postUserAttributes).toHaveBeenCalledTimes(1);
      expect(postUserAttributes).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_USER_ATTRIBUTES_REQUEST },
          {
            type: actionTypes.POST_USER_ATTRIBUTES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post user attributes procedure is successful', async () => {
    postUserAttributes.mockResolvedValueOnce(mockPostUserAttributesResponse);
    await store.dispatch(action(userId, data));

    const actionResults = store.getActions();

    expect(postUserAttributes).toHaveBeenCalledTimes(1);
    expect(postUserAttributes).toHaveBeenCalledWith(
      userId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_USER_ATTRIBUTES_REQUEST },
      {
        payload: mockPostUserAttributesResponse,
        type: actionTypes.POST_USER_ATTRIBUTES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_USER_ATTRIBUTES_SUCCESS,
      }),
    ).toMatchSnapshot('post user attributes success payload');
  });
});
