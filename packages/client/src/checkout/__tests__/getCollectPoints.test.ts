import * as checkoutClient from '..';
import { CollectPoint, Weekday } from '../types';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getCollectPoints.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = 123456;
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getCollectPoints', () => {
    const spy = jest.spyOn(client, 'get');
    const query = { orderId: id };
    const urlToBeCalled = `/checkout/v1/collectpoints?orderId=${query.orderId}`;

    it('should handle a client request successfully', async () => {
      const response: CollectPoint = {
        storeAddress: {
          latitude: 'string',
          longitude: 'string',
          addressLine1: 'string',
          addressLine2: 'string',
          addressLine3: 'string',
          city: {
            countryId: 0,
            id: 0,
            name: 'string',
            stateId: 0,
          },
          country: {
            alpha2Code: 'string',
            alpha3Code: 'string',
            culture: 'string',
            id: 0,
            name: 'string',
            nativeName: 'string',
            region: 'string',
            subRegion: 'string',
            regionId: 0,
            subfolder: 'string',
            continentId: 0,
          },
          ddd: 'string',
          firstName: 'string',
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          lastName: 'string',
          neighbourhood: 'string',
          phone: 'string',
          state: {
            code: 'string',
            countryId: 0,
            id: 0,
            name: 'string',
          },
          vatNumber: 'string',
          zipCode: 'string',
          userId: 0,
          isDefaultBillingAddress: true,
          isDefaultShippingAddress: true,
        },
        clickAndCollect: {
          collectPointId: 0,
          merchantLocationId: 0,
        },
        businessDays: [
          {
            hours: [
              {
                close: 'string',
                open: 'string',
              },
            ],
            weekday: Weekday.Sunday,
          },
        ],
      };

      fixture.success({ response, query });

      expect.assertions(2);
      await expect(checkoutClient.getCollectPoints(query)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ query });

      await expect(
        checkoutClient.getCollectPoints(query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
