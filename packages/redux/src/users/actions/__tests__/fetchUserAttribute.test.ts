import { actionTypes } from '../../';
import { fetchUserAttribute } from '../';
import { getUserAttribute } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockGetUserAttributeResponse } from '../../__fixtures__/userAttribute.fixtures';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserAttribute action creator', () => {
  let store;
  const userId = 123456789;
  const attributeId = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user attribute procedure fails', async () => {
    const expectedError = new Error('fetch user attributes error');

    getUserAttribute.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchUserAttribute(userId, attributeId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserAttribute).toHaveBeenCalledTimes(1);
      expect(getUserAttribute).toHaveBeenCalledWith(
        userId,
        attributeId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_USER_ATTRIBUTE_REQUEST },
          {
            type: actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch user attribute procedure is successful', async () => {
    getUserAttribute.mockResolvedValueOnce(mockGetUserAttributeResponse);

    await store.dispatch(fetchUserAttribute(userId, attributeId));

    const actionResults = store.getActions();

    expect(getUserAttribute).toHaveBeenCalledTimes(1);
    expect(getUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockGetUserAttributeResponse,
        type: actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('fetch guest user success payload');
  });
});
