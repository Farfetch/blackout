import * as actionTypes from '../../actionTypes';
import {
  expectedNormalizedPayloadProgramMembershipConvert,
  membershipId,
  mockResponseProgramMembershipConvert,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postProgramMembershipConvert } from '@farfetch/blackout-client';
import createProgramMembershipConvert from '../createProgramMembershipConvert';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postProgramMembershipConvert: jest.fn(),
}));

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof rewardsMockStore>;

beforeEach(jest.clearAllMocks);

describe('createProgramMembershipConvert() action creator', () => {
  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the create program membership convert procedure fails', async () => {
    const expectedError = new Error('create program membership convert error');

    (postProgramMembershipConvert as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await createProgramMembershipConvert(
          programId,
          membershipId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the create program membership convert procedure is successful', async () => {
    (postProgramMembershipConvert as jest.Mock).mockResolvedValueOnce(
      mockResponseProgramMembershipConvert,
    );
    await createProgramMembershipConvert(
      programId,
      membershipId,
    )(store.dispatch);

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
