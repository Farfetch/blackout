import { postAddress } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postAddress.fixtures';
import moxios from 'moxios';

const response = {
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
    code: 'PT',
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
const userId = '78910';

describe('postAddress', () => {
  describe('Legacy', () => {
    const expectedConfig = undefined;
    const spy = jest.spyOn(client, 'post');

    beforeEach(() => {
      moxios.install(client);
      jest.clearAllMocks();
    });

    afterEach(() => moxios.uninstall(client));

    it('should handle a client request successfully', async () => {
      fixture.legacy.success({ data: response, response });

      expect.assertions(2);

      await expect(postAddress(response)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        '/legacy/v1/addressbook',
        response,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.legacy.failure({ data: response });

      expect.assertions(2);

      await expect(postAddress(response)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/legacy/v1/addressbook',
        response,
        expectedConfig,
      );
    });
  });

  describe('Account Service', () => {
    const expectedConfig = undefined;
    const spy = jest.spyOn(client, 'post');

    beforeEach(() => {
      moxios.install(client);
      jest.clearAllMocks();
    });

    afterEach(() => moxios.uninstall(client));

    it('should handle a client request successfully', async () => {
      fixture.accsvc.success({ userId, data: response, response });

      expect.assertions(2);

      await expect(postAddress({ userId }, response)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses`,
        response,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.accsvc.failure({ userId, data: response });

      expect.assertions(2);

      await expect(postAddress({ userId }, response)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses`,
        response,
        expectedConfig,
      );
    });
  });
});
