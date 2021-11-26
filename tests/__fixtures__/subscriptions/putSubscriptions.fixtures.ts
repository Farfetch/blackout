export const mockData = {
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
};

export const mockResponse = {
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
          platform: 'sms',
          address: '919191919',
          source: 'My Account',
        },
      ],
    },
  ],
};
