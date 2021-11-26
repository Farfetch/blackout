import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  mockStaffMember,
  mockStaffMemberId,
  mockState,
} from 'tests/__fixtures__/staffMembers';

describe('Staff members selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('isStaffMemberLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.isStaffMemberLoading(mockState, mockStaffMemberId)).toBe(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStaffMemberError()', () => {
    it('should get the error status', () => {
      const spy = jest.spyOn(fromReducer, 'getError');

      expect(selectors.getStaffMemberError(mockState, mockStaffMemberId)).toBe(
        undefined,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStaffMember()', () => {
    it('should get the result', () => {
      const spy = jest.spyOn(fromReducer, 'getResult');

      expect(selectors.getStaffMember(mockState, mockStaffMemberId)).toEqual(
        mockStaffMember,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
