import { AddressType } from '../types';
import { getDefaultContactAddress } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getDefaultContactAddress.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getDefaultContactAddress', () => {
  const userId = 123456;
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/current`;
  const response = {
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
    isCurrentPreferred: true,
    createdDate: '2021-11-03T16:46:17.584Z',
    updatedDate: '2021-11-04T15:47:32.986Z',
  };

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(getDefaultContactAddress(userId)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getDefaultContactAddress(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
