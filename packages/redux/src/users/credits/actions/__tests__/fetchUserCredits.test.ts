import * as actionTypes from '../../actionTypes';
import {
  expectedCreditNormalizedPayload,
  creditId as id,
  mockGetCreditResponse,
} from 'tests/__fixtures__/users';
import { fetchUserCredits } from '..';
import { getUserCredits } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserCredits: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchUserCredits() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user credits procedure fails', async () => {
    const expectedError = new Error('get user credit error');

    (getUserCredits as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await fetchUserCredits(id)(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getUserCredits).toHaveBeenCalledTimes(1);
      expect(getUserCredits).toHaveBeenCalledWith(id, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_USER_CREDITS_REQUEST },
          {
            type: actionTypes.FETCH_USER_CREDITS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the get user credits procedure is successful', async () => {
    (getUserCredits as jest.Mock).mockResolvedValueOnce(mockGetCreditResponse);

    await fetchUserCredits(id)(store.dispatch);
    const actionResults = store.getActions();

    expect(getUserCredits).toHaveBeenCalledTimes(1);
    expect(getUserCredits).toHaveBeenCalledWith(id, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_CREDITS_REQUEST },
      {
        payload: expectedCreditNormalizedPayload,
        type: actionTypes.FETCH_USER_CREDITS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_CREDITS_SUCCESS,
      }),
    ).toMatchSnapshot('get credit success payload');
  });

  it('should create the correct actions for when the get user credits procedure is successful with empty data', async () => {
    (getUserCredits as jest.Mock).mockResolvedValueOnce([]);

    await fetchUserCredits(id)(store.dispatch);
    const actionResults = store.getActions();

    expect(getUserCredits).toHaveBeenCalledTimes(1);
    expect(getUserCredits).toHaveBeenCalledWith(id, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_CREDITS_REQUEST },
      {
        payload: {
          credits: [
            {
              currency: null,
              formattedValue: null,
              value: 0,
            },
          ],
        },
        type: actionTypes.FETCH_USER_CREDITS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_CREDITS_SUCCESS,
      }),
    ).toMatchSnapshot('get user credits success payload with empty data');
  });
});
