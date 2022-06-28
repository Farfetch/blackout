import * as selectors from '../selectors';
import {
  mockEmailAddress,
  mockRecipientId1TopicId1,
  mockRecipientId2,
  mockSmsAddress,
  mockState,
  mockTopicWithEmailChannel,
  mockTopicWithSmsAndEmailChannels,
} from 'tests/__fixtures__/subscriptions';
import type { StoreState } from '../../types';

const mockStore: StoreState = {
  ...mockState,
};

describe('Subscriptions redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('Subscriptions redux selectors', () => {
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

    describe('getSubscriptionPackagesError() ', () => {
      it('Should get the subscription packages error property', () => {
        expect(selectors.getSubscriptionPackagesError(mockStore)).toBeNull();
      });
    });

    describe('getUserSubscriptions()', () => {
      it('Should get the user subscriptions result property', () => {
        const expectedResult = mockState.subscriptions.user.result;

        expect(selectors.getUserSubscriptions(mockStore)).toBe(expectedResult);
      });
    });

    describe('getSubscriptionPackages()', () => {
      it('Should get the subscription packages result property', () => {
        const expectedResult = [
          mockState.entities.subscriptionPackages['Newsletter'],
        ];

        expect(selectors.getSubscriptionPackages(mockStore)).toEqual(
          expectedResult,
        );
      });
    });

    describe('isUserSubscriptionsLoading()', () => {
      it('Should get the user subscriptions isLoading property', () => {
        const expectedResult = mockState.subscriptions.user.isLoading;

        expect(selectors.isUserSubscriptionsLoading(mockStore)).toBe(
          expectedResult,
        );
      });
    });

    describe('areSubscriptionPackagesLoading()', () => {
      it('Should get the subscription packages isLoading property', () => {
        const expectedResult = mockState.subscriptions.packages.isLoading;

        expect(selectors.areSubscriptionPackagesLoading(mockStore)).toBe(
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
        ).toEqual([
          mockTopicWithSmsAndEmailChannels,
          mockTopicWithEmailChannel,
        ]);
      });
    });

    describe('getUserSubscribedTopicsForAddress()', () => {
      it('Should return the user subscriptions filtered by an address', () => {
        expect(
          selectors.getUserSubscribedTopicsForAddress(
            mockStore,
            mockSmsAddress,
          ),
        ).toEqual([mockTopicWithSmsAndEmailChannels]);

        expect(
          selectors.getUserSubscribedTopicsForAddress(
            mockStore,
            mockEmailAddress,
          ),
        ).toEqual([
          mockTopicWithSmsAndEmailChannels,
          mockTopicWithEmailChannel,
        ]);
      });
    });

    describe('getSubscriptionPackagesSupportedChannels()', () => {
      it('Should return the subscription packages supported delivery channels', () => {
        expect(
          selectors.getSubscriptionPackagesSupportedChannels(mockStore),
        ).toBe(mockState.subscriptions.packages.result.supportedChannels);
      });
    });

    describe('getUnsubscribeRecipientFromTopicRequest()', () => {
      it('Should return the unsubscribe recipient from topic request state for the passed in recipient id', () => {
        const expectedResult =
          mockState.subscriptions.user.unsubscribeRecipientFromTopicRequests[
            mockRecipientId1TopicId1
          ];

        expect(
          selectors.getUnsubscribeRecipientFromTopicRequest(
            mockStore,
            mockRecipientId1TopicId1,
          ),
        ).toBe(expectedResult);
      });
    });

    describe('getUnsubscribeRecipientFromTopicRequests()', () => {
      it('Should return all unsubscribe recipient from topic requests state', () => {
        const expectedResult = [
          {
            ...mockState.subscriptions.user
              .unsubscribeRecipientFromTopicRequests[mockRecipientId1TopicId1],
            recipientId: mockRecipientId1TopicId1,
          },
          {
            ...mockState.subscriptions.user
              .unsubscribeRecipientFromTopicRequests[mockRecipientId2],
            recipientId: mockRecipientId2,
          },
        ];

        expect(
          selectors.getUnsubscribeRecipientFromTopicRequests(mockStore),
        ).toStrictEqual(expectedResult);
      });
    });
  });
});
