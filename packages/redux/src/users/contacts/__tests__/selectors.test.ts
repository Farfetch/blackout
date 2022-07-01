import * as selectors from '../selectors';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import merge from 'lodash/merge';

describe('redux selectors', () => {
  describe('areUserContactsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { contacts: { isLoading: true } },
    });

    it('should return `isLoading` value from `contacts` slice', () => {
      expect(selectors.areUserContactsLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserContactsLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('getUserContactsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { contacts: { error: dummyError } },
    });

    it('should return `error` value from `contacts` slice', () => {
      expect(selectors.getUserContactsError(mockBaseState)).toBe(null);

      expect(selectors.getUserContactsError(mockErrorState)).toBe(dummyError);
    });
  });

  describe('getUserContacts()', () => {
    it('should return the contacts entity', () => {
      expect(selectors.getUserContacts(mockBaseState)).toBe(
        mockBaseState.entities?.contacts,
      );
    });
  });
});
