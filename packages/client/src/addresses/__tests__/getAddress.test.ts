import { AddressType } from '../types';
import { getAddress } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getAddress.fixtures';
import moxios from 'moxios';

describe('getAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const userId = 78910;
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
    isCurrentPreferred: false,
    createdDate: '2021-11-03T16:46:17.584Z',
    updatedDate: '2021-11-04T10:13:44.782Z',
  };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getAddress', () => {
    it('should handle a client request successfully', async () => {
      fixture.success({ id, userId, response });

      expect.assertions(2);

      await expect(getAddress({ id, userId })).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, userId });

      expect.assertions(2);

      await expect(getAddress({ id, userId })).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });
  });
});
