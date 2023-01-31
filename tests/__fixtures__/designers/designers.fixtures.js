export const mockSubfolder = 'us';
export const mockQuery = { categoryid: '123' };
export const mockHash = '/us?categoryid=123';
export const mockSlug = '/us/designers?categoryid=123';

export const mockDesigners = [
  {
    title: 'A',
    slug: 'A',
    gender: '',
    list: [
      {
        title: 'A Peace Treaty',
        description: 'Yup',
        image: '',
        slug: 'a-peace-treaty',
        slugSuffix: null,
      },
    ],
  },
];

export const mockResponse = {
  result: mockDesigners,
};

export const mockNormalizedPayload = {
  designers: { mockHash },
  result: mockHash,
  entities: {
    designerResults: {
      [mockHash]: {
        designers: mockDesigners,
      },
    },
  },
};

export const mockDesignersModel = {
  designers: mockDesigners,
  slug: mockSlug,
  subfolder: mockSubfolder,
};

export const mockState = {
  designers: {
    isLoading: { [mockHash]: false },
    error: {
      [mockHash]: '😫',
    },
    hash: mockHash,
  },
  entities: mockNormalizedPayload.entities,
};
