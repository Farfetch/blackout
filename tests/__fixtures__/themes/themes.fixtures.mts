import type { Theme } from '@farfetch/blackout-client';

const dependencies: Theme[] = [];

export const mockThemeCode = 'global';

export const mockTheme = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  code: 'global',
  version: 1,
  dependencies: [
    {
      id: '9994daea-2929-4d4e-8874-88f6dc2e9fa8',
      code: 'navbar',
      version: 1,
      dependencies,
      style: {
        color: 'red',
        border: '1px',
        font: 'Verdana',
      },
      createdDate: '2023-01-04T13:28:30.824Z',
    },
    {
      id: 'd2389415-b9a1-406a-9a93-70a0fafcf76f',
      code: 'checkout',
      version: 1,
      dependencies,
      style: {
        color: 'blue',
        border: '2px',
        font: 'Arial',
      },
      createdDate: '2023-02-04T13:28:30.824Z',
    },
  ],
  style: {
    color: 'black',
    border: '1px',
    font: 'Verdana',
  },
  createdDate: '2023-06-13T15:19:30.911Z',
};

export const mockState = {
  themes: {
    isLoading: {
      [mockThemeCode]: false,
    },
    error: {
      [mockThemeCode]: undefined,
    },
    result: {
      [mockThemeCode]: mockTheme,
    },
  },
};

export const mockInitialState = {
  themes: {
    isLoading: {},
    error: {},
    result: {},
  },
};
