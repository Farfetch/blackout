import { fetchStaffMember } from '../';
import {
  mockStaffMember,
  mockStaffMemberId,
} from 'tests/__fixtures__/staffMembers';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const staffMembersMockStore = (state = {}) =>
  mockStore({ staffMembers: reducer() }, state);

describe('fetchStaffMember() action creator', () => {
  let store;
  const getStaffMember = jest.fn();
  const action = fetchStaffMember(getStaffMember);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = staffMembersMockStore();
  });

  it('should create the correct actions for when the fetch staff member fail', async () => {
    const expectedError = new Error('fetch staff member error');

    getStaffMember.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockStaffMemberId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getStaffMember).toHaveBeenCalledTimes(1);
      expect(getStaffMember).toHaveBeenCalledWith(
        mockStaffMemberId,
        expectedConfig,
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
            meta: { id: mockStaffMemberId },
          },
          {
            type: actionTypes.FETCH_STAFF_MEMBER_FAILURE,
            payload: { error: expectedError },
            meta: { id: mockStaffMemberId },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch staff member procedure is successful', async () => {
    getStaffMember.mockResolvedValueOnce(mockStaffMember);

    await store.dispatch(action(mockStaffMemberId, expectedConfig));

    const actionResults = store.getActions();

    expect(getStaffMember).toHaveBeenCalledTimes(1);
    expect(getStaffMember).toHaveBeenCalledWith(
      mockStaffMemberId,
      expectedConfig,
    );
    expect(actionResults).toEqual([
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
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_STAFF_MEMBER_SUCCESS,
      }),
    ).toMatchSnapshot('fetch staff member success payload');
  });
});
