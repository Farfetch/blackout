import {
  expectedNormalizedPayloadProgramMembershipConvert,
  membershipId,
  mockResponseProgramMembershipConvert,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures';
import { mockStore } from '../../../../tests';
import createProgramMembershipConvert from '../createProgramMembershipConvert';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: reducer() }, state);

const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('createProgramMembershipConvert() action creator', () => {
  const postProgramMembershipConvert = jest.fn();
  const action = createProgramMembershipConvert(postProgramMembershipConvert);

  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the create program membership convert procedure fails', async () => {
    const expectedError = new Error('create program membership convert error');

    postProgramMembershipConvert.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(programId, membershipId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postProgramMembershipConvert).toHaveBeenCalledTimes(1);
      expect(postProgramMembershipConvert).toHaveBeenCalledWith(
        programId,
        membershipId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_REQUEST,
          },
          {
            payload: { error: expectedError },
            type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create program membership convert procedure is successful', async () => {
    postProgramMembershipConvert.mockResolvedValueOnce(
      mockResponseProgramMembershipConvert,
    );
    await store.dispatch(action(programId, membershipId));

    const actionResults = store.getActions();

    expect(postProgramMembershipConvert).toHaveBeenCalledTimes(1);
    expect(postProgramMembershipConvert).toHaveBeenCalledWith(
      programId,
      membershipId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_REQUEST },
      {
        payload: expectedNormalizedPayloadProgramMembershipConvert,
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_SUCCESS,
      }),
    ).toMatchSnapshot('create program membership convert success payload');
  });
});
