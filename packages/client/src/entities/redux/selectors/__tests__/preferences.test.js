import { getPreferences } from '../preferences';

const mockPreferenceCode = 'test';
const mockPreferenceBody = {
  code: 'test',
  values: ['true'],
};

describe('getPreferences()', () => {
  const state = {
    entities: {
      preferences: {
        [mockPreferenceCode]: mockPreferenceBody,
      },
    },
  };

  it('should return the preference entity', () => {
    expect(getPreferences(state)).toEqual(state.entities.preferences);
  });

  it('should return the preference entity, filtered by code', () => {
    expect(getPreferences(state, mockPreferenceCode)).toEqual(
      mockPreferenceBody,
    );
  });
});
