export const subscriptionPackagesResponse = {
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
};

export const expectedNormalizedPayload = {
  entities: {
    subscriptionPackages: {
      Newsletter: {
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
    },
  },
  result: {
    supportedChannels: ['sms', 'email'],
    packages: ['Newsletter'],
  },
};
