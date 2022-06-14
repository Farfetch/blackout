import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import {
  expectedBenefitsNormalizedPayload,
  mockGetBenefitsResponse,
} from 'tests/__fixtures__/users';
import { fetchBenefits } from '..';
import { getUserBenefits } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getUserBenefits: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store = usersMockStore();

const normalizeSpy = jest.spyOn(normalizr, 'normalize');

describe('fetchBenefits action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get benefits procedure fails', async () => {
    const expectedError = new Error('get benefits error');

    (getUserBenefits as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchBenefits());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserBenefits).toHaveBeenCalledTimes(1);
      expect(getUserBenefits).toHaveBeenCalledWith(expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_BENEFITS_REQUEST },
          {
            type: actionTypes.FETCH_BENEFITS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get benefits procedure is successful', async () => {
    (getUserBenefits as jest.Mock).mockResolvedValueOnce(
      mockGetBenefitsResponse,
    );

    await store.dispatch(fetchBenefits());

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUserBenefits).toHaveBeenCalledTimes(1);
    expect(getUserBenefits).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_BENEFITS_REQUEST },
      {
        payload: expectedBenefitsNormalizedPayload,
        type: actionTypes.FETCH_BENEFITS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_BENEFITS_SUCCESS,
      }),
    ).toMatchSnapshot('get benefits success payload');
  });
});
