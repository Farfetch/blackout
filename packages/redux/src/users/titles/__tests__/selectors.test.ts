import * as selectors from '../selectors';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import merge from 'lodash/merge';

describe('redux selectors', () => {
  describe('areUserTitlesLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { titles: { isLoading: true } },
    });

    it('should return `isLoading` value from `titles` slice', () => {
      expect(selectors.areUserTitlesLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserTitlesLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('getUserTitlesError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { titles: { error: dummyError } },
    });

    it('should return `error` value from `titles` slice', () => {
      expect(selectors.getUserTitlesError(mockBaseState)).toBe(null);

      expect(selectors.getUserTitlesError(mockErrorState)).toBe(dummyError);
    });
  });

  describe('getUserTitles()', () => {
    it('should return the titles entity', () => {
      expect(selectors.getUserTitles(mockBaseState)).toBe(
        mockBaseState.entities?.titles,
      );
    });
  });

  describe('getUserTitleById()', () => {
    it('should return a specific title entity', () => {
      const titleId = Object.keys(
        mockBaseState.entities?.titles as object,
      )[0] as string;

      expect(selectors.getUserTitleById(mockBaseState, titleId)).toBe(
        mockBaseState.entities?.titles?.[titleId],
      );
    });
  });
});
