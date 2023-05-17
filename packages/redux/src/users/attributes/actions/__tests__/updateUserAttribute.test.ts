import * as actionTypes from '../../actionTypes.js';
import {
  attributeId,
  mockPatchUserAttributeResponse,
  mockUpdateUserAttributeData,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { patchUserAttribute } from '@farfetch/blackout-client';
import { updateUserAttribute } from '..//index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('updateUserAttribute action creator', () => {
  let store = usersMockStore();
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update user attribute procedure fails', async () => {
    const expectedError = new Error('update user attribute error');

    (patchUserAttribute as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateUserAttribute(
          userId,
          attributeId,
          mockUpdateUserAttributeData,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(patchUserAttribute).toHaveBeenCalledTimes(1);
    expect(patchUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      mockUpdateUserAttributeData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST },
        {
          type: actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the update user attribute procedure is successful', async () => {
    (patchUserAttribute as jest.Mock).mockResolvedValueOnce(
      mockPatchUserAttributeResponse,
    );

    await updateUserAttribute(
      userId,
      attributeId,
      mockUpdateUserAttributeData,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(patchUserAttribute).toHaveBeenCalledTimes(1);
    expect(patchUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      mockUpdateUserAttributeData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockPatchUserAttributeResponse,
        type: actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('update user attribute success payload');
  });
});
