import * as actionTypes from '../../actionTypes';
import { deleteUserAttribute } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockDeleteUserAttributeResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { removeUserAttribute } from '../';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('removeUserAttribute action creator', () => {
  let store = usersMockStore();
  const userId = 123456;
  const attributeId = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the remove user attribute procedure fails', async () => {
    const expectedError = new Error('remove user attribute error');

    (deleteUserAttribute as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removeUserAttribute(userId, attributeId));
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
          { type: actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST },
          {
            type: actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the remove user attribute procedure is successful', async () => {
    (deleteUserAttribute as jest.Mock).mockResolvedValueOnce(
      mockDeleteUserAttributeResponse,
    );

    await store.dispatch(removeUserAttribute(userId, attributeId));

    const actionResults = store.getActions();

    expect(deleteUserAttribute).toHaveBeenCalledTimes(1);
    expect(deleteUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockDeleteUserAttributeResponse,
        type: actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('remove user attribute success payload');
  });
});
