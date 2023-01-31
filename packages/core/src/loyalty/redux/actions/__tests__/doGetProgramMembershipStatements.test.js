import {
  expectedNormalizedPayloadProgramMembershipStatements,
  membershipId,
  mockResponseProgramMembershipStatements,
  programId,
} from '../../__fixtures__/membership.fixtures';
import { mockStore } from '../../../../../tests';
import doGetProgramMembershipStatements from '../doGetProgramMembershipStatements';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('doGetProgramMembershipStatements() action creator', () => {
  const getProgramMembershipStatements = jest.fn();
  const action = doGetProgramMembershipStatements(
    getProgramMembershipStatements,
  );
  const query = {};

  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the get program membership statements procedure fails', async () => {
    const expectedError = new Error('get program membership statements error');

    getProgramMembershipStatements.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(programId, membershipId, query));
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
            type: actionTypes.GET_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST,
          },
          {
            type: actionTypes.GET_PROGRAM_MEMBERSHIP_STATEMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get program membership statements procedure is successful', async () => {
    getProgramMembershipStatements.mockResolvedValueOnce(
      mockResponseProgramMembershipStatements,
    );
    await store.dispatch(action(programId, membershipId, query));

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
      { type: actionTypes.GET_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST },
      {
        type: actionTypes.GET_PROGRAM_MEMBERSHIP_STATEMENTS_SUCCESS,
        payload: {
          ...expectedNormalizedPayloadProgramMembershipStatements,
          result: [0],
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PROGRAM_MEMBERSHIPS_SUCCESS,
      }),
    ).toMatchSnapshot('get programs membership statements success payload');
  });
});
