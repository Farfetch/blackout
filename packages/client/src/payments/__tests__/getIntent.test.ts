import {
  Classification,
  Intent,
  Intents,
  IntentStatus,
  LineItemsType,
} from '../types';
import { getIntent } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getIntent.fixtures';
import moxios from 'moxios';

describe('getIntent', () => {
  const id = '123456';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const intent: Intent = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      reference: 'string',
      currency: 'string',
      dateCreated: '2021-07-08T10:29:46.344Z',
      status: IntentStatus.Created,
      totalValue: 0,
      totalValueFormattedPrice: 'string',
      totalShippingFee: 0,
      formattedTotalShippingFee: 'string',
      lineItems: [
        {
          id: 'string',
          productId: 'string',
          classification: Classification.Standard,
          type: LineItemsType.Item,
          unitValue: 0,
          formattedUnitValue: 'string',
          quantity: 0,
          totalExtraTaxes: 0,
          formattedTotalExtraTaxes: 'string',
          description: 'string',
        },
      ],
      receiver: {
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        address: {
          addressLine1: 'string',
          addressLine2: 'string',
          addressLine3: 'string',
          vatNumber: 'string',
          zipCode: 'string',
          phone: 'string',
          neighbourhood: 'string',
          ddd: 'string',
          city: {
            countryId: 0,
            id: 0,
            name: 'string',
            stateId: 0,
          },
          state: {
            code: 'string',
            countryId: 0,
            id: 0,
            name: 'string',
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
          continent: {
            id: 0,
            name: 'string',
            countries: [
              {
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
            ],
          },
        },
      },
      fingerprint: 'string',
    };

    const response: Intents = [intent, intent];

    fixtures.success({ id, response });

    expect.assertions(2);
    await expect(getIntent(id)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(getIntent(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
