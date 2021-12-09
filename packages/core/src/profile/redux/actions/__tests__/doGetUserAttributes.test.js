import { doGetUserAttributes } from '../';
import { mockGetUserAttributesResponse } from '../../__fixtures__/userAttributes.fixtures';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

describe('doGetUserAttributes action creator', () => {
  let store;
  const getUserAttributes = jest.fn();
  const action = doGetUserAttributes(getUserAttributes);
  const userId = 123456789;
  const query = {};
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get user attributes procedure fails', async () => {
    const expectedError = new Error('get user attributes error');

    getUserAttributes.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserAttributes).toHaveBeenCalledTimes(1);
      expect(getUserAttributes).toHaveBeenCalledWith(
        userId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_USER_ATTRIBUTES_REQUEST },
          {
            type: actionTypes.GET_USER_ATTRIBUTES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get user attributes procedure is successful', async () => {
    getUserAttributes.mockResolvedValueOnce(mockGetUserAttributesResponse);

    await store.dispatch(action(userId, query));

    const actionResults = store.getActions();

    expect(getUserAttributes).toHaveBeenCalledTimes(1);
    expect(getUserAttributes).toHaveBeenCalledWith(
      userId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_USER_ATTRIBUTES_REQUEST },
      {
        payload: mockGetUserAttributesResponse,
        type: actionTypes.GET_USER_ATTRIBUTES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_USER_ATTRIBUTES_SUCCESS,
      }),
    ).toMatchSnapshot('get guest user success payload');
  });
});
