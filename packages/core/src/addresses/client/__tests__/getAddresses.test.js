import { getAddresses } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getAddresses.fixtures';
import moxios from 'moxios';

describe('getAddressess', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
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
  };
  const legacyResponse = [
    {
      ...address,
      isDefaultBillingAddress: true,
      isDefaultShippingAddress: true,
      isPreferredAddress: false,
    },
  ];
  const accSVCResponse = [
    {
      ...address,
      isCurrentShipping: true,
      isCurrentBilling: true,
      isCurrentPreferred: false,
    },
  ];
  const expectedAccServiceResponse = [
    {
      ...accSVCResponse[0],
      isDefaultBillingAddress: true,
      isDefaultShippingAddress: true,
      isPreferredAddress: false,
    },
  ];

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getAddresses', () => {
    describe('Legacy', () => {
      it('should handle a client request successfully', async () => {
        fixture.legacy.success({ response: legacyResponse });

        expect.assertions(2);

        await expect(getAddresses()).resolves.toStrictEqual(legacyResponse);
        expect(spy).toHaveBeenCalledWith(
          '/legacy/v1/addressbook',
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.legacy.failure();

        expect.assertions(2);

        await expect(getAddresses()).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          '/legacy/v1/addressbook',
          expectedConfig,
        );
      });
    });

    describe('Account Service', () => {
      it('should handle a client request successfully', async () => {
        fixture.accsvc.success({ userId, response: accSVCResponse });

        expect.assertions(2);

        await expect(getAddresses({ userId })).resolves.toStrictEqual(
          expectedAccServiceResponse,
        );
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses`,
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.accsvc.failure({ userId });

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
