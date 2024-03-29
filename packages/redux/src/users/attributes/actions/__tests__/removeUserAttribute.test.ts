import * as actionTypes from '../../actionTypes.js';
import {
  attributeId,
  mockDeleteUserAttributeResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { deleteUserAttribute } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserAttribute } from '..//index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('removeUserAttribute action creator', () => {
  let store = usersMockStore();
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the remove user attribute procedure fails', async () => {
    const expectedError = new Error('remove user attribute error');

    (deleteUserAttribute as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await removeUserAttribute(userId, attributeId)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the remove user attribute procedure is successful', async () => {
    (deleteUserAttribute as jest.Mock).mockResolvedValueOnce(
      mockDeleteUserAttributeResponse,
    );

    await removeUserAttribute(userId, attributeId)(store.dispatch);

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
