import * as actionTypes from '../../actionTypes.js';
import { fetchStaffMember } from '..//index.js';
import { getStaffMember } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockStaffMember,
  mockStaffMemberId,
  mockState,
} from 'tests/__fixtures__/staffMembers/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getStaffMember: jest.fn(),
}));

const expectedConfig = undefined;
const staffMembersMockStore = (state = {}) =>
  mockStore({ staffMembers: INITIAL_STATE }, state);

let store = staffMembersMockStore(mockState);

describe('fetchStaffMember() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = staffMembersMockStore(mockState);
  });

  it('should create the correct actions for when the fetch staff member fail', async () => {
    const expectedError = new Error('fetch staff member error');

    (getStaffMember as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchStaffMember(mockStaffMemberId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getStaffMember).toHaveBeenCalledTimes(1);
    expect(getStaffMember).toHaveBeenCalledWith(
      mockStaffMemberId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
        meta: { id: mockStaffMemberId },
      },
      {
        type: actionTypes.FETCH_STAFF_MEMBER_FAILURE,
        payload: { error: expectedError },
        meta: { id: mockStaffMemberId },
      },
    ]);
  });

  it('should create the correct actions for when the fetch staff member procedure is successful', async () => {
    (getStaffMember as jest.Mock).mockResolvedValueOnce(mockStaffMember);

    await fetchStaffMember(
      mockStaffMemberId,
      expectedConfig,
    )(store.dispatch).then((clientResult: typeof mockStaffMember) => {
      expect(clientResult).toBe(mockStaffMember);
    });

    expect(getStaffMember).toHaveBeenCalledTimes(1);
    expect(getStaffMember).toHaveBeenCalledWith(
      mockStaffMemberId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
        meta: { id: mockStaffMemberId },
      },
      {
        type: actionTypes.FETCH_STAFF_MEMBER_SUCCESS,
        payload: { result: mockStaffMember },
        meta: { id: mockStaffMemberId },
      },
    ]);
  });
});
