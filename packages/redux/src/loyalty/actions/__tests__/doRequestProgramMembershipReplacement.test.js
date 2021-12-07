import {
  expectedNormalizedPayloadProgramMembershipReplacement,
  membershipId,
  mockResponseProgramMembershipReplacement,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures';
import { mockStore } from '../../../../tests';
import doRequestProgramMembershipReplacement from '../doRequestProgramMembershipReplacement';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: reducer() }, state);

const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('doRequestProgramMembershipReplacement() action creator', () => {
  const postProgramMembershipReplacement = jest.fn();
  const action = doRequestProgramMembershipReplacement(
    postProgramMembershipReplacement,
  );
  const data = { reason: 'string' };

  beforeEach(() => {
    store = rewardsMockStore({
      rewards: {
        memberships: { id: membershipId },
      },
      entities: {
        memberships: { [membershipId]: { id: membershipId } },
      },
    });
  });

  it('should create the correct actions for when the request program membership replacement procedure fails', async () => {
    const expectedError = new Error(
      'request program membership replacement error',
    );

    postProgramMembershipReplacement.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(programId, membershipId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postProgramMembershipReplacement).toHaveBeenCalledTimes(1);
      expect(postProgramMembershipReplacement).toHaveBeenCalledWith(
        programId,
        membershipId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
          },
          {
            payload: { error: expectedError },
            type: actionTypes.REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create program membership procedure is successful', async () => {
    postProgramMembershipReplacement.mockResolvedValueOnce(
      mockResponseProgramMembershipReplacement,
    );
    await store.dispatch(action(programId, membershipId, data));

    const actionResults = store.getActions();

    expect(postProgramMembershipReplacement).toHaveBeenCalledTimes(1);
    expect(postProgramMembershipReplacement).toHaveBeenCalledWith(
      programId,
      membershipId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
      },
      {
        payload: expectedNormalizedPayloadProgramMembershipReplacement,
        type: actionTypes.REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_SUCCESS,
      }),
    ).toMatchSnapshot('request program membership replacement success payload');
  });
});
