import {
  expectedNormalizedPayloadProgramMembership,
  mockResponseProgramMembership,
  programId,
} from '../../__fixtures__/membership.fixtures';
import { mockStore } from '../../../../../tests';
import doCreateProgramMembership from '../doCreateProgramMembership';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: reducer() }, state);

const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('doCreateProgramMembership() action creator', () => {
  const postProgramMembership = jest.fn();
  const action = doCreateProgramMembership(postProgramMembership);
  const { id: membershipId, ...data } = mockResponseProgramMembership;

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

  it('should create the correct actions for when the create program membership procedure fails', async () => {
    const expectedError = new Error('create program membership error');

    postProgramMembership.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(programId, data));
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
    await store.dispatch(action(programId, data));

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
