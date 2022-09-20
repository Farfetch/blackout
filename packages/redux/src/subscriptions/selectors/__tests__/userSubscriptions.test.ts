import * as selectors from '..';
import {
  mockEmailAddress,
  mockSmsAddress,
  mockState,
  mockTopicWithEmailChannel,
  mockTopicWithSmsAndEmailChannels,
} from 'tests/__fixtures__/subscriptions';
import type { StoreState } from '../../../types';

const mockStore: StoreState = {
  ...mockState,
};

describe('user subscriptions redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getUserSubscriptionsError()', () => {
    it('Should get the user subscriptions error property', () => {
      const expectedResult = mockState.subscriptions.user.error;

      expect(selectors.getUserSubscriptionsError(mockStore)).toBe(
        expectedResult,
      );
    });
  });

  describe('getUpdateUserSubscriptionsError() ', () => {
    it('Should get the update user subscriptions error property', () => {
      const expectedResult =
        mockState.subscriptions.user.updateSubscriptionsError;

      expect(selectors.getUpdateUserSubscriptionsError(mockStore)).toBe(
        expectedResult,
      );
    });
  });

  describe('getUserSubscriptions()', () => {
    it('Should get the user subscriptions result property', () => {
      const expectedResult = mockState.subscriptions.user.result;

      expect(selectors.getUserSubscriptions(mockStore)).toBe(expectedResult);
    });
  });

  describe('areUserSubscriptionsLoading()', () => {
    it('Should get the user subscriptions isLoading property', () => {
      const expectedResult = mockState.subscriptions.user.isLoading;

      expect(selectors.areUserSubscriptionsLoading(mockStore)).toBe(
        expectedResult,
      );
    });
  });

  describe('getUserSubscribedTopicsForPlatform()', () => {
    it('Should return the user subscriptions filtered by a platform', () => {
      expect(
        selectors.getUserSubscribedTopicsForPlatform(mockStore, 'sms'),
      ).toEqual([mockTopicWithSmsAndEmailChannels]);

      expect(
        selectors.getUserSubscribedTopicsForPlatform(mockStore, 'email'),
      ).toEqual([mockTopicWithSmsAndEmailChannels, mockTopicWithEmailChannel]);
    });
  });

  describe('getUserSubscribedTopicsForAddress()', () => {
    it('Should return the user subscriptions filtered by an address', () => {
      expect(
        selectors.getUserSubscribedTopicsForAddress(mockStore, mockSmsAddress),
      ).toEqual([mockTopicWithSmsAndEmailChannels]);

      expect(
        selectors.getUserSubscribedTopicsForAddress(
          mockStore,
          mockEmailAddress,
        ),
      ).toEqual([mockTopicWithSmsAndEmailChannels, mockTopicWithEmailChannel]);
    });
  });
});
