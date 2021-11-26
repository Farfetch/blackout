import { mockState } from './sizeScales.fixtures';

export const mockSizeScaleMappingsBrandId = 1664;
export const mockSizeScaleMappingsGenderId = 0;
export const mockSizeScaleMappingsScaleId = 453;
export const mockSizeScaleMappingsHash = '?brand=1664&gender=0&sizeScale=453';
export const mockSizeScaleMappingsQuery = {
  brand: mockSizeScaleMappingsBrandId,
  gender: mockSizeScaleMappingsGenderId,
  sizeScale: mockSizeScaleMappingsScaleId,
};

export const mockSizeScaleMapping = {
  scales: [
    {
      id: mockSizeScaleMappingsScaleId,
      name: 'NIKE WOMEN SHOES US',
      gender: mockSizeScaleMappingsGenderId,
      country: {
        alpha2Code: 'US',
      },
      brand: {
        id: mockSizeScaleMappingsBrandId,
      },
      sizes: [
        {
          position: 17,
          code: '4',
        },
        {
          position: 18,
          code: '4.5',
        },
        {
          position: 19,
          code: '5',
        },
        {
          position: 20,
          code: '5.5',
        },
        {
          position: 21,
          code: '6',
        },
        {
          position: 22,
          code: '6.5',
        },
        {
          position: 23,
          code: '7',
        },
        {
          position: 24,
          code: '7.5',
        },
        {
          position: 25,
          code: '8',
        },
        {
          position: 26,
          code: '8.5',
        },
        {
          position: 27,
          code: '9',
        },
        {
          position: 28,
          code: '9.5',
        },
        {
          position: 29,
          code: '10',
        },
        {
          position: 30,
          code: '10.5',
        },
        {
          position: 31,
          code: '11',
        },
        {
          position: 32,
          code: '11.5',
        },
        {
          position: 33,
          code: '12',
        },
      ],
    },
  ],
};

export const mockSizeScaleMappings = [mockSizeScaleMapping];

export const mockSizeScaleMappingsState = {
  ...mockState,
  sizeScales: {
    ...mockState.sizeScales,
    mappings: {
      error: { [mockSizeScaleMappingsHash]: { message: 'foo' } },
      isLoading: { [mockSizeScaleMappingsHash]: false },
      result: { [mockSizeScaleMappingsHash]: [mockSizeScaleMapping] },
    },
  },
};
