import {
  expectedNormalizedPayload,
  mockProfileResponse,
} from '../../__fixtures__/profile.fixtures';
import { mockStore } from '../../../../../tests';
import doGetProfile from '../doGetProfile';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetProfile action creator', () => {
  const getProfile = jest.fn();
  const action = doGetProfile(getProfile);
  const params = { userExtraInfo: 'Membership' };

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get profile procedure fails', async () => {
    const expectedError = new Error('get profile error');

    getProfile.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(params));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProfile).toHaveBeenCalledTimes(1);
      expect(getProfile).toHaveBeenCalledWith(params, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PROFILE_REQUEST },
          {
            type: actionTypes.GET_PROFILE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get profile procedure is successful', async () => {
    getProfile.mockResolvedValueOnce(mockProfileResponse);

    await store.dispatch(action(params));

    const actionResults = store.getActions();

    expect(getProfile).toHaveBeenCalledTimes(1);
    expect(getProfile).toHaveBeenCalledWith(params, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PROFILE_REQUEST },
      {
        payload: expectedNormalizedPayload,
        type: actionTypes.GET_PROFILE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PROFILE_SUCCESS,
      }),
    ).toMatchSnapshot('get profile success payload');
  });
});
