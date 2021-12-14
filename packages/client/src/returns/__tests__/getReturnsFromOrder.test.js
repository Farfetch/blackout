import { getReturnsFromOrder } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getReturnsFromOrder.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturnsFromOrder', () => {
  const spy = jest.spyOn(client, 'get');
  const orderId = '123456';
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };
  const response = [
    {
      availableDates: [
        '2021-06-01T08:56:01.6248908Z',
        '2021-06-02T08:56:01.625241Z',
        '2021-06-03T08:56:01.6253172Z',
        '2021-06-04T08:56:01.6253183Z',
      ],
      id: 23982220,
      orderId: 'N5DTLY',
      merchantId: 11554,
      userId: 34113438,
      type: 'CourierPickUp',
      status: 'Accepted',
      courier: 'DHL',
      numberOfBoxes: 1,
      numberOfItems: 1,
      userPickupAddress: {
        id: '00000000-0000-0000-0000-000000000000',
        firstName: 'Luiz Fischer',
        addressLine1: 'Rua Azevedo Coutinho 39',
        addressLine2: 'União das freguesias de Apúlia e Fão 39',
        city: {
          id: 0,
          name: 'Esposende',
          countryId: 165,
        },
        state: {
          id: 0,
          code: '-2',
          countryId: 0,
        },
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
        zipCode: '4740-382',
        phone: '123456789',
        addressType: 'Any',
        isCurrentShipping: false,
        isCurrentBilling: false,
        isCurrentPreferred: false,
        createdDate: '0001-01-01T00:00:00Z',
      },
      maximumDateForPickup: '2021-06-06T23:59:58Z',
      pickupSchedule: {
        start: '2021-05-14T15:00:00Z',
        end: '2021-05-14T21:00:00Z',
      },
      items: [
        {
          id: 29208089,
          orderItemId: 39099335,
          reason: 'Changed my mind',
          status: 'Created',
        },
      ],
      createdDate: '2021-05-13T10:07:31.567Z',
      awbUrl: '/v1/returns/23982220/AWB',
      invoiceUrl: '/v1/returns/23982220/Invoice',
      references: [],
    },
  ];

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixture.success({ orderId, response, query });

    expect.assertions(2);
    await expect(getReturnsFromOrder(orderId, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/orders', orderId, 'returns', {
        query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ orderId, query });

    expect.assertions(2);
    await expect(getReturnsFromOrder(orderId, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/orders', orderId, 'returns', {
        query,
      }),
      expectedConfig,
    );
  });
});
