import { createContinentsList } from '../utils';
import { mockCountry } from 'tests/__fixtures__/locale';

describe('createContinentsList', () => {
  it('shoud build an array of continents with id and countries', () => {
    const mockCountries = {
      US: { ...mockCountry, continentId: 5, name: 'United States' },
    };
    const expectedResult = [
      {
        id: 5,
        countries: [
          {
            ...mockCountry,
            continentId: 5,
            name: 'United States',
          },
        ],
      },
    ];

    const result = createContinentsList(mockCountries);

    expect(result).toEqual(expectedResult);
  });
});
