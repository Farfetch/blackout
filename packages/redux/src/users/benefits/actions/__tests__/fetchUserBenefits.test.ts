import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  expectedBenefitsNormalizedPayload,
  mockGetBenefitsResponse,
} from 'tests/__fixtures__/users/index.mjs';
import { fetchUserBenefits } from '../index.js';
import { find } from 'lodash-es';
import { getUserBenefits } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserBenefits: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

const userId = 10000;
const expectedConfig = undefined;
let store = usersMockStore();

const normalizeSpy = jest.spyOn(normalizr, 'normalize');

describe('fetchBenefits() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user benefits procedure fails', async () => {
    const expectedError = new Error('get user benefits error');

    (getUserBenefits as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserBenefits(userId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserBenefits).toHaveBeenCalledTimes(1);
    expect(getUserBenefits).toHaveBeenCalledWith(userId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_BENEFITS_REQUEST },
        {
          type: actionTypes.FETCH_USER_BENEFITS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user benefits procedure is successful', async () => {
    (getUserBenefits as jest.Mock).mockResolvedValueOnce(
      mockGetBenefitsResponse,
    );

    await fetchUserBenefits(userId)(store.dispatch);

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUserBenefits).toHaveBeenCalledTimes(1);
    expect(getUserBenefits).toHaveBeenCalledWith(userId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_BENEFITS_REQUEST },
      {
        payload: expectedBenefitsNormalizedPayload,
        type: actionTypes.FETCH_USER_BENEFITS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_BENEFITS_SUCCESS,
      }),
    ).toMatchSnapshot('get user benefits success payload');
  });
});
