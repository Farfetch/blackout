import {
  expectedNormalizedPayload,
  mockProfileResponse,
} from '../../__fixtures__/profile.fixtures';
import { mockStore } from '../../../../../tests';
import doUpdateProfile from '../doUpdateProfile';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doUpdateProfile action creator', () => {
  const profileId = 29538482;
  const mockRequestBody = {
    name: 'pepe',
    email: 'pepe@acme.com',
  };
  const updateProfile = jest.fn();
  const action = doUpdateProfile(updateProfile);

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the update profile procedure fails', async () => {
    const expectedError = new Error('update profile error');

    updateProfile.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(profileId, {}));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(updateProfile).toHaveBeenCalledTimes(1);
      expect(updateProfile).toHaveBeenCalledWith(profileId, {}, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_PROFILE_REQUEST },
          {
            type: actionTypes.UPDATE_PROFILE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update profile procedure is successful', async () => {
    updateProfile.mockResolvedValueOnce(mockProfileResponse);

    await store.dispatch(action(profileId, mockRequestBody));

    const actionResults = store.getActions();

    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(
      profileId,
      mockRequestBody,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_PROFILE_REQUEST },
      {
        payload: expectedNormalizedPayload,
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
      }),
    ).toMatchSnapshot('update profile success payload');
  });
});
