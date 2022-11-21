import { doGetUserBenefits } from '../';
import { mockGetUserBenefitsResponse } from '../../__fixtures__/userBenefits.fixtures';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

describe('doGetUserBenefits action creator', () => {
  let store;
  const getUserBenefits = jest.fn();
  const action = doGetUserBenefits(getUserBenefits);
  const userId = 123456789;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get user benefits procedure fails', async () => {
    const expectedError = new Error('get user benefits error');

    getUserBenefits.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserBenefits).toHaveBeenCalledTimes(1);
      expect(getUserBenefits).toHaveBeenCalledWith(userId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_USER_BENEFITS_REQUEST },
          {
            type: actionTypes.GET_USER_BENEFITS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get user benefits procedure is successful', async () => {
    getUserBenefits.mockResolvedValueOnce(mockGetUserBenefitsResponse);

    await store.dispatch(action(userId));

    const actionResults = store.getActions();

    expect(getUserBenefits).toHaveBeenCalledTimes(1);
    expect(getUserBenefits).toHaveBeenCalledWith(userId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_USER_BENEFITS_REQUEST },
      {
        payload: mockGetUserBenefitsResponse,
        type: actionTypes.GET_USER_BENEFITS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_USER_BENEFITS_SUCCESS,
      }),
    ).toMatchSnapshot('get guest user success payload');
  });
});
