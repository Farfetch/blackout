import * as yup from 'yup';
import {
  affiliationSchema,
  couponRequiredSchema,
  couponSchema,
  currencyRequiredSchema,
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
  productIdSchema,
  productRequiredSchema,
  quantitySchema,
  shippingSchema,
  sizeSchema,
  sortOptionSchema,
  taxSchema,
  totalRequiredSchema,
  totalSchema,
  valueSchema,
  wishlistIdSchema,
} from '../../shared/validation/eventSchemas';
import {
  eventTypes,
  interactionTypes,
  pageTypes,
} from '@farfetch/blackout-analytics';
import { InternalEventTypes } from '../eventMapping';
import { SignupNewsletterGenderMappings } from '../../shared/dataMappings/';

export const errorCodes = {
  InvalidSize: 'ga4_invalid_size',
  InvalidQuantity: 'ga4_invalid_quantity',
  InvalidColour: 'ga4_invalid_colour',
};

const fullProductSchema = productBaseSchema
  .concat(affiliationSchema)
  .concat(couponSchema)
  .concat(currencySchema)
  .concat(discountSchema)
  .concat(listIdSchema)
  .concat(listNameSchema)
  .concat(locationSchema)
  .concat(priceWithoutDiscountSchema)
  .concat(quantitySchema)
  .concat(positionSchema)
  .concat(sizeSchema);

const productsSchema = yup.object({
  products: yup.array().of(fullProductSchema),
});

const baseCheckoutSchema = productsSchema
  .concat(currencyRequiredSchema)
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

const shippingInfoAddedSchema = baseCheckoutSchema
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

const selectItemSchema = fullProductSchema
  .concat(listNameSchema)
  .concat(listIdSchema);

const imageCountSchema = yup.object({
  imageCount: yup.number().notRequired(),
});

const errorSchema = yup.object({
  error: yup.string().notRequired(),
});

const viewItemSchema = fullProductSchema.concat(imageCountSchema);

const viewItemListSchema = productsSchema
  .concat(fromSchema)
  .concat(sortOptionSchema)
  .concat(filtersSchema)
  .concat(errorSchema);

const viewBagSchema = currencyRequiredSchema
  .concat(fromSchema)
  .concat(listIdSchema)
  .concat(listNameSchema)
  .concat(productsSchema)
  .concat(valueSchema);

const viewWishlistSchema = wishlistIdSchema.required();

const shareSchema = yup.object({
  method: yup.string().notRequired(),
  contentType: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

const changeScaleSizeGuideSchema = fromSchema
  .concat(productRequiredSchema)
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

const productUpdatesInCartWishlistSchema = yup.object({
  oldSize: yup.string(),
  size: yup.string(),
  oldQuantity: yup.number(),
  quantity: yup.number(),
});

const manageProductInCartSchema = fromSchema
  .concat(valueSchema)
  .concat(fullProductSchema)
  .concat(currencyRequiredSchema)
  .concat(productUpdatesInCartWishlistSchema);

const manageProductInWishlistSchema =
  manageProductInCartSchema.concat(wishlistIdSchema);

const updateProductSchema = fromSchema.concat(productRequiredSchema);

const changeSizeProductInCartSchema = updateProductSchema.concat(
  yup.object({
    oldSize: yup.string(),
    size: yup
      .string()
      .test(errorCodes.InvalidSize, errorCodes.InvalidSize, function () {
        const { oldSize, size } = this.parent;
        // This validation can be unused at the moment because ga4 responds to
        // product_updated event, which ar a special event because analyzes metadata,
        // and assigns different events, like change_size if provided data shows
        // a change size intent.

        return oldSize !== size;
      }),
  }),
);

const changeQuantityProductInCartSchema = updateProductSchema.concat(
  yup.object({
    oldQuantity: yup.number(),
    quantity: yup
      .number()
      .test(
        errorCodes.InvalidQuantity,
        errorCodes.InvalidQuantity,
        function () {
          const { oldQuantity, quantity } = this.parent;
          // This validation can be unused at the moment because ga4 responds to
          // product_updated event, which ar a special event because analyzes metadata,
          // and assigns different events, like change_quantity if provided data shows
          // a change size intent.

          return oldQuantity !== quantity;
        },
      ),
  }),
);

const colourChangedSchema = updateProductSchema.concat(
  yup.object({
    oldColour: yup.string(),
    colour: yup
      .string()
      .test(errorCodes.InvalidColour, errorCodes.InvalidColour, function () {
        const { oldColour, colour } = this.parent;
        // This validation can be unused at the moment because ga4 responds to
        // product_updated event, which ar a special event because analyzes metadata,
        // and assigns different events, like change_colour if provided data shows
        // a change size intent.

        return oldColour !== colour;
      }),
  }),
);

const checkoutStepEditingSchema = yup.object({
  step: yup.number().required(),
});

const checkoutShippingStepSchema = currencySchema
  .concat(totalSchema)
  .concat(couponSchema)
  .concat(addressFinderSchema)
  .concat(deliveryTypeSchema)
  .concat(packagingTypeSchema)
  .concat(shippingTierSchema);

const checkoutAbandonedSchema = currencySchema
  .concat(totalSchema)
  .concat(couponSchema);

const promocodeAppliedSchema =
  checkoutShippingStepSchema.concat(couponRequiredSchema);

const placeOrderStartedSchema = currencyRequiredSchema
  .concat(couponSchema)
  .concat(totalRequiredSchema)
  .concat(orderIdSchema)
  .concat(affiliationSchema)
  .concat(shippingSchema)
  .concat(taxSchema);

const sameBillingAddressSelectedSchema = checkoutShippingStepSchema;
const shippingMethodAddedSchema = checkoutShippingStepSchema;
const addressInfoAddedSchema = checkoutShippingStepSchema;

const interactContentSchema = yup.object({
  interactionType: yup
    .string()
    .test(
      'match_interaction_type',
      'The interactionType must match one of the built-in "interationTypes"',
      value => Object.values(interactionTypes).includes(value),
    ),
});

const signupNewsletterSchema = yup.object({
  gender: yup.string().oneOf(Object.keys(SignupNewsletterGenderMappings)),
});

export default {
  [eventTypes.CHECKOUT_ABANDONED]: checkoutAbandonedSchema,
  [eventTypes.CHECKOUT_STARTED]: beginCheckoutSchema,
  [eventTypes.ORDER_COMPLETED]: purchaseAndRefundSchema,
  [eventTypes.ORDER_REFUNDED]: purchaseAndRefundSchema,
  [eventTypes.PAYMENT_INFO_ADDED]: checkoutPaymentStepSchema,
  [eventTypes.PLACE_ORDER_STARTED]: placeOrderStartedSchema,
  [eventTypes.PRODUCT_ADDED_TO_CART]: manageProductInCartSchema,
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: manageProductInCartSchema,
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: manageProductInWishlistSchema,
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: manageProductInWishlistSchema,
  [eventTypes.PRODUCT_CLICKED]: selectItemSchema,
  [eventTypes.PRODUCT_LIST_VIEWED]: viewItemListSchema,
  [eventTypes.PRODUCT_VIEWED]: viewItemSchema,
  [eventTypes.PROMOCODE_APPLIED]: promocodeAppliedSchema,
  [eventTypes.SELECT_CONTENT]: selectContentSchema,
  [eventTypes.SHIPPING_INFO_ADDED]: shippingInfoAddedSchema,
  [pageTypes.BAG]: viewBagSchema,
  [pageTypes.SEARCH]: searchSchema,
  [pageTypes.WISHLIST]: viewWishlistSchema,
  [eventTypes.SHARE]: shareSchema,
  [eventTypes.CHANGE_SCALE_SIZE_GUIDE]: changeScaleSizeGuideSchema,
  [eventTypes.CHECKOUT_STEP_EDITING]: checkoutStepEditingSchema,
  [eventTypes.SAME_BILLING_ADDRESS_SELECTED]: sameBillingAddressSelectedSchema,
  [eventTypes.ADDRESS_INFO_ADDED]: addressInfoAddedSchema,
  [eventTypes.SHIPPING_METHOD_ADDED]: shippingMethodAddedSchema,
  [eventTypes.INTERACT_CONTENT]: interactContentSchema,
  [eventTypes.SIGNUP_NEWSLETTER]: signupNewsletterSchema,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE]:
    changeSizeProductInCartSchema,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY]:
    changeQuantityProductInCartSchema,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR]: colourChangedSchema,
};
