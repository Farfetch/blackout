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
  taxSchema,
  totalRequiredSchema,
  totalSchema,
  valueSchema,
  wishlistIdSchema,
} from '../../shared/validation/eventSchemas';
import {
  EventTypes,
  InteractionTypes,
  PageTypes,
  SignupNewsletterGenderTypes,
} from '@farfetch/blackout-analytics';
import isElement from 'lodash/isElement';
import type { AnySchema } from 'yup';

// Error codes
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

const searchSchema = yup
  .object({
    searchTerm: yup.string(),
    searchQuery: yup.string(),
  })
  .test(
    'invalid_search_data',
    'The event, must have at least searchTerm or searchQuery properties.',
    value => !!value.searchQuery || !!value.searchTerm,
  );

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

const sortOptionSchema = yup.object({
  sortOption: yup.string().notRequired(),
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

const productUpdatedSchema = fromSchema.concat(productRequiredSchema).concat(
  yup.object({
    oldQuantity: yup.number(),
    quantity: yup.number(),
    oldSize: yup.string(),
    size: yup.string(),
    oldColour: yup.string(),
    colour: yup.string(),
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

const shippingMethodAddedSchema = checkoutShippingStepSchema;
const addressInfoAddedSchema = checkoutShippingStepSchema;
const interactContentSchema = yup
  .object({
    interactionType: yup
      .string()
      .test(
        'match_interaction_type',
        'The interactionType must match one of the built-in "InteractionTypes"',
        value =>
          (Object.values(InteractionTypes) as Array<string>).includes(
            value as string,
          ),
      ),
  })
  .test(
    'scroll_invalid_target_parameter',
    "invalid 'target' parameter for 'SCROLL' interaction type. It must be a DOM Element.",
    (value: Record<string, unknown>) => {
      if (value.interactionType === InteractionTypes.SCROLL) {
        return isElement(value.target);
      }

      return true;
    },
  )
  .test(
    'scroll_invalid_percentage_scrolled_parameter',
    "invalid 'percentageScrolled' parameter for 'SCROLL' interaction type. It must be a number representing a percentage between [0,100].",
    (value: Record<string, unknown>) => {
      if (value.interactionType === InteractionTypes.SCROLL) {
        return (
          typeof value.percentageScrolled === 'number' &&
          value.percentageScrolled >= 0 &&
          value.percentageScrolled <= 100
        );
      }

      return true;
    },
  );

const signupNewsletterSchemaGenderValidationList = {
  basic: yup.string().oneOf(Object.keys(SignupNewsletterGenderTypes)),
  multiple: yup
    .array()
    .of(yup.string().oneOf(Object.keys(SignupNewsletterGenderTypes))),
  complex: yup.array().of(
    yup.object({
      id: yup.string().oneOf(Object.keys(SignupNewsletterGenderTypes)),
      name: yup.string().notRequired(),
    }),
  ),
};

const signupNewsletterSchema = yup.object({
  gender: yup
    .mixed()
    .test(
      'gender_invalid_parameter',
      "invalid 'gender' parameter for 'sign_up newsletter' event type. It accepts string or array of strings, but only if one is of Gender Mappings valid value.",
      value => {
        const validationResult = (schema: AnySchema) => {
          try {
            schema.validateSync(value);

            return true;
          } catch (e) {
            return false;
          }
        };

        return Object.values(signupNewsletterSchemaGenderValidationList).some(
          validationResult,
        );
      },
    ),
});

const eventSchemas = {
  [EventTypes.CHECKOUT_ABANDONED]: checkoutAbandonedSchema,
  [EventTypes.CHECKOUT_STARTED]: beginCheckoutSchema,
  [EventTypes.ORDER_COMPLETED]: purchaseAndRefundSchema,
  [EventTypes.ORDER_REFUNDED]: purchaseAndRefundSchema,
  [EventTypes.PAYMENT_INFO_ADDED]: checkoutPaymentStepSchema,
  [EventTypes.PLACE_ORDER_STARTED]: placeOrderStartedSchema,
  [EventTypes.PRODUCT_ADDED_TO_CART]: manageProductInCartSchema,
  [EventTypes.PRODUCT_REMOVED_FROM_CART]: manageProductInCartSchema,
  [EventTypes.PRODUCT_ADDED_TO_WISHLIST]: manageProductInWishlistSchema,
  [EventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: manageProductInWishlistSchema,
  [EventTypes.PRODUCT_CLICKED]: selectItemSchema,
  [EventTypes.PRODUCT_LIST_VIEWED]: viewItemListSchema,
  [EventTypes.PRODUCT_VIEWED]: viewItemSchema,
  [EventTypes.PROMOCODE_APPLIED]: promocodeAppliedSchema,
  [EventTypes.SELECT_CONTENT]: selectContentSchema,
  [EventTypes.SHIPPING_INFO_ADDED]: shippingInfoAddedSchema,
  [PageTypes.BAG]: viewBagSchema,
  [PageTypes.SEARCH]: searchSchema,
  [PageTypes.WISHLIST]: viewWishlistSchema,
  [EventTypes.SHARE]: shareSchema,
  [EventTypes.CHECKOUT_STEP_EDITING]: checkoutStepEditingSchema,
  [EventTypes.ADDRESS_INFO_ADDED]: addressInfoAddedSchema,
  [EventTypes.SHIPPING_METHOD_ADDED]: shippingMethodAddedSchema,
  [EventTypes.PRODUCT_UPDATED]: productUpdatedSchema,
  [EventTypes.INTERACT_CONTENT]: interactContentSchema,
  [EventTypes.SIGNUP_NEWSLETTER]: signupNewsletterSchema,
};

export default eventSchemas;
