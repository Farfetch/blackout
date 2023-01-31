import { getPickupCapabilities } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getPickupCapabilities.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';
import parsePickupDate from '../../../helpers/parsePickupDate';

describe('getPickupCapabilities', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('Account SVC', () => {
    const id = '123456';
    const pickupDay = '2020-04-20';

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.accsvc.success({
        id,
        pickupDay,
        response,
      });

      expect.assertions(2);
      await expect(getPickupCapabilities(id, pickupDay)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.accsvc.failure({ id, pickupDay });

      expect.assertions(2);
      await expect(
        getPickupCapabilities(id, pickupDay),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
        expectedConfig,
      );
    });
  });

  describe('Legacy', () => {
    const query = { pickupDay: 1519211809934 };
    const pickupDay = 1519211809934;
    const parsedPickupDay = parsePickupDate(pickupDay);
    const id = '123456';

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.legacy.success({ id, parsedPickupDay, response });

      expect.assertions(2);
      await expect(getPickupCapabilities(id, pickupDay, query)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        join(`/legacy/v1/returns/${id}/pickupcapabilities/`, {
          query: { pickupDay: parsedPickupDay },
        }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.legacy.failure({ id, parsedPickupDay });

      expect.assertions(2);
      await expect(
        getPickupCapabilities(id, pickupDay, query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/returns', id, 'pickupcapabilities', {
          query: { pickupDay: parsedPickupDay },
        }),
        expectedConfig,
      );
    });
  });
});
