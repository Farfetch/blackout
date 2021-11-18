import {
  adaptCourier,
  adaptItemStatus,
  adaptReferenceName,
  adaptStatus,
  adaptType,
  compatibilityAdapter,
} from '../getReturnsFromOrder';
import { getReturnsFromOrder } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getReturnsFromOrder.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturnsFromOrder', () => {
  const spy = jest.spyOn(client, 'get');
  const orderId = '123456';
  const expectedConfig = undefined;
  const mockedResponse = [
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
  const convertedResponse = [
    {
      availableDates: [
        '/Date(1622537761624)/',
        '/Date(1622624161625)/',
        '/Date(1622710561625)/',
        '/Date(1622796961625)/',
      ],
      awbUrl: '/v1/returns/23982220/AWB',
      courier: 1,
      createdDate: '/Date(1620900451567)/',
      id: 23982220,
      invoiceUrl: '/v1/returns/23982220/Invoice',
      items: [
        {
          id: 29208089,
          orderItemId: 39099335,
          reason: 'Changed my mind',
          status: 0,
        },
      ],
      maximumDateForPickup: '/Date(1623023998000)/',
      merchantId: 11554,
      numberOfBoxes: 1,
      numberOfItems: 1,
      orderId: 'N5DTLY',
      pickupSchedule: {
        end: '/Date(1621026000000)/',
        start: '/Date(1621004400000)/',
      },
      references: [],
      status: 3,
      type: 3,
      userId: 34113438,
      userPickupAddress: {
        addressLine1: 'Rua Azevedo Coutinho 39',
        addressLine2: 'União das freguesias de Apúlia e Fão 39',
        addressType: 'Any',
        city: { countryId: 165, id: 0, name: 'Esposende' },
        country: {
          alpha2Code: 'PT',
          alpha3Code: 'PRT',
          continentId: 3,
          culture: 'pt-PT',
          id: 165,
          name: 'Portugal',
          nativeName: 'Portugal',
          region: 'Europe',
        },
        createdDate: '/Date(-62135596800000)/',
        firstName: 'Luiz Fischer',
        id: '00000000-0000-0000-0000-000000000000',
        isCurrentBilling: false,
        isCurrentPreferred: false,
        isCurrentShipping: false,
        phone: '123456789',
        state: { code: '-2', countryId: 0, id: 0 },
        zipCode: '4740-382',
      },
    },
  ];

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('Account SVC', () => {
    const query = {};

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.accsvc.success({ orderId, response, query });

      expect.assertions(2);
      await expect(getReturnsFromOrder(orderId, query)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        join('/account/v1/orders', orderId, 'returns', {
          query,
        }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.accsvc.failure({ orderId, query });

      expect.assertions(2);
      await expect(
        getReturnsFromOrder(orderId, query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        join('/account/v1/orders', orderId, 'returns', {
          query,
        }),
        expectedConfig,
      );
    });

    it('should adapt the response correctly', async () => {
      expect(compatibilityAdapter(mockedResponse)).toEqual(convertedResponse);
    });

    it('should adapt reference names correctly', async () => {
      expect(adaptReferenceName('Other')).toBeNull();
      expect(adaptReferenceName('None')).toEqual(0);
      expect(adaptReferenceName('ReturnNote')).toEqual(1);
      expect(adaptReferenceName('ReturnCustomerRequestedAWB')).toEqual(2);
      expect(adaptReferenceName('ReturnLabelAWB')).toEqual(3);
      expect(adaptReferenceName('DropOffLocationsPage')).toEqual(4);
    });

    it('should adapt the items status correctly', async () => {
      expect(adaptItemStatus('Other')).toBeNull();
      expect(adaptItemStatus('Created')).toEqual(0);
      expect(adaptItemStatus('AcceptedWithShippingCosts')).toEqual(1);
      expect(adaptItemStatus('AcceptedWithoutShippingCosts')).toEqual(2);
      expect(adaptItemStatus('Contested')).toEqual(3);
      expect(adaptItemStatus('ContestAccepted')).toEqual(4);
      expect(adaptItemStatus('Canceled')).toEqual(5);
    });

    it('should adapt the courier correctly', async () => {
      expect(adaptCourier('Other')).toBeNull();
      expect(adaptCourier('NotKnown')).toEqual(0);
      expect(adaptCourier('DHL')).toEqual(1);
      expect(adaptCourier('UPS')).toEqual(2);
    });

    it('should adapt the return status correctly', async () => {
      expect(adaptStatus('Other')).toBeNull();
      expect(adaptStatus('Created')).toEqual(0);
      expect(adaptStatus('AwaitingPickup')).toEqual(1);
      expect(adaptStatus('InTransit')).toEqual(2);
      expect(adaptStatus('Accepted')).toEqual(3);
      expect(adaptStatus('PartialAccepted')).toEqual(4);
      expect(adaptStatus('Refused')).toEqual(5);
      expect(adaptStatus('Canceled')).toEqual(6);
      expect(adaptStatus('NeedPickupSchedule')).toEqual(7);
    });

    it('should adapt the return type correctly', async () => {
      expect(adaptType('Other')).toBeNull();
      expect(adaptType('Courier')).toEqual(0);
      expect(adaptType('InStore')).toEqual(1);
      expect(adaptType('CourierDropOff')).toEqual(2);
      expect(adaptType('CourierPickUp')).toEqual(3);
      expect(adaptType('Manual')).toEqual(4);
    });
  });

  describe('Legacy', () => {
    const query = { guestUserEmail: 'test@email.com' };

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.legacy.success({ orderId, response, query });

      expect.assertions(2);
      await expect(getReturnsFromOrder(orderId, query)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/orderreturns', orderId, { query }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.legacy.failure({ orderId, query });

      expect.assertions(2);
      await expect(
        getReturnsFromOrder(orderId, query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/orderreturns', orderId, { query }),
        expectedConfig,
      );
    });
  });
});
