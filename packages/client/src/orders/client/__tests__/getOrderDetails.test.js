import { getOrderDetails } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getOrderDetails.fixtures';
import moxios from 'moxios';

const id = '24BJKS';
const expectedConfig = undefined;

const mockedResponse = {
  id: '24BJKS',
  checkoutOrderId: 138791030,
  userId: 25767945,
  currency: 'GBP',
  shippingAddress: {
    id: '00000000-0000-0000-0000-000000000000',
    firstName: 'Qa',
    lastName: 'TEST',
    addressLine1: '211 old street ',
    city: {
      id: 0,
      name: 'London',
      countryId: 215,
    },
    state: {
      id: 0,
      countryId: 0,
    },
    country: {
      id: 215,
      name: 'United Kingdom',
      nativeName: 'United Kingdom',
      alpha2Code: 'GB',
      alpha3Code: 'GBR',
      culture: 'en-GB',
      region: 'Europe',
      continentId: 3,
    },
    zipCode: 'EC1V 9nr',
    phone: '43534534',
    addressType: 'Any',
    isCurrentShipping: false,
    isCurrentBilling: false,
    isCurrentPreferred: false,
    createdDate: '0001-01-01T00:00:00Z',
  },
  billingAddress: {
    id: '00000000-0000-0000-0000-000000000000',
    firstName: 'Qa',
    lastName: 'TEST',
    addressLine1: 'Teste',
    city: {
      id: 0,
      name: 'PORTO',
      countryId: 165,
    },
    state: {
      id: 0,
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
    zipCode: '2423435',
    phone: '21212121',
    addressType: 'Any',
    isCurrentShipping: false,
    isCurrentBilling: false,
    isCurrentPreferred: false,
    createdDate: '0001-01-01T00:00:00Z',
  },
  createdDate: '2021-06-22T11:03:42.36Z',
  updatedDate: '2021-06-22T11:03:42.36Z',
  items: [
    {
      id: 40933801,
      merchantId: 10361,
      merchantOrderId: 126573020,
      productId: 15904502,
      attributes: [
        {
          type: 'Scale',
          value: '115',
          description: 'Scale',
        },
        {
          type: 'Size',
          value: '19',
          description: 'Size',
        },
        {
          type: 'SizeDescription',
          value: 'XS',
          description: 'SizeDescription',
        },
      ],
      orderStatus: 'Returned',
      orderItemStatus: 'ReturnWithShippinCost',
      creationChannel: 'Catalog',
      shippingService: {
        description: 'Express',
        id: 100001900,
        name: 'Express Delivery',
        type: 'Express',
        minEstimatedDeliveryHour: 24.0,
        maxEstimatedDeliveryHour: 48.0,
        trackingCodes: ['15503544032179'],
      },
      customAttributes: '',
      isReturnAvailable: false,
      returnRestriction: 'BlockedByWorkflow',
      isCustomizable: false,
      isExclusive: false,
      size: 'XS',
      brand: {
        description:
          "Three stripes and you know it's adidas. Responsible for creating some of the world’s most iconic trainers (including the Ultraboost, Stan Smith and Superstar), the sporty stalwart also uses recycled materials when crafting its designs. Steeped in streetwear legacy, spot the iconic Trefoil logo on everything from tops to streamlined joggers too.",
        id: 214504,
        name: 'adidas',
        priceType: 0,
        isActive: false,
      },
      shortDescription: 'logo crop top',
      images: {
        images: [
          {
            order: 1,
            size: '120',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711561_120.jpg',
          },
          {
            order: 1,
            size: '240',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711561_240.jpg',
          },
          {
            order: 1,
            size: '350',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711561_350.jpg',
          },
          {
            order: 1,
            size: '400',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711561_400.jpg',
          },
          {
            order: 1,
            size: '800',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711561_800.jpg',
          },
          {
            order: 1,
            size: '1000',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711561_1000.jpg',
          },
          {
            order: 1,
            size: '1920',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711561_1920.jpg',
          },
          {
            order: 2,
            size: '120',
            url: 'https://img.acme.com/15/90/45/02/15904502_33712531_120.jpg',
          },
          {
            order: 2,
            size: '240',
            url: 'https://img.acme.com/15/90/45/02/15904502_33712531_240.jpg',
          },
          {
            order: 2,
            size: '350',
            url: 'https://img.acme.com/15/90/45/02/15904502_33712531_350.jpg',
          },
          {
            order: 2,
            size: '400',
            url: 'https://img.acme.com/15/90/45/02/15904502_33712531_400.jpg',
          },
          {
            order: 2,
            size: '800',
            url: 'https://img.acme.com/15/90/45/02/15904502_33712531_800.jpg',
          },
          {
            order: 2,
            size: '1000',
            url: 'https://img.acme.com/15/90/45/02/15904502_33712531_1000.jpg',
          },
          {
            order: 2,
            size: '1920',
            url: 'https://img.acme.com/15/90/45/02/15904502_33712531_1920.jpg',
          },
          {
            order: 3,
            size: '120',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710761_120.jpg',
          },
          {
            order: 3,
            size: '240',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710761_240.jpg',
          },
          {
            order: 3,
            size: '350',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710761_350.jpg',
          },
          {
            order: 3,
            size: '400',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710761_400.jpg',
          },
          {
            order: 3,
            size: '800',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710761_800.jpg',
          },
          {
            order: 3,
            size: '1000',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710761_1000.jpg',
          },
          {
            order: 3,
            size: '1920',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710761_1920.jpg',
          },
          {
            order: 4,
            size: '120',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710762_120.jpg',
          },
          {
            order: 4,
            size: '240',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710762_240.jpg',
          },
          {
            order: 4,
            size: '350',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710762_350.jpg',
          },
          {
            order: 4,
            size: '400',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710762_400.jpg',
          },
          {
            order: 4,
            size: '800',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710762_800.jpg',
          },
          {
            order: 4,
            size: '1000',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710762_1000.jpg',
          },
          {
            order: 4,
            size: '1920',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710762_1920.jpg',
          },
          {
            order: 5,
            size: '120',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710760_120.jpg',
          },
          {
            order: 5,
            size: '240',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710760_240.jpg',
          },
          {
            order: 5,
            size: '350',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710760_350.jpg',
          },
          {
            order: 5,
            size: '400',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710760_400.jpg',
          },
          {
            order: 5,
            size: '800',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710760_800.jpg',
          },
          {
            order: 5,
            size: '1000',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710760_1000.jpg',
          },
          {
            order: 5,
            size: '1920',
            url: 'https://img.acme.com/15/90/45/02/15904502_33710760_1920.jpg',
          },
          {
            order: 6,
            size: '120',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711562_120.jpg',
          },
          {
            order: 6,
            size: '240',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711562_240.jpg',
          },
          {
            order: 6,
            size: '350',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711562_350.jpg',
          },
          {
            order: 6,
            size: '400',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711562_400.jpg',
          },
          {
            order: 6,
            size: '800',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711562_800.jpg',
          },
          {
            order: 6,
            size: '1000',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711562_1000.jpg',
          },
          {
            order: 6,
            size: '1920',
            url: 'https://img.acme.com/15/90/45/02/15904502_33711562_1920.jpg',
          },
        ],
        liveModelId: 1968,
        liveModel: {
          id: 1968,
          measurements: [
            {
              description: 'Bust',
              unit: 'cm',
              value: 82.0,
            },
            {
              description: 'Height',
              unit: 'cm',
              value: 180.0,
            },
            {
              description: 'Hips',
              unit: 'cm',
              value: 96.0,
            },
            {
              description: 'Waist',
              unit: 'cm',
              value: 64.0,
            },
          ],
          name: "Catarina Santos/ PT/ L'Agence",
          globalId: '00000000-0000-0000-0000-000000000000',
        },
        productSize: 'S',
      },
      categories: [
        {
          id: 135967,
          name: 'Clothing',
          parentId: 0,
          gender: 'Woman',
        },
        {
          id: 137117,
          name: 'Activewear',
          parentId: 0,
          gender: 'Woman',
        },
        {
          id: 135983,
          name: 'Tops',
          parentId: 135967,
          gender: 'Woman',
        },
        {
          id: 137121,
          name: 'Performance Tops',
          parentId: 137117,
          gender: 'Woman',
        },
        {
          id: 136091,
          name: 'T-shirts & Jerseys',
          parentId: 135983,
          gender: 'Woman',
        },
        {
          id: 137131,
          name: 'Performance T-Shirts',
          parentId: 137121,
          gender: 'Woman',
        },
      ],
      colors: [
        {
          color: {
            id: 112502,
            name: 'Green',
          },
          tags: ['MainColor'],
        },
      ],
      productSlug: 'logo-crop-top-15904502',
      productType: 'Standard',
      price: {
        priceExclTaxes: 16.67,
        priceInclTaxes: 20.0,
        priceInclTaxesWithoutDiscount: 20.0,
        discountExclTaxes: 0.0,
        discountInclTaxes: 0.0,
        discountRate: 0.0,
        taxesRate: 20.0,
        taxesValue: 3.33,
        tags: ['DDP', 'VAT'],
        formattedPrice: '£20.00',
        formattedPriceWithoutDiscount: '£20.00',
        formattedPriceWithoutCurrency: '20.000',
        formattedPriceWithoutDiscountAndCurrency: '20.000',
        taxType: 'DDP',
      },
    },
  ],
  totalQuantity: 1,
  subTotalAmount: 20.0,
  totalDiscount: 19.2,
  totalShippingFee: 8.0,
  totalTaxes: 0.0,
  totalDomesticTaxes: 0.0,
  grandTotal: 6.76,
  credit: 2.04,
  subTotalAmountExclTaxes: 20.0,
  customerType: 'Normal',
  formattedCredit: '£2.04',
  formattedGrandTotal: '£6.76',
  formattedSubTotalAmount: '£20.00',
  formattedTotalDiscount: '£19.20',
  formattedTotalShippingFee: '£8.00',
  formattedTotalTaxes: '£0.00',
  formattedTotalDomesticTaxes: '£0.00',
  formattedSubTotalAmountExclTaxes: '£20.00',
  taxType: 'DDP',
};

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getOrderDetails', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    fixtures.success({ id, response: mockedResponse });

    await expect(getOrderDetails(id)).resolves.toStrictEqual(mockedResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${id}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    await expect(getOrderDetails(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${id}`,
      expectedConfig,
    );
  });
});
