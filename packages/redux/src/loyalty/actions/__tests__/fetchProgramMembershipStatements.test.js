import * as normalizr from 'normalizr';
import {
  expectedNormalizedPayloadProgramMembershipStatements,
  membershipId,
  mockResponseProgramMembershipStatements,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures';
import { getProgramMembershipStatements } from '@farfetch/blackout-client/loyalty';
import { mockStore } from '../../../../tests';
import fetchProgramMembershipStatements from '../fetchProgramMembershipStatements';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/loyalty', () => ({
  ...jest.requireActual('@farfetch/blackout-client/loyalty'),
  getProgramMembershipStatements: jest.fn(),
}));

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: reducer() }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('fetchProgramMembershipStatements() action creator', () => {
  const query = {};

  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the fetch program membership statements procedure fails', async () => {
    const expectedError = new Error(
      'fetch program membership statements error',
    );

    getProgramMembershipStatements.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchProgramMembershipStatements(programId, membershipId),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProgramMembershipStatements).toHaveBeenCalledTimes(1);
      expect(getProgramMembershipStatements).toHaveBeenCalledWith(
        programId,
        membershipId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST,
          },
          {
            type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch program membership statements procedure is successful', async () => {
    getProgramMembershipStatements.mockResolvedValueOnce(
      mockResponseProgramMembershipStatements,
    );
    await store.dispatch(
      fetchProgramMembershipStatements(programId, membershipId),
    );

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProgramMembershipStatements).toHaveBeenCalledTimes(1);
    expect(getProgramMembershipStatements).toHaveBeenCalledWith(
      programId,
      membershipId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST },
      {
        type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_SUCCESS,
        payload: {
          ...expectedNormalizedPayloadProgramMembershipStatements,
          result: [0],
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch programs membership statements success payload');
  });
});
