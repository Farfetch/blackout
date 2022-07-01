import * as actionTypes from '../../actionTypes';
import {
  expectedNormalizedPayloadProgramMembership,
  mockResponseProgramMembership,
  programId,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import {
  postProgramMembership,
  ProgramMembershipStatus,
} from '@farfetch/blackout-client';
import createProgramMembership from '../createProgramMembership';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postProgramMembership: jest.fn(),
}));

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('createProgramMembership() action creator', () => {
  const data = {
    id: '1111',
    externalId: 'qwerty1234',
    userId: 123456,
    rewardPoints: 25,
    cashBalance: 10.25,
    status: ProgramMembershipStatus.Unverified,
  };

  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the create program membership procedure fails', async () => {
    const expectedError = new Error('create program membership error');

    postProgramMembership.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createProgramMembership(programId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postProgramMembership).toHaveBeenCalledTimes(1);
      expect(postProgramMembership).toHaveBeenCalledWith(
        programId,
        data,
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
    }
  });

  it('should create the correct actions for when the create program membership procedure is successful', async () => {
    postProgramMembership.mockResolvedValueOnce(mockResponseProgramMembership);
    await store.dispatch(createProgramMembership(programId, data));

    const actionResults = store.getActions();

    expect(postProgramMembership).toHaveBeenCalledTimes(1);
    expect(postProgramMembership).toHaveBeenCalledWith(
      programId,
      data,
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
