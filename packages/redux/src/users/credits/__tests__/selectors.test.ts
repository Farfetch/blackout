import * as selectors from '../selectors.js';
import { merge } from 'lodash-es';
import { mockBaseState } from '../../__fixtures__/state.fixtures.js';

describe('redux selectors', () => {
  describe('areUserCreditsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { credits: { isLoading: true } },
    });

    it('should return `isLoading` value from `credits` slice', () => {
      expect(selectors.areUserCreditsLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserCreditsLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('areUserCreditMovementsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { creditMovements: { isLoading: true } },
    });

    it('should return `isLoading` value from `creditMovements` slice', () => {
      expect(selectors.areUserCreditMovementsLoading(mockBaseState)).toBe(
        false,
      );

      expect(selectors.areUserCreditMovementsLoading(mockLoadingState)).toBe(
        true,
      );
    });
  });

  describe('getUserCreditsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { credits: { error: dummyError } },
    });

    it('should return `error` value from `credits` slice', () => {
      expect(selectors.getUserCreditsError(mockBaseState)).toBeNull();

      expect(selectors.getUserCreditsError(mockErrorState)).toBe(dummyError);
    });
  });

  describe('getUserCreditMovementsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { creditMovements: { error: dummyError } },
    });

    it('should return `error` value from `creditMovements` slice', () => {
      expect(selectors.getUserCreditMovementsError(mockBaseState)).toBeNull();

      expect(selectors.getUserCreditMovementsError(mockErrorState)).toBe(
        dummyError,
      );
    });
  });
});
