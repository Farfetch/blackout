import { AddressType } from '../types';
import { putUserAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putUserAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('putUserAddress', () => {
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
  const data = response;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  describe('putUserAddress', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      expect.assertions(2);

      await expect(putUserAddress({ id, userId }, data)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        data,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        putUserAddress({ id, userId }, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        data,
        expectedConfig,
      );
    });
  });
});
