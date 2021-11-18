import { getAddress } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getAddress.fixtures';
import moxios from 'moxios';

describe('getAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const userId = '78910';
  const address = {
    addressLine1: 'Rua da Lionesa 446, G12',
    addressLine2: null,
    addressLine3: null,
    city: {
      countryId: 0,
      id: 0,
      name: 'Leça do Balio',
      stateId: null,
    },
    country: {
      alpha2Code: 'PT',
      alpha3Code: 'PRT',
      culture: 'pt-PT',
      id: 165,
      name: 'Portugal',
      nativeName: 'Portugal',
      region: 'Europe',
      subRegion: null,
      regionId: 0,
      subfolder: '/en-pt',
      continentId: 3,
    },
    ddd: null,
    title: null,
    firstName: 'tester',
    id: 'c9ce5410-58d9-4298-a385-231a79373e4a',
    lastName: 'teste',
    neighbourhood: null,
    phone: '121525125',
    state: {
      code: null,
      countryId: 0,
      id: 0,
      name: null,
    },
    vatNumber: null,
    zipCode: '4465-761',
    userId: 0,
    isDefaultBillingAddress: true,
    isDefaultShippingAddress: true,
  };
  const legacyResponse = {
    ...address,
    isDefaultBillingAddress: true,
    isDefaultShippingAddress: true,
    isPreferredAddress: false,
  };
  const accServiceResponse = {
    ...address,
    isCurrentShipping: true,
    isCurrentBilling: true,
    isCurrentPreferred: false,
  };
  const expectedAccServiceResponse = {
    ...accServiceResponse,
    isDefaultBillingAddress: true,
    isDefaultShippingAddress: true,
    isPreferredAddress: false,
  };
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getAddress', () => {
    describe('Legacy', () => {
      it('should handle a client request successfully', async () => {
        fixture.legacy.success({ id, response: legacyResponse });

        expect.assertions(2);

        await expect(getAddress(id)).resolves.toStrictEqual(legacyResponse);
        expect(spy).toHaveBeenCalledWith(
          `/legacy/v1/addressbook/${id}`,
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.legacy.failure({ id });

        expect.assertions(2);

        await expect(getAddress(id)).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/legacy/v1/addressbook/${id}`,
          expectedConfig,
        );
      });
    });

    describe('Account Service', () => {
      it('should handle a client request successfully', async () => {
        fixture.accsvc.success({ id, userId, response: accServiceResponse });

        expect.assertions(2);

        await expect(getAddress({ id, userId })).resolves.toStrictEqual(
          expectedAccServiceResponse,
        );
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses/${id}`,
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.accsvc.failure({ id, userId });

        expect.assertions(2);

        await expect(getAddress({ id, userId })).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses/${id}`,
          expectedConfig,
        );
      });
    });
  });
});
