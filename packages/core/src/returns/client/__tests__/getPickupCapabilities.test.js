import { getPickupCapabilities } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getPickupCapabilities.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getPickupCapabilities', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('Account SVC', () => {
    const id = 123456;
    const query = { pickupDay: '2020-04-20' };

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.accsvc.success({
        id,
        pickupDay: query.pickupDay,
        response,
      });

      expect.assertions(2);
      await expect(getPickupCapabilities(id, query)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        join(`/account/v1/returns/${id}/pickupcapabilities/${query.pickupDay}`),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.accsvc.failure({ id, pickupDay: query.pickupDay });

      expect.assertions(2);
      await expect(getPickupCapabilities(id, query)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        join(`/account/v1/returns/${id}/pickupcapabilities/${query.pickupDay}`),
        expectedConfig,
      );
    });
  });

  describe('Legacy', () => {
    const query = { pickupDay: 1519211809934 };
    const id = '123456';

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.legacy.success({ id, query, response });

      expect.assertions(2);
      await expect(getPickupCapabilities(id, query)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/returns', id, 'pickupcapabilities', { query }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.legacy.failure({ id, query });

      expect.assertions(2);
      await expect(getPickupCapabilities(id, query)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/returns', id, 'pickupcapabilities', { query }),
        expectedConfig,
      );
    });
  });
});
