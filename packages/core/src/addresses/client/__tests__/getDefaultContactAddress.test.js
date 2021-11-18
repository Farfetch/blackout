import { getDefaultContactAddress } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getDefaultContactAddress.fixtures';
import moxios from 'moxios';

describe('getDefaultContactAddress', () => {
  const userId = '123456';
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/current`;
  const response = {
    id: '00000000-0000-0000-0000-000000000000',
    firstName: 'string',
    lastName: 'string',
    addressLine1: 'string',
    addressLine2: 'string',
    addressLine3: 'string',
    vatNumber: 'string',
    city: {
      id: 0,
      name: 'string',
      stateId: 0,
      countryId: 0,
    },
    state: {
      id: 0,
      code: 'string',
      name: 'string',
      countryId: 0,
    },
    country: {
      Id: 0,
      Name: 'string',
      NativeName: 'string',
      Alpha2Code: 'string',
      Alpha3Code: 'string',
      Culture: 'string',
      Region: 'string',
      SubRegion: 'string',
      ContinentId: 0,
    },
    isCurrentShipping: true,
    isCurrentBilling: true,
    isCurrentPreferred: true,
    zipCode: 'string',
    phone: 'string',
    neighbourhood: 'string',
    ddd: 'string',
    continent: {
      id: 0,
      name: 'string',
      countries: [
        {
          Id: 0,
          Name: 'string',
          NativeName: 'string',
          Alpha2Code: 'string',
          Alpha3Code: 'string',
          Culture: 'string',
          Region: 'string',
          SubRegion: 'string',
          ContinentId: 0,
        },
      ],
    },
    addressType: 'Any',
    identityDocument: 'string',
    customsClearanceCode: 'string',
    title: 'string',
  };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixture.success({ userId, response });

    expect.assertions(2);
    await expect(getDefaultContactAddress(userId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixture.failure({ userId });

    expect.assertions(2);

    await expect(getDefaultContactAddress(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
