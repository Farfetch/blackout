import { doGetUserAttribute } from '../';
import { mockGetUserAttributeResponse } from '../../__fixtures__/userAttributes.fixtures';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

describe('doGetUserAttribute action creator', () => {
  let store;
  const getUserAttribute = jest.fn();
  const action = doGetUserAttribute(getUserAttribute);
  const userId = 123456789;
  const attributeId = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get user attribute procedure fails', async () => {
    const expectedError = new Error('get user attributes error');

    getUserAttribute.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, attributeId));
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
          { type: actionTypes.GET_USER_ATTRIBUTE_REQUEST },
          {
            type: actionTypes.GET_USER_ATTRIBUTE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get user attribute procedure is successful', async () => {
    getUserAttribute.mockResolvedValueOnce(mockGetUserAttributeResponse);

    await store.dispatch(action(userId, attributeId));

    const actionResults = store.getActions();

    expect(getUserAttribute).toHaveBeenCalledTimes(1);
    expect(getUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockGetUserAttributeResponse,
        type: actionTypes.GET_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('get guest user success payload');
  });
});
