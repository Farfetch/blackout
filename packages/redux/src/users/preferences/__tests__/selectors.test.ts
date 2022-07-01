import * as selectors from '../selectors';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import merge from 'lodash/merge';

describe('redux selectors', () => {
  describe('areUserPreferencesLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { preferences: { isLoading: true } },
    });

    it('should return `isLoading` value from `preferences` slice', () => {
      expect(selectors.areUserPreferencesLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserPreferencesLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('areUserPreferencesUpdating()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { updatePreferences: { isLoading: true } },
    });

    it('should return `isLoading` value from `updatePreferences` slice', () => {
      expect(selectors.areUserPreferencesUpdating(mockBaseState)).toBe(false);

      expect(selectors.areUserPreferencesUpdating(mockLoadingState)).toBe(true);
    });
  });

  describe('getUserCreditsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { preferences: { error: dummyError } },
    });

    it('should return `error` value from `preferences` slice', () => {
      expect(selectors.getUserPreferencesError(mockBaseState)).toBe(null);

      expect(selectors.getUserPreferencesError(mockErrorState)).toBe(
        dummyError,
      );
    });
  });

  describe('getUserPreferencesUpdateError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { updatePreferences: { error: dummyError } },
    });

    it('should return `error` value from `updatePreferences` slice', () => {
      expect(selectors.getUserPreferencesUpdateError(mockBaseState)).toBe(null);

      expect(selectors.getUserPreferencesUpdateError(mockErrorState)).toBe(
        dummyError,
      );
    });
  });

  describe('getUserPreferences()', () => {
    it('should return the preferences entity', () => {
      expect(selectors.getUserPreferences(mockBaseState)).toBe(
        mockBaseState.entities?.preferences,
      );
    });
  });
});
