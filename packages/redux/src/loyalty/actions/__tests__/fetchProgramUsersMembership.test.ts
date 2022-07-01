import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  expectedNormalizedPayloadProgramUsersMembership,
  mockResponseProgramUsersMembership,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures';
import { getProgramUsersMembership } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import fetchProgramUsersMembership from '../fetchProgramUsersMembership';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProgramUsersMembership: jest.fn(),
}));

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('fetchProgramUsersMembership() action creator', () => {
  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the get program users membership procedure fails', async () => {
    const expectedError = new Error('fetch program users membership error');

    getProgramUsersMembership.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchProgramUsersMembership(programId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProgramUsersMembership).toHaveBeenCalledTimes(1);
      expect(getProgramUsersMembership).toHaveBeenCalledWith(
        programId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST,
          },
          {
            type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch program users membership procedure is successful', async () => {
    getProgramUsersMembership.mockResolvedValueOnce(
      mockResponseProgramUsersMembership,
    );
    await store.dispatch(fetchProgramUsersMembership(programId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProgramUsersMembership).toHaveBeenCalledTimes(1);
    expect(getProgramUsersMembership).toHaveBeenCalledWith(
      programId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST },
      {
        type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
        payload: expectedNormalizedPayloadProgramUsersMembership,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
      }),
    ).toMatchSnapshot('fetch program users membership success payload');
  });
});
