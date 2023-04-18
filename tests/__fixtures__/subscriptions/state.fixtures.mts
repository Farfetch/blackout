import type { SubscriptionDeliveryChannel } from '@farfetch/blackout-client';

export const mockSubscriptionId = 'a0147156-b875-4353-a77d-b92ee3bb4625';
export const mockTopicId1 = '8a3899e1-93dd-44d5-97c3-84cd24d12174';
export const mockRecipientId1TopicId1 = '5f8775c4-c7a0-4c91-b661-c8e70e0378fc';
export const mockRecipientId2TopicId1 = '6982fc3a-7837-abbc-91d3-4ade12b0d601';
export const mockTopicId2 = 'e64cbd82-0ec8-4aec-9223-2918d68da81b';
export const mockRecipientId2 = 'd33db931-a434-45fc-b343-218d4210d533';
export const mockSubscriptionPackageId = 'Newsletter';
export const mockSubscriptionPackagesQuery = {
  id: [mockSubscriptionPackageId],
};
export const mockSubscriptionPackageHash = 'id=Newsletter';
export const mockSmsAddress = '911111111';
export const mockEmailAddress = 'test@test.com';

export const mockTopicWithSmsAndEmailChannels = {
  id: mockTopicId1,
  type: 'Sale',
  channels: [
    {
      id: mockRecipientId1TopicId1,
      platform: 'email',
      address: mockEmailAddress,
      source: 'Communication Preferences Page',
    },
    {
      id: mockRecipientId2TopicId1,
      platform: 'sms',
      address: mockSmsAddress,
      source: 'Communication Preferences Page',
    },
  ] as SubscriptionDeliveryChannel[],
};

export const mockTopicWithEmailChannel = {
  id: mockTopicId2,
  type: 'Weekly_Newsletters',
  channels: [
    {
      id: mockRecipientId2,
      platform: 'email',
      address: mockEmailAddress,
      source: 'Communication Preferences Page',
    },
  ],
};

export const mockUserSubscriptionsState = {
  error: null,
  isLoading: false,
  result: [
    {
      id: mockSubscriptionId,
      topics: [mockTopicWithSmsAndEmailChannels, mockTopicWithEmailChannel],
    },
  ],
  unsubscribeRecipientFromTopicRequests: {
    [mockRecipientId1TopicId1]: {
      subscriptionId: mockSubscriptionId,
      topicId: mockTopicId1,
      isFetching: true,
      error: undefined,
      success: undefined,
    },
    [mockRecipientId2]: {
      subscriptionId: mockSubscriptionId,
      topicId: mockTopicId2,
      isFetching: false,
      error: undefined,
      success: true,
    },
  },
  updateSubscriptionsError: null,
};

export const mockInitialState = {
  subscriptions: {
    user: {
      error: null,
      isLoading: false,
      result: null,
      unsubscribeRecipientFromTopicRequests: {},
      updateSubscriptionsError: null,
    },
    packages: {},
  },
  entities: {},
};

export const mockState = {
  subscriptions: {
    user: mockUserSubscriptionsState,
    packages: {
      [mockSubscriptionPackageHash]: {
        error: null,
        isLoading: false,
        result: {
          packages: [mockSubscriptionPackageId],
          supportedChannels: ['sms', 'email'],
        },
      },
    },
  },
  entities: {
    subscriptionPackages: {
      [mockSubscriptionPackageId]: {
        id: mockSubscriptionPackageId,
        topics: [
          { type: 'Sale', channels: ['email', 'sms'] },
          { type: 'Weekly_Newsletters', channels: ['email'] },
        ],
      },
    },
  },
};
