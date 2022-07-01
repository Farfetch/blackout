import * as actionTypes from '../../actionTypes';
import { createUserAttributes } from '../';
import { INITIAL_STATE } from '../../../reducer';
import { mockPostUserAttributesResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { postUserAttribute } from '@farfetch/blackout-client';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createUserAttributes action creator', () => {
  let store = usersMockStore();
  const userId = 12345;
  const data = {
    userId,
    type: 'Generic',
    channelCode: 'channel_abc',
    details: {
      items: {
        key1: 'value1',
        key2: 'value2',
      },
    },
  };
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create user attributes procedure fails', async () => {
    const expectedError = new Error('create user attributes error');

    (postUserAttribute as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createUserAttributes(userId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postUserAttribute).toHaveBeenCalledTimes(1);
      expect(postUserAttribute).toHaveBeenCalledWith(
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
    (postUserAttribute as jest.Mock).mockResolvedValueOnce(
      mockPostUserAttributesResponse,
    );
    await store.dispatch(createUserAttributes(userId, data));

    const actionResults = store.getActions();

    expect(postUserAttribute).toHaveBeenCalledTimes(1);
    expect(postUserAttribute).toHaveBeenCalledWith(
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
