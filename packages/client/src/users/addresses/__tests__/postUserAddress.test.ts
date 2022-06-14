import { AddressType } from '../types';
import { postUserAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUserAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

const response = {
  id: 'd3e59c54-6f49-4140-a491-ffe2c62afc51',
  firstName: 'sdfg',
  lastName: 'sdfgsdf',
  addressLine1: 'Rua Portugal Cultura e Recreio',
  city: { id: 0, name: 'Arrentela', countryId: 0 },
  state: { id: 0, name: 'Setúbal', countryId: 0 },
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
};
const data = response;
const userId = 78910;

describe('postUserAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(postUserAddress({ userId }, response)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      postUserAddress({ userId }, response),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      data,
      expectedConfig,
    );
  });
});
