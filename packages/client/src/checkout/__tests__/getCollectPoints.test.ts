import * as checkoutClient from '..';
import { type CollectPoint, Weekday } from '../types';
import { id } from 'tests/__fixtures__/checkout';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCollectPoints.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

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
            continentId: 0,
          },
          ddd: 'string',
          firstName: 'string',
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

      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.getCollectPoints(query),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.getCollectPoints(query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
