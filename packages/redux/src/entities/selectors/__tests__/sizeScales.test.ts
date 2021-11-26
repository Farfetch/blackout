import { getSizeScale, getSizeScales } from '../';
import { mockScaleId, mockSizeScale } from 'tests/__fixtures__/sizeScales';

describe('getSizeScale()', () => {
  it('should return the sizeScale entity', () => {
    const state = {
      entities: {
        sizeScales: {
          [mockScaleId]: mockSizeScale,
        },
      },
    };

    expect(getSizeScale(state, mockScaleId)).toEqual(mockSizeScale);
  });
});

describe('getSizeScales()', () => {
  it('should return all the sizeScales entities', () => {
    const state = {
      entities: {
        sizeScales: {
          [mockScaleId]: mockSizeScale,
          118: { ...mockSizeScale, sizeScaleId: 118 },
        },
      },
    };

    expect(getSizeScales(state)).toEqual(state.entities.sizeScales);
  });
});
