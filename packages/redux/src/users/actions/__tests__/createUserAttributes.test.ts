import { actionTypes } from '../..';
import { createUserAttributes } from '../';
import { INITIAL_STATE } from '../../reducer';
import { mockPostUserAttributesResponse } from '../../__fixtures__/userAttributes.fixtures';
import { mockStore } from '../../../../tests';
import { postUserAttributes } from '@farfetch/blackout-client/users';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  postUserAttributes: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createUserAttributes action creator', () => {
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
  const userId = 12345;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create user attributes procedure fails', async () => {
    const expectedError = new Error('create user attributes error');

    postUserAttributes.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createUserAttributes(userId, data));
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
          { type: actionTypes.CREATE_USER_ATTRIBUTES_REQUEST },
          {
            type: actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create user attributes procedure is successful', async () => {
    postUserAttributes.mockResolvedValueOnce(mockPostUserAttributesResponse);
    await store.dispatch(createUserAttributes(userId, data));

    const actionResults = store.getActions();

    expect(postUserAttributes).toHaveBeenCalledTimes(1);
    expect(postUserAttributes).toHaveBeenCalledWith(
      userId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_ATTRIBUTES_REQUEST },
      {
        payload: mockPostUserAttributesResponse,
        type: actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
      }),
    ).toMatchSnapshot('create user attributes success payload');
  });
});
