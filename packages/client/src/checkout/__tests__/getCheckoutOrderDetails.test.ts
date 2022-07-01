import * as checkoutClient from '..';
import {
  AttributeType,
  CheckoutOrderStatus,
  CreationChannel,
  DeliveryWindowType,
  Gender,
  GetCheckoutOrderDetailsResponse,
  ItemStatus,
  PurchaseChannel,
  ShippingCostType,
  ShippingMode,
} from '../..';
import { id } from 'tests/__fixtures__/checkout';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCheckoutOrderDetails.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrderDetails', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}/details`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutOrderDetailsResponse = {
        checkoutOrder: {
          bagId: 'string',
          billingAddress: {
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
          checkoutOrderMerchants: [
            {
              merchantId: 0,
              merchantName: 'string',
              salesTax: 0,
              shipping: {
                currency: 'string',
                discount: 0,
                merchants: [0],
                price: 0,
                formattedPrice: 'string',
                shippingCostType: ShippingCostType.PerStoreFlatRate,
                shippingService: {
                  description: 'string',
                  id: 0,
                  name: 'string',
                  type: 'string',
                  minEstimatedDeliveryHour: 0,
                  maxEstimatedDeliveryHour: 0,
                  trackingCodes: ['string'],
                },
                shippingWithoutCapped: 0,
                baseFlatRate: 0,
              },
            },
          ],
          countryId: 0,
          createdDate: '2021-07-22T09:19:53.935Z',
          credits: [
            {
              sourceCreditValue: 0,
              sourceCurrencyId: 0,
              storeId: 0,
              targetCreditValue: 0,
              targetCurrencyId: 0,
              userId: 'string',
            },
          ],
          currency: 'string',
          customerType: 'Normal',
          grandTotal: 0,
          id: 0,
          items: [
            {
              attributes: [
                {
                  type: AttributeType.Size,
                  value: 'string',
                  description: 'string',
                },
              ],
              brandName: 'string',
              brandId: 0,
              checkoutOrderId: 0,
              creationChannel: CreationChannel.Catalog,
              id: 0,
              images: {
                images: [
                  {
                    order: 0,
                    size: 'string',
                    url: 'string',
                  },
                ],
                liveModelId: 0,
                liveModel: {
                  id: 0,
                  measurements: [
                    {
                      description: 'string',
                      unit: 'string',
                      value: 0,
                    },
                  ],
                  name: 'string',
                  globalId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                },
                productSize: 'string',
                tag: 'string',
              },
              merchantId: 0,
              merchantName: 'string',
              productId: 0,
              productName: 'string',
              productSlug: 'string',
              quantity: 0,
              status: ItemStatus.Available,
              categories: [
                {
                  id: 0,
                  name: 'string',
                  parentId: 0,
                  gender: Gender.Woman,
                },
              ],
              variants: [
                {
                  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  attributes: [
                    {
                      type: AttributeType.Size,
                      value: 'string',
                      description: 'string',
                    },
                  ],
                  availableAt: [0],
                  merchantId: 0,
                  price: {
                    priceExclTaxes: 0,
                    priceInclTaxes: 0,
                    priceInclTaxesWithoutDiscount: 0,
                    discountExclTaxes: 0,
                    discountInclTaxes: 0,
                    discountRate: 0,
                    taxesRate: 0,
                    taxesValue: 0,
                    tags: ['string'],
                    formattedPrice: 'string',
                    formattedPriceWithoutDiscount: 'string',
                    formattedPriceWithoutCurrency: 'string',
                    formattedPriceWithoutDiscountAndCurrency: 'string',
                    taxType: 'string',
                  },
                  formattedPrice: 'string',
                  formattedPriceWithoutDiscount: 'string',
                  purchaseChannel: PurchaseChannel.AddToBag,
                  quantity: 0,
                  size: 'string',
                  scale: 'string',
                  scaleAbbreviation: 'string',
                  sizeDescription: 'string',
                  isOneSize: true,
                },
              ],
              colors: [
                {
                  color: {
                    id: 0,
                    name: 'string',
                  },
                  tags: ['string'],
                },
              ],
              tags: ['string'],
              promocodeDiscountPercentage: 0,
              isExclusive: true,
              customAttributes: 'string',
              isCustomizable: true,
              gift: {
                to: 'string',
                from: 'string',
                message: 'string',
              },
              fulfillmentInfo: {
                isPreOrder: true,
                fulfillmentDate: '2021-07-22T09:19:53.935Z',
              },
              size: 'string',
              scale: 'string',
              sizeDescription: 'string',
              price: {
                priceExclTaxes: 0,
                priceInclTaxes: 0,
                priceInclTaxesWithoutDiscount: 0,
                discountExclTaxes: 0,
                discountInclTaxes: 0,
                discountRate: 0,
                taxesRate: 0,
                taxesValue: 0,
                tags: ['string'],
                formattedPrice: 'string',
                formattedPriceWithoutDiscount: 'string',
                formattedPriceWithoutCurrency: 'string',
                formattedPriceWithoutDiscountAndCurrency: 'string',
                taxType: 'string',
              },
              productAggregator: {
                id: 0,
                images: {
                  images: [
                    {
                      order: 0,
                      size: 'string',
                      url: 'string',
                    },
                  ],
                  liveModelId: 0,
                  liveModel: {
                    id: 0,
                    measurements: [
                      {
                        description: 'string',
                        unit: 'string',
                        value: 0,
                      },
                    ],
                    name: 'string',
                    globalId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  },
                  productSize: 'string',
                  tag: 'string',
                },
                bundleSlug: 'string',
              },
            },
          ],
          locale: 'string',
          orderId: 'string',
          promocode: 'string',
          shippingAddress: {
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
          status: CheckoutOrderStatus.Opened,
          subTotalAmount: 0,
          subTotalAmountExclTaxes: 0,
          totalDiscount: 0,
          totalQuantity: 0,
          totalShippingFee: 0,
          totalTaxes: 0,
          totalDomesticTaxes: 0,
          totalCredit: 0,
          formattedGrandTotal: 'string',
          formattedSubTotalAmount: 'string',
          formattedSubTotalAmountExclTaxes: 'string',
          formattedTotalDiscount: 'string',
          formattedTotalShippingFee: 'string',
          formattedTotalTaxes: 'string',
          formattedTotalDomesticTaxes: 'string',
          formattedTotalCredit: 'string',
          taxType: 'string',
          updatedDate: '2021-07-22T09:19:53.935Z',
          userId: 0,
          clickAndCollect: {
            collectPointId: 0,
            merchantLocationId: 0,
          },
          tags: ['string'],
          hadUnavailableItems: true,
          isGuestUser: true,
          shippingMode: ShippingMode.ByMerchant,
        },
        shippingOptions: [
          {
            currency: 'string',
            discount: 0,
            merchants: [0],
            price: 0,
            formattedPrice: 'string',
            shippingCostType: ShippingCostType.PerStoreFlatRate,
            shippingService: {
              description: 'string',
              id: 0,
              name: 'string',
              type: 'string',
              minEstimatedDeliveryHour: 0,
              maxEstimatedDeliveryHour: 0,
              trackingCodes: ['string'],
            },
            shippingWithoutCapped: 0,
            baseFlatRate: 0,
          },
        ],
        deliveryBundles: [
          {
            id: 'string',
            name: 'string',
            isSelected: true,
            price: 0,
            formattedPrice: 'string',
            discount: 0,
            currency: 'string',
            rank: 0,
            itemsDeliveryOptions: [
              {
                itemId: 0,
                name: 'string',
                deliveryWindow: {
                  type: DeliveryWindowType.Nominated,
                  min: '2021-07-22T09:19:53.935Z',
                  max: '2021-07-22T09:19:53.935Z',
                },
              },
            ],
          },
        ],
        registered: true,
      };

      mswServer.use(fixtures.success(response));

      expect.assertions(2);
      await expect(
        checkoutClient.getCheckoutOrderDetails(id),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.getCheckoutOrderDetails(id),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
