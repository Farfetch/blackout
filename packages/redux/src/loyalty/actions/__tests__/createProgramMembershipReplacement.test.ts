import * as actionTypes from '../../actionTypes.js';
import {
  mockResponseProgramMembershipReplacement as data,
  expectedNormalizedPayloadProgramMembershipReplacement,
  membershipId,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postProgramMembershipReplacement } from '@farfetch/blackout-client';
import createProgramMembershipReplacement from '../createProgramMembershipReplacement.js';

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

    await expect(
      async () =>
        await createProgramMembershipReplacement(
          programId,
          membershipId,
          data,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

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
