import { mockDeleteUserAttributeResponse } from '../../__fixtures__/userAttribute.fixtures';
import { mockStore } from '../../../../../tests';
import doDeleteUserAttribute from '../doDeleteUserAttribute';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

let store;

describe('doDeleteUserAttribute action creator', () => {
  const userId = 123456;
  const attributeId = '123456';
  const expectedConfig = undefined;
  const deleteUserAttribute = jest.fn();
  const action = doDeleteUserAttribute(deleteUserAttribute);

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the delete user attribute procedure fails', async () => {
    const expectedError = new Error('delete user attribute error');

    deleteUserAttribute.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, attributeId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteUserAttribute).toHaveBeenCalledTimes(1);
      expect(deleteUserAttribute).toHaveBeenCalledWith(
        userId,
        attributeId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.DELETE_USER_ATTRIBUTE_REQUEST },
          {
            type: actionTypes.DELETE_USER_ATTRIBUTE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete user attribute procedure is successful', async () => {
    deleteUserAttribute.mockResolvedValueOnce(mockDeleteUserAttributeResponse);

    await store.dispatch(action(userId, attributeId));

    const actionResults = store.getActions();

    expect(deleteUserAttribute).toHaveBeenCalledTimes(1);
    expect(deleteUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockDeleteUserAttributeResponse,
        type: actionTypes.DELETE_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('delete user attribute success payload');
  });
});
