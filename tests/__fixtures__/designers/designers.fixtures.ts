import type { GenderDescription } from '@farfetch/blackout-client/types';

export const mockSubfolder = 'us';
export const mockQuery = { categoryid: 123 };
export const mockHash = '?categoryid=123';
export const mockSlug = '/us/designers?categoryid=123';

export const mockDesigners = [
  {
    title: 'A',
    slug: 'A',
    gender: 'Woman' as GenderDescription,
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

export const mockDesignersModel = {
  designers: mockDesigners,
  slug: mockSlug,
  subfolder: mockSubfolder,
};

export const mockState = {
  designers: {
    isLoading: { [mockHash]: false },
    error: {
      [mockHash]: { message: '😫' },
    },
    hash: mockHash,
    result: {
      [mockHash]: {
        designers: mockDesigners,
      },
    },
  },
};
