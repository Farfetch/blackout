import * as actionTypes from '../../actionTypes';
import {
  mockResponseProgramMembershipReplacement as data,
  expectedNormalizedPayloadProgramMembershipReplacement,
  membershipId,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postProgramMembershipReplacement } from '@farfetch/blackout-client';
import createProgramMembershipReplacement from '../createProgramMembershipReplacement';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postProgramMembershipReplacement: jest.fn(),
}));

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof rewardsMockStore>;

beforeEach(jest.clearAllMocks);

describe('createProgramMembershipReplacement() action creator', () => {
  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the create program membership replacement procedure fails', async () => {
    const expectedError = new Error(
      'create program membership replacement error',
    );

    (postProgramMembershipReplacement as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    await createProgramMembershipReplacement(
      programId,
      membershipId,
      data,
    )(store.dispatch).catch(error => {
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
            type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
          },
          {
            payload: { error: expectedError },
            type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the create program membership replacement procedure is successful', async () => {
    (postProgramMembershipReplacement as jest.Mock).mockResolvedValueOnce(data);
    await createProgramMembershipReplacement(
      programId,
      membershipId,
      data,
    )(store.dispatch);

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
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
      },
      {
        payload: expectedNormalizedPayloadProgramMembershipReplacement,
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
      }),
    ).toMatchSnapshot('create program membership replacement success payload');
  });
});
