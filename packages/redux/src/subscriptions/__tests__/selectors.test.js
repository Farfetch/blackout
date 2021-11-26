import * as selectors from '../selectors';
import mockState, {
  mockEmailAddress,
  mockRecipientId1TopicId1,
  mockRecipientId2,
  mockSmsAddress,
  mockTopicWithEmailChannel,
  mockTopicWithSmsAndEmailChannels,
} from 'tests/__fixtures__/subscriptions/storeSubscriptionsState.fixtures';

describe('Subscriptions redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('Subscriptions redux selectors', () => {
    describe('getUserSubscriptionsError()', () => {
      it('Should get the user subscriptions error property', () => {
        const expectedResult = mockState.subscriptions.user.error;

        expect(selectors.getUserSubscriptionsError(mockState)).toBe(
          expectedResult,
        );
      });
    });

    describe('getSubscriptionPackagesError() ', () => {
      it('Should get the subscription packages error property', () => {
        expect(
          selectors.getSubscriptionPackagesError(mockState),
        ).toBeUndefined();
      });
    });

    describe('getUserSubscriptions()', () => {
      it('Should get the user subscriptions result property', () => {
        const expectedResult = mockState.subscriptions.user.result;

        expect(selectors.getUserSubscriptions(mockState)).toBe(expectedResult);
      });
    });

    describe('getSubscriptionPackages()', () => {
      it('Should get the subscription packages result property', () => {
        const expectedResult = [
          mockState.entities.subscriptionPackages['Newsletter'],
        ];

        expect(selectors.getSubscriptionPackages(mockState)).toEqual(
          expectedResult,
        );
      });
    });

    describe('isUserSubscriptionsLoading()', () => {
      it('Should get the user subscriptions isLoading property', () => {
        const expectedResult = mockState.subscriptions.user.isLoading;

        expect(selectors.isUserSubscriptionsLoading(mockState)).toBe(
          expectedResult,
        );
      });
    });

    describe('isSubscriptionPackagesLoading()', () => {
      it('Should get the subscription packages isLoading property', () => {
        const expectedResult = mockState.subscriptions.packages.isLoading;

        expect(selectors.isSubscriptionPackagesLoading(mockState)).toBe(
          expectedResult,
        );
      });
    });

    describe('getUserSubscribedTopicsForPlatform()', () => {
      it('Should return the user subscriptions filtered by a platform', () => {
        expect(
          selectors.getUserSubscribedTopicsForPlatform(mockState, 'sms'),
        ).toEqual([mockTopicWithSmsAndEmailChannels]);

        expect(
          selectors.getUserSubscribedTopicsForPlatform(mockState, 'email'),
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
            mockState,
            mockSmsAddress,
          ),
        ).toEqual([mockTopicWithSmsAndEmailChannels]);

        expect(
          selectors.getUserSubscribedTopicsForAddress(
            mockState,
            mockEmailAddress,
          ),
        ).toEqual([
          mockTopicWithSmsAndEmailChannels,
          mockTopicWithEmailChannel,
        ]);
      });
    });

    describe('getSupportedChannels()', () => {
      it('Should return the subscription packages supported delivery channels', () => {
        expect(selectors.getSupportedChannels(mockState)).toBe(
          mockState.subscriptions.packages.result.supportedChannels,
        );
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
            mockState,
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
          selectors.getUnsubscribeRecipientFromTopicRequests(mockState),
        ).toStrictEqual(expectedResult);
      });
    });
  });
});
