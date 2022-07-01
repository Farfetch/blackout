import * as selectors from '../selectors';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import merge from 'lodash/merge';
import type { UserAttribute } from '@farfetch/blackout-client';

describe('redux selectors', () => {
  describe('areUserAttributesLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { attributes: { isLoading: true } },
    });

    it('should return `isLoading` value from `attributes` slice', () => {
      expect(selectors.areUserAttributesLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserAttributesLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('getUserAttributesError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { attributes: { error: dummyError } },
    });

    it('should return `error` value from `attributes` slice', () => {
      expect(selectors.getUserAttributesError(mockBaseState)).toBe(null);

      expect(selectors.getUserAttributesError(mockErrorState)).toBe(dummyError);
    });
  });

  describe('getUserAttributes()', () => {
    it('should return `result` value from `attributes` slice', () => {
      const userAttribute = { id: '111' } as UserAttribute;

      const mockStateWithResult = merge({}, mockBaseState, {
        users: {
          attributes: { result: userAttribute },
        },
      });

      expect(selectors.getUserAttributes(mockStateWithResult)).toEqual(
        userAttribute,
      );
    });
  });
});
