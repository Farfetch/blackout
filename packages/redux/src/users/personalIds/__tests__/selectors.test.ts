import * as selectors from '../selectors';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import merge from 'lodash/merge';

describe('redux selectors', () => {
  describe('areUserPersonalIdsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { personalIds: { isLoading: true } },
    });

    it('should return `isLoading` value from `personalIds` slice', () => {
      expect(selectors.areUserPersonalIdsLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserPersonalIdsLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('isUserDefaultPersonalIdLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { personalIds: { defaultPersonalId: { isLoading: true } } },
    });

    it('should return `isLoading` value from `personalIds.defaultPersonalId` slice', () => {
      expect(selectors.isUserDefaultPersonalIdLoading(mockBaseState)).toBe(
        false,
      );

      expect(selectors.isUserDefaultPersonalIdLoading(mockLoadingState)).toBe(
        true,
      );
    });
  });

  describe('getUserPersonalIdsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { personalIds: { error: dummyError } },
    });

    it('should return `error` value from `personalIds` slice', () => {
      expect(selectors.getUserPersonalIdsError(mockBaseState)).toBeNull();

      expect(selectors.getUserPersonalIdsError(mockErrorState)).toBe(
        dummyError,
      );
    });
  });

  describe('getUserDefaultPersonalIdError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { personalIds: { defaultPersonalId: { error: dummyError } } },
    });

    it('should return `error` value from `personalIds.defaultPersonalId` slice', () => {
      expect(selectors.getUserDefaultPersonalIdError(mockBaseState)).toBeNull();

      expect(selectors.getUserDefaultPersonalIdError(mockErrorState)).toBe(
        dummyError,
      );
    });
  });

  describe('getUserPersonalIdsResult()', () => {
    const userPersonalIds = [{ id: '111' }, { id: '222' }];

    const mockStateWithResult = merge({}, mockBaseState, {
      users: { personalIds: { result: userPersonalIds } },
    });

    it('should return `result` value from `personalIds` slice', () => {
      expect(selectors.getUserPersonalIdsResult(mockBaseState)).toBeNull();

      expect(selectors.getUserPersonalIdsResult(mockStateWithResult)).toEqual(
        userPersonalIds,
      );
    });
  });

  describe('getUserDefaultPersonalIdResult()', () => {
    const defaultUserPersonalId = {
      id: '11',
    };

    const mockStateWithResult = merge({}, mockBaseState, {
      users: {
        personalIds: { defaultPersonalId: { result: defaultUserPersonalId } },
      },
    });

    it('should return `result` value from `personalIds.defaultPersonalId` slice', () => {
      expect(
        selectors.getUserDefaultPersonalIdResult(mockBaseState),
      ).toBeNull();

      expect(
        selectors.getUserDefaultPersonalIdResult(mockStateWithResult),
      ).toEqual(defaultUserPersonalId);
    });
  });
});
