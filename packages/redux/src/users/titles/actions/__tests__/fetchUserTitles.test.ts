import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  expectedTitlesNormalizedPayload,
  mockGetTitlesResponse,
} from 'tests/__fixtures__/users';
import { fetchUserTitles } from '..';
import { getUserTitles } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserTitles: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

describe('fetchUserTitles() action creator', () => {
  const query = {
    page: 1,
    pageSize: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user titles procedure fails', async () => {
    const expectedError = new Error('get user titles error');

    (getUserTitles as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserTitles(query)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserTitles).toHaveBeenCalledTimes(1);
    expect(getUserTitles).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_TITLES_REQUEST },
        {
          type: actionTypes.FETCH_USER_TITLES_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user titles procedure is successful', async () => {
    (getUserTitles as jest.Mock).mockResolvedValueOnce(mockGetTitlesResponse);

    await fetchUserTitles(query)(store.dispatch);

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUserTitles).toHaveBeenCalledTimes(1);
    expect(getUserTitles).toHaveBeenCalledWith(query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_TITLES_REQUEST },
      {
        payload: expectedTitlesNormalizedPayload,
        type: actionTypes.FETCH_USER_TITLES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_TITLES_SUCCESS,
      }),
    ).toMatchSnapshot('get user titles success payload');
  });
});
