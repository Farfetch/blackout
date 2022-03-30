export const mockDeleteSubscription = {
  query: {
    emailHash:
      '1ca9c02be7e27f42bdfdca1afef2618003bbdc7d08fe2e9b54d2ac5af8b37127',
    id: 'c3e39b1f-69a8-47e3-ab7f-743ddd1278bc',
  },
  response: {},
};

export const mockGetSubscriptionPackages = {
  query: {
    id: ['Newsletter', 'BackInStock'],
  },
  response: {
    supportedChannels: ['sms', 'email'],
    packages: [
      {
        id: 'Newsletter',
        topics: [
          {
            type: 'Latest_News',
            channels: ['email'],
          },
          {
            type: 'Promotions',
            channels: ['sms', 'email'],
          },
        ],
      },
    ],
  },
};

export const mockGetSubscriptions = {
  query: {
    customerId: 'user@email.com',
  },
  response: {
    id: '8c2b5c3e3acb4bdd9c26ba46',
    topics: [
      {
        type: 'Latest_News',
        channels: [
          {
            platform: 'email',
            address: 'user1_test1@acme.com',
            source: 'My Account',
          },
        ],
      },
      {
        type: 'Promotions',
        channels: [
          {
            platform: 'email',
            address: 'user1_test1@acme.com',
            source: 'My Account',
          },
          {
            platform: 'sms',
            address: '1234567890',
            source: 'My Account',
          },
        ],
      },
    ],
  },
};

export const mockPutSubscriptions = {
  data: {
    id: '8c2b5c3e3acb4bdd9c26ba46',
    customerId: 'user@email.com',
    topics: [
      {
        type: 'Latest_News',
        channels: [
          {
            platform: 'email',
            address: 'user1_test1@acme.com',
            source: 'My Account',
            active: true,
          },
        ],
      },
      {
        type: 'Promotions',
        channels: [
          {
            platform: 'sms',
            address: '919191919',
            source: 'My Account',
            active: true,
          },
        ],
      },
    ],
  },
};
