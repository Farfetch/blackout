import * as yup from 'yup';
import {
  affiliationSchema,
  couponSchema,
  currencySchema,
  discountSchema,
  filtersSchema,
  fromSchema,
  listIdSchema,
  listNameSchema,
  locationSchema,
  orderIdSchema,
  positionSchema,
  priceRequiredSchema,
  priceSchema,
  productBaseSchema,
  productCheckoutSchema,
  productIdSchema,
  quantitySchema,
  shippingSchema,
  sortSchema,
  taxSchema,
  totalRequiredSchema,
  valueSchema,
} from '../../shared/validation/eventSchemas';
import { eventTypes, pageTypes } from '@farfetch/blackout-core/analytics';

export const locationId = yup.object({
  locationId: yup.string(),
});

const baseProductSchema = productBaseSchema
  .concat(currencySchema)
  .concat(couponSchema)
  .concat(affiliationSchema)
  .concat(discountSchema)
  .concat(listNameSchema)
  .concat(listIdSchema)
  .concat(locationId)
  .concat(priceSchema)
  .concat(quantitySchema)
  .concat(positionSchema);

const productsSchema = yup.object({
  products: yup.array().of(baseProductSchema),
});

export const baseCheckoutSchema = productsSchema
  .concat(currencySchema)
  .concat(totalRequiredSchema)
  .concat(couponSchema);

const checkoutPaymentStepSchema = baseCheckoutSchema.concat(
  yup.object({
    paymentType: yup.string(),
  }),
);

const addressFinderSchema = yup.object({
  addressFinder: yup.boolean().notRequired(),
});

const deliveryTypeSchema = yup.object({
  deliveryType: yup.string().strict().notRequired(),
});

const packagingTypeSchema = yup.object({
  packagingType: yup.string().strict().notRequired(),
});

const checkoutShippingStepSchema = baseCheckoutSchema
  .concat(addressFinderSchema)
  .concat(deliveryTypeSchema)
  .concat(packagingTypeSchema)
  .concat(
    yup.object({
      shippingTier: yup.string(),
    }),
  );

const beginCheckoutSchema = baseCheckoutSchema.concat(fromSchema);

const purchaseAndRefundSchema = baseCheckoutSchema
  .concat(orderIdSchema)
  .concat(productsSchema)
  .concat(taxSchema)
  .concat(shippingSchema);

const searchSchema = yup.object({
  searchTerm: yup.string().required(),
});

const selectContentSchema = productIdSchema.concat(
  yup.object({
    contentType: yup.string().nullable(),
  }),
);

const selectItemSchema = baseProductSchema
  .concat(listNameSchema)
  .concat(listIdSchema);

const imageCountSchema = yup.object({
  imageCount: yup.number().notRequired(),
});

const errorSchema = yup.object({
  error: yup.string().notRequired(),
});

const viewItemSchema = baseProductSchema
  .concat(imageCountSchema)
  .concat(priceRequiredSchema);
const viewItemListSchema = productsSchema
  .concat(fromSchema)
  .concat(sortSchema)
  .concat(filtersSchema)
  .concat(errorSchema);

const prePurchaseProductSchema = productCheckoutSchema
  .concat(priceRequiredSchema)
  .concat(listNameSchema)
  .concat(listIdSchema)
  .concat(affiliationSchema)
  .concat(couponSchema)
  .concat(positionSchema)
  .concat(locationSchema);

const prePurchaseProductListSchema = yup.object({
  products: yup.array().of(prePurchaseProductSchema).required(),
});

const prePurchaseSchema = fromSchema
  .concat(currencySchema)
  .concat(valueSchema)
  .concat(prePurchaseProductListSchema);

export default {
  [eventTypes.PAYMENT_INFO_ADDED]: checkoutPaymentStepSchema,
  [eventTypes.SHIPPING_INFO_ADDED]: checkoutShippingStepSchema,
  [eventTypes.CHECKOUT_STARTED]: beginCheckoutSchema,
  [eventTypes.ORDER_COMPLETED]: purchaseAndRefundSchema,
  [eventTypes.ORDER_REFUNDED]: purchaseAndRefundSchema,
  [pageTypes.SEARCH]: searchSchema,
  [eventTypes.SELECT_CONTENT]: selectContentSchema,
  [eventTypes.PRODUCT_CLICKED]: selectItemSchema,
  [eventTypes.PRODUCT_VIEWED]: viewItemSchema,
  [eventTypes.PRODUCT_LIST_VIEWED]: viewItemListSchema,
  [pageTypes.BAG]: prePurchaseSchema,
};
