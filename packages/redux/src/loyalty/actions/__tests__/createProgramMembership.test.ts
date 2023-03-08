import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedPayloadProgramMembership,
  mockResponseProgramMembership,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postProgramMembership } from '@farfetch/blackout-client';
import createProgramMembership from '../createProgramMembership.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postProgramMembership: jest.fn(),
}));

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof rewardsMockStore>;

beforeEach(jest.clearAllMocks);

describe('createProgramMembership() action creator', () => {
  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the create program membership procedure fails', async () => {
    const expectedError = new Error('create program membership error');

    (postProgramMembership as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createProgramMembership(
          programId,
          mockResponseProgramMembership,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postProgramMembership).toHaveBeenCalledTimes(1);
    expect(postProgramMembership).toHaveBeenCalledWith(
      programId,
      mockResponseProgramMembership,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST },
        {
          payload: { error: expectedError },
          type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE,
        },
      ]),
    );
  });

  it('should create the correct actions for when the create program membership procedure is successful', async () => {
    (postProgramMembership as jest.Mock).mockResolvedValueOnce(
      mockResponseProgramMembership,
    );
    await createProgramMembership(
      programId,
      mockResponseProgramMembership,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(postProgramMembership).toHaveBeenCalledTimes(1);
    expect(postProgramMembership).toHaveBeenCalledWith(
      programId,
      mockResponseProgramMembership,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST },
      {
        payload: expectedNormalizedPayloadProgramMembership,
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_SUCCESS,
      }),
    ).toMatchSnapshot('create program membership success payload');
  });
});
