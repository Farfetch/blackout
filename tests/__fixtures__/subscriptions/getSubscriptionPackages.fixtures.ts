export const mockQuery = {
  id: ['Newsletter', 'BackInStock'],
};

export const mockResponse = {
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
