import { AddressType } from '../types';
import { putAddress } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/putAddress.fixtures';
import moxios from 'moxios';

describe('putAddress', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const userId = 78910;
  const response = {
    id: 'd3e59c54-6f49-4140-a491-ffe2c62afc51',
    firstName: 'sdfg',
    lastName: 'sdfgsdf',
    addressLine1: 'Rua Portugal Cultura e Recreio',
    city: {
      id: 0,
      name: 'Arrentela',
      countryId: 0,
    },
    state: {
      id: 0,
      name: 'Setúbal',
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
    zipCode: '2840',
    phone: '969696969',
    addressType: AddressType.Any,
    isCurrentShipping: false,
    isCurrentBilling: false,
    isCurrentPreferred: false,
    createdDate: '2021-11-04T10:34:49.891Z',
    updatedDate: '2021-11-04T11:13:18.127Z',
  };

  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('putAddress', () => {
    it('should handle a client request successfully', async () => {
      fixture.success({ id, userId, response });

      expect.assertions(2);

      await expect(putAddress({ id, userId }, response)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        response,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, userId });

      expect.assertions(2);

      await expect(
        putAddress({ id, userId }, response),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        response,
        expectedConfig,
      );
    });
  });
});
