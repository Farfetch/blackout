export const mockLegacyData = {
  components: [
    {
      type: 'text',
      value: 'test',
    },
  ],
};

export const mockContentToolData = {
  components: [
    {
      type: 'list',
      components: [
        {
          type: 'list',
          components: [
            {
              type: 'text',
              value: 'test',
            },
          ],
          name: 'subsection',
          displayOptions: {},
        },
      ],
      name: 'section',
      displayOptions: {},
    },
  ],
};
