import * as normalizr from 'normalizr';
import {
  expectedNormalizedPayloadProgramUsersMembership,
  mockResponseProgramUsersMembership,
  programId,
} from '../../__fixtures__/membership.fixtures';
import { mockStore } from '../../../../../tests';
import doGetProgramUsersMembership from '../doGetProgramUsersMembership';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: reducer() }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('doGetProgramUsersMembership() action creator', () => {
  const getProgramUsersMembership = jest.fn();
  const action = doGetProgramUsersMembership(getProgramUsersMembership);
  beforeEach(() => {
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the get program users membership procedure fails', async () => {
    const expectedError = new Error('get program users membership error');

    getProgramUsersMembership.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(programId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProgramUsersMembership).toHaveBeenCalledTimes(1);
      expect(getProgramUsersMembership).toHaveBeenCalledWith(
        programId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_PROGRAM_USERS_MEMBERSHIP_REQUEST,
          },
          {
            type: actionTypes.GET_PROGRAM_USERS_MEMBERSHIP_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get program users membership procedure is successful', async () => {
    getProgramUsersMembership.mockResolvedValueOnce(
      mockResponseProgramUsersMembership,
    );
    await store.dispatch(action(programId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProgramUsersMembership).toHaveBeenCalledTimes(1);
    expect(getProgramUsersMembership).toHaveBeenCalledWith(
      programId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PROGRAM_USERS_MEMBERSHIP_REQUEST },
      {
        type: actionTypes.GET_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
        payload: expectedNormalizedPayloadProgramUsersMembership,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
      }),
    ).toMatchSnapshot('get program users membership success payload');
  });
});
