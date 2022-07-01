import * as selectors from '../selectors';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import merge from 'lodash/merge';

describe('redux selectors', () => {
  describe('areUserBenefitsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { benefits: { isLoading: true } },
    });

    it('should return `isLoading` value from `benefits` slice', () => {
      expect(selectors.areUserBenefitsLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserBenefitsLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('getUserBenefitsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { benefits: { error: dummyError } },
    });

    it('should return `error` value from `benefits` slice', () => {
      expect(selectors.getUserBenefitsError(mockBaseState)).toBe(null);

      expect(selectors.getUserBenefitsError(mockErrorState)).toBe(dummyError);
    });
  });

  describe('getUserBenefits()', () => {
    it('should return the benefits entity', () => {
      expect(selectors.getUserBenefits(mockBaseState)).toBe(
        mockBaseState.entities?.benefits,
      );
    });
  });
});
