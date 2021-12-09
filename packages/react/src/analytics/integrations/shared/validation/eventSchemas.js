/**
 * @module eventSchemas
 * @private
 */

import * as yup from 'yup';
import { eventTypes } from '@farfetch/blackout-core/analytics';
import defaultTo from 'lodash/defaultTo';

/**
 * Schema definitions for each event.
 * Defined using yup.
 *
 * @see {@link https://github.com/jquense/yup} for more information
 */

export const productIdSchema = yup.object({
  id: yup.string().nullable(),
});

export const productNameSchema = yup.object({
  name: yup.string().strict().nullable(),
});

export const productRequiredSchema = productIdSchema
  .concat(productNameSchema)
  .test(
    'required_product_fields',
    'Must provide an id or a name field',
    value => {
      return defaultTo(value.id, value.name);
    },
  );

export const productBaseSchema = productRequiredSchema.concat(
  yup.object({
    category: yup.string().strict().nullable(),
    brand: yup.string().strict().nullable(),
    variant: yup.string().strict().nullable(),
  }),
);

export const discountSchema = yup.object({
  discountValue: yup.number().min(0).strict(),
});

export const affiliationSchema = yup.object({
  affiliation: yup.string().strict(),
});

export const currencySchema = yup.object({
  currency: yup.string().strict().required(),
});

export const productBaseWithCurrencySchema =
  productBaseSchema.concat(currencySchema);

export const positionSchema = yup.object({
  position: yup.number().min(1).strict().nullable(),
});

export const priceSchema = yup.object({
  price: yup.number().min(0).strict().nullable(),
});

export const priceWithoutDiscountSchema = yup.object({
  price: yup.number().min(0).strict().nullable(),
});

export const quantitySchema = yup.object({
  quantity: yup.number().positive().integer().strict().nullable(),
});

export const outOfStockSchema = yup.object({
  isOutOfStock: yup.string().notRequired(),
});

export const productsListSchema = yup.object({
  products: yup.array().of(productBaseSchema.concat(positionSchema)),
});

export const productCheckoutSchema = productBaseSchema
  .concat(priceSchema)
  .concat(quantitySchema);

export const productsListCheckoutSchema = yup.object({
  products: yup.array().of(productCheckoutSchema),
});

export const productsListRefundSchema = yup.object({
  products: yup.array().of(productIdSchema.concat(quantitySchema)),
});

export const listNameSchema = yup.object({
  list: yup.string(),
});

export const listIdSchema = yup.object({
  listId: yup.string(),
});

export const orderIdSchema = yup.object({
  orderId: yup.string().required(),
});

export const couponSchema = yup.object({
  coupon: yup.string().strict().nullable(),
});

export const totalRequiredSchema = yup.object({
  total: yup.number().required(),
});

export const taxSchema = yup.object({
  tax: yup.number().min(0).strict().nullable(),
});

export const shippingSchema = yup.object({
  shipping: yup.number().min(0).strict().nullable(),
});

export const locationSchema = yup.object({
  locationId: yup.string().strict(),
});

export const valueSchema = yup.object({
  value: yup.number().strict(),
});

export const orderSchema = orderIdSchema
  .concat(couponSchema)
  .concat(taxSchema)
  .concat(shippingSchema)
  .concat(
    yup.object({
      total: yup.number().min(0).strict().nullable(),
    }),
  );

export const fromSchema = yup.object({
  from: yup.string().strict().notRequired(),
});

export const productAddedRemovedCartSchema = productBaseSchema
  .concat(priceSchema)
  .concat(quantitySchema)
  .concat(currencySchema)
  .concat(fromSchema);

export const productAddedRemovedWishlistSchema = productAddedRemovedCartSchema;

export const productClickedSchema = productRequiredSchema
  .concat(positionSchema)
  .concat(listNameSchema);

export const productViewedSchema =
  productBaseWithCurrencySchema.concat(outOfStockSchema);

export const productListViewedSchema = productsListSchema
  .concat(listNameSchema)
  .concat(currencySchema);

export const checkoutSchema = yup.object({
  step: yup.number().notRequired(),
  option: yup.string().notRequired(),
});

export const checkoutStepViewedSchema = productsListCheckoutSchema
  .concat(checkoutSchema)
  .concat(currencySchema);

export const orderCompletedSchema = productsListCheckoutSchema
  .concat(orderSchema)
  .concat(currencySchema);

export const productRefundSchema =
  productsListRefundSchema.concat(orderIdSchema);

export const loginSignUpSchema = yup.object({
  method: yup.string().notRequired(),
});

export const fromRequiredSchema = yup.object({
  from: yup.string().strict().required(),
});

export const sortOptionSchema = yup.object({
  sortOption: yup.string().notRequired(),
});

export const filtersSchema = yup.object({
  filters: yup.object().notRequired(),
});

/**
 * Schemas map by event name.
 */
const schemaEventsMap = {
  [eventTypes.CHECKOUT_STEP_COMPLETED]: checkoutSchema,
  [eventTypes.CHECKOUT_STEP_VIEWED]: checkoutStepViewedSchema,
  [eventTypes.FILTERS_APPLIED]: filtersSchema,
  [eventTypes.FILTERS_CLEARED]: filtersSchema,
  [eventTypes.LOGIN]: loginSignUpSchema,
  [eventTypes.ORDER_COMPLETED]: orderCompletedSchema,
  [eventTypes.ORDER_REFUNDED]: productRefundSchema,
  [eventTypes.PRODUCT_ADDED_TO_CART]: productAddedRemovedCartSchema,
  [eventTypes.PRODUCT_CLICKED]: productClickedSchema,
  [eventTypes.PRODUCT_LIST_VIEWED]: productListViewedSchema,
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: productAddedRemovedCartSchema,
  [eventTypes.PRODUCT_VIEWED]: productViewedSchema,
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: productAddedRemovedWishlistSchema,
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: productAddedRemovedWishlistSchema,
  [eventTypes.PRODUCT_UPDATED_WISHLIST]: productAddedRemovedWishlistSchema,
  [eventTypes.SIGNUP_FORM_COMPLETED]: loginSignUpSchema,
  [eventTypes.SORT_OPTION_CHANGED]: sortOptionSchema,
};

export default schemaEventsMap;

export { yup as validationSchemaBuilder };
