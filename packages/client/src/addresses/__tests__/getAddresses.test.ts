import { AddressType } from '../types';
import { getAddresses } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getAddresses.fixtures';
import moxios from 'moxios';

describe('getAddressess', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const userId = 78910;
  const response = [
    {
      id: '0ddf018d-52f4-4f0c-a256-450fdda54420',
      firstName: 'tiago3443',
      lastName: 'ultimo4343',
      addressLine1: 'Rua António Gago A',
      addressLine2: 'São Gonçalo de Lagos',
      addressLine3: 'A',
      city: {
        id: 0,
        name: 'Lagos',
        countryId: 0,
      },
      state: {
        id: 0,
        name: 'Faro',
        countryId: 0,
      },
      country: {
        id: 165,
        name: 'Portugal',
        nativeName: 'Portugal',
        alpha2Code: 'PT',
        alpha3Code: 'PRT',
        culture: 'pt-PT',
        region: 'Europe',
        continentId: 3,
      },
      zipCode: '8600',
      phone: '434343434',
      addressType: AddressType.Any,
      isCurrentShipping: true,
      isCurrentBilling: true,
      isCurrentPreferred: false,
      createdDate: '2021-03-31T08:45:41.307Z',
      updatedDate: '2021-11-03T17:24:48.37Z',
    },
    {
      id: '9ae05778-fc30-4517-ba7c-9f0a17289fd3',
      firstName: 'testing',
      lastName: 'testing',
      addressLine1: 'Caminho Municipal 1267 1',
      addressLine2: 'Balança',
      city: {
        id: 0,
        name: 'Terras de Bouro',
        countryId: 0,
      },
      state: {
        id: 0,
        name: 'Braga',
        countryId: 0,
      },
      country: {
        id: 165,
        name: 'Portugal',
        nativeName: 'Portugal',
        alpha2Code: 'PT',
        alpha3Code: 'PRT',
        culture: 'pt-PT',
        region: 'Europe',
        continentId: 3,
      },
      zipCode: '4840-010',
      phone: '969696969',
      addressType: AddressType.Any,
      isCurrentShipping: false,
      isCurrentBilling: false,
      isCurrentPreferred: false,
      createdDate: '2021-11-03T16:46:17.584Z',
      updatedDate: '2021-11-04T10:13:44.782Z',
    },
  ];

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getAddresses', () => {
    describe('Account Service', () => {
      it('should handle a client request successfully', async () => {
        fixture.success({ userId, response });

        expect.assertions(2);

        await expect(getAddresses({ userId })).resolves.toStrictEqual(response);
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses`,
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.failure({ userId });

        expect.assertions(2);

        await expect(getAddresses({ userId })).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses`,
          expectedConfig,
        );
      });
    });
  });
});
