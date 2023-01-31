import { createContinentsList } from '../utils';

describe('createContinentsList', () => {
  it('shoud build an array of continents with id and countries', () => {
    const mockCountries = { US: { continentId: 5, name: 'United States' } };
    const expectedResult = [
      {
        id: 5,
        countries: [
          {
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
