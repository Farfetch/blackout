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
  eventTypes,
  interactionTypes,
  pageTypes,
} from '@farfetch/blackout-core/analytics';
import { SignupNewsletterGenderMappings } from '../../shared/dataMappings/';
import isElement from 'lodash/isElement';

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

const isMainWishlistSchema = yup.object({
  isMainWishlist: yup.boolean().notRequired(),
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

const manageProductInWishlistSchema = manageProductInCartSchema
  .concat(wishlistIdSchema)
  .concat(isMainWishlistSchema);

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
    contentName: yup.string(),
    contentType: yup.string(),
    interactionType: yup
      .string()
      .test(
        'match_interaction_type',
        'The interactionType must match one of the built-in "interationTypes"',
        value => Object.values(interactionTypes).includes(value),
      ),
  })
  .test(
    'scroll_invalid_target_parameter',
    "invalid 'target' parameter for 'SCROLL' interaction type. It must be a DOM Element.",
    value => {
      if (
        value.interactionType === interactionTypes.SCROLL &&
        !value.contentType &&
        !value.elementType
      ) {
        return isElement(value.target);
      }

      return true;
    },
  )
  .test(
    'scroll_invalid_percentage_scrolled_parameter',
    "invalid 'percentageScrolled' parameter for 'SCROLL' interaction type. It must be a number representing a percentage between [0,100].",
    value => {
      if (
        value.interactionType === interactionTypes.SCROLL &&
        !value.contentType &&
        !value.elementType
      ) {
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
  basic: yup.string().oneOf(Object.keys(SignupNewsletterGenderMappings)),
  multiple: yup
    .array()
    .of(yup.string().oneOf(Object.keys(SignupNewsletterGenderMappings))),
  complex: yup.array().of(
    yup.object({
      id: yup.string().oneOf(Object.keys(SignupNewsletterGenderMappings)),
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
        const validationResult = schema => {
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
  [eventTypes.CHECKOUT_STEP_EDITING]: checkoutStepEditingSchema,
  [eventTypes.ADDRESS_INFO_ADDED]: addressInfoAddedSchema,
  [eventTypes.SHIPPING_METHOD_ADDED]: shippingMethodAddedSchema,
  [eventTypes.PRODUCT_UPDATED]: productUpdatedSchema,
  [eventTypes.INTERACT_CONTENT]: interactContentSchema,
  [eventTypes.SIGNUP_NEWSLETTER]: signupNewsletterSchema,
};
