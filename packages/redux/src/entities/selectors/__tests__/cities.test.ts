import { getCity } from '..';

const mockCityId = 515;
const mockCity = {
  id: 515,
  name: 'Atlanta',
  stateId: 17,
  countryId: 216,
};

describe('getCity()', () => {
  it('should return the city entity', () => {
    const state = {
      entities: {
        cities: {
          [mockCityId]: mockCity,
        },
      },
    };

    expect(getCity(state, mockCityId)).toEqual(mockCity);
  });
});
