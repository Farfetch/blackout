import * as yup from 'yup';
import {
  affiliationSchema,
  couponRequiredSchema,
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
  priceWithoutDiscountSchema,
  productBaseSchema,
  productCheckoutSchema,
  productIdSchema,
  quantitySchema,
  shippingSchema,
  sortOptionSchema,
  taxSchema,
  totalRequiredSchema,
  valueSchema,
} from '../../shared/validation/eventSchemas';
import {
  eventTypes,
  interactionTypes,
  pageTypes,
} from '@farfetch/blackout-analytics';
import { InternalEventTypes } from '../eventMapping';

export const errorCodes = {
  InvalidOldSize: 'ga4_invalid_old_size',
  InvalidOldQuantity: 'ga4_invalid_old_size',
  InvalidOldColour: 'ga4_invalid_old_colour',
};

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
  .concat(priceWithoutDiscountSchema)
  .concat(quantitySchema)
  .concat(positionSchema);

const productsSchema = yup.object({
  products: yup.array().of(baseProductSchema),
});

const baseCheckoutSchema = productsSchema
  .concat(currencySchema)
  .concat(totalRequiredSchema)
  .concat(couponSchema);

const checkoutPaymentStepSchema = baseCheckoutSchema.concat(
  yup.object({
    paymentType: yup.string(),
  }),
);

const addressFinderSchema = yup.object({
  addressFinder: yup.boolean().strict().notRequired(),
});

const deliveryTypeSchema = yup.object({
  deliveryType: yup.string().strict().notRequired(),
});

const packagingTypeSchema = yup.object({
  packagingType: yup.string().strict().notRequired(),
});

const shippingTierSchema = yup.object({
  shippingTier: yup.string().strict().notRequired(),
});

const checkoutShippingStepSchema = baseCheckoutSchema
  .concat(addressFinderSchema)
  .concat(deliveryTypeSchema)
  .concat(packagingTypeSchema)
  .concat(shippingTierSchema);

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

const viewItemSchema = baseProductSchema.concat(imageCountSchema);

const viewItemListSchema = productsSchema
  .concat(fromSchema)
  .concat(sortOptionSchema)
  .concat(filtersSchema)
  .concat(errorSchema);

const prePurchaseProductSchema = productCheckoutSchema
  .concat(listNameSchema)
  .concat(listIdSchema)
  .concat(affiliationSchema)
  .concat(couponSchema)
  .concat(positionSchema)
  .concat(locationSchema);

const prePurchaseProductListSchema = yup.object({
  products: yup.array().of(prePurchaseProductSchema),
});

const prePurchaseSchema = fromSchema
  .concat(currencySchema)
  .concat(valueSchema)
  .concat(prePurchaseProductListSchema);

const shareSchema = yup.object({
  method: yup.string().notRequired(),
  contentType: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

const changeScaleSizeGuideSchema = fromSchema
  .concat(productsSchema)
  .concat(currencySchema)
  .concat(valueSchema)
  .concat(
    yup.object({
      sizeScaleName: yup.string().nullable(),
    }),
  )
  .concat(
    yup.object({
      sizeScaleId: yup.string().nullable(),
    }),
  );

const addOrRemoveProductInCartSchema = yup.object({
  oldSize: yup.string(),
  size: yup.string(),
  oldQuantity: yup.number(),
  quantity: yup.number(),
});

const manageProductInCartSchema = fromSchema
  .concat(currencySchema)
  .concat(valueSchema)
  .concat(prePurchaseProductSchema)
  .concat(addOrRemoveProductInCartSchema);

const updateProductInCart = fromSchema
  .concat(currencySchema)
  .concat(valueSchema)
  .concat(prePurchaseProductSchema);

const changeSizeProductInCartSchema = updateProductInCart.concat(
  yup.object({
    oldSize: yup.string(),
    size: yup
      .string()
      .test(errorCodes.InvalidOldSize, errorCodes.InvalidOldSize, function () {
        const { oldSize } = this.parent;

        return oldSize !== undefined;
      }),
  }),
);

const changeQuantityProductInCartSchema = updateProductInCart.concat(
  yup.object({
    oldQuantity: yup.number(),
    quantity: yup
      .number()
      .test(
        errorCodes.InvalidOldQuantity,
        errorCodes.InvalidOldQuantity,
        function () {
          const { oldQuantity } = this.parent;

          return oldQuantity !== undefined;
        },
      ),
  }),
);

const checkoutStepEditingSchema = yup.object({
  step: yup.number().required(),
});

const checkoutAbandonedSchema = baseCheckoutSchema.concat(fromSchema);
const promocodeAppliedSchema =
  checkoutShippingStepSchema.concat(couponRequiredSchema);
const placeOrderStartedSchema = purchaseAndRefundSchema;
const sameBillingAddressSelectedSchema = checkoutShippingStepSchema;
const addressInfoAddedSchema = checkoutShippingStepSchema;
const shippingMethodAddedSchema = checkoutShippingStepSchema;
const colourChangedSchema = updateProductInCart.concat(
  yup.object({
    oldColour: yup.string(),
    colour: yup
      .string()
      .test(
        errorCodes.InvalidOldColour,
        errorCodes.InvalidOldColour,
        function () {
          const { oldColour } = this.parent;

          return oldColour !== undefined;
        },
      ),
  }),
);

const interactContentSchema = yup.object({
  interactionType: yup
    .string()
    .test(
      'match_interaction_type',
      'The interactionType must match one of the built-in "interationTypes"',
      value => Object.values(interactionTypes).includes(value),
    ),
});

export default {
  [eventTypes.CHECKOUT_ABANDONED]: checkoutAbandonedSchema,
  [eventTypes.CHECKOUT_STARTED]: beginCheckoutSchema,
  [eventTypes.ORDER_COMPLETED]: purchaseAndRefundSchema,
  [eventTypes.ORDER_REFUNDED]: purchaseAndRefundSchema,
  [eventTypes.PAYMENT_INFO_ADDED]: checkoutPaymentStepSchema,
  [eventTypes.PLACE_ORDER_STARTED]: placeOrderStartedSchema,
  [eventTypes.PRODUCT_ADDED_TO_CART]: manageProductInCartSchema,
  [eventTypes.PRODUCT_CLICKED]: selectItemSchema,
  [eventTypes.PRODUCT_LIST_VIEWED]: viewItemListSchema,
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: manageProductInCartSchema,
  [eventTypes.PRODUCT_VIEWED]: viewItemSchema,
  [eventTypes.PROMOCODE_APPLIED]: promocodeAppliedSchema,
  [eventTypes.SELECT_CONTENT]: selectContentSchema,
  [eventTypes.SHIPPING_INFO_ADDED]: checkoutShippingStepSchema,
  [pageTypes.BAG]: prePurchaseSchema,
  [pageTypes.SEARCH]: searchSchema,
  [pageTypes.WISHLIST]: prePurchaseSchema,
  [eventTypes.SHARE]: shareSchema,
  [eventTypes.CHANGE_SCALE_SIZE_GUIDE]: changeScaleSizeGuideSchema,
  [eventTypes.CHECKOUT_STEP_EDITING]: checkoutStepEditingSchema,
  [eventTypes.SAME_BILLING_ADDRESS_SELECTED]: sameBillingAddressSelectedSchema,
  [eventTypes.ADDRESS_INFO_ADDED]: addressInfoAddedSchema,
  [eventTypes.SHIPPING_METHOD_ADDED]: shippingMethodAddedSchema,
  [eventTypes.INTERACT_CONTENT]: interactContentSchema,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE]:
    changeSizeProductInCartSchema,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY]:
    changeQuantityProductInCartSchema,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR]: colourChangedSchema,
};
