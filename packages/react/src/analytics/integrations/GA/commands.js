/**
 * @module commands
 * @private
 */

import {
  ADD_IMPRESSION_COMMAND,
  ADD_PRODUCT_COMMAND,
  DEFAULT_CART_VALUE_METRIC,
  DEFAULT_CART_VALUE_METRIC_KEY,
  DEFAULT_IN_STOCK_METRIC,
  DEFAULT_IN_STOCK_METRIC_KEY,
  DEFAULT_OUT_OF_STOCK_METRIC,
  DEFAULT_OUT_OF_STOCK_METRIC_KEY,
  EVENT_CATEGORY_ECOMMERCE,
  PRODUCT_CATEGORY_FIELD,
  SET_ACTION_COMMAND,
} from './constants';
import { eventTypes, utils } from '@farfetch/blackout-analytics';
import { validationSchemaBuilder } from '../shared/validation/eventSchemas';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import map from 'lodash/map';
import objectMapper from './objectMapper';

/**
 * Mappings.
 */
const productBaseMappings = {
  id: 'id',
  name: 'name',
  category: PRODUCT_CATEGORY_FIELD,
  brand: 'brand',
  variant: 'variant',
};

const productClickedMappings = {
  ...productBaseMappings,
  position: 'position',
  list: 'list',
  price: 'price',
};

const productAddRemoveCartMappings = {
  ...productBaseMappings,
  price: 'price',
  quantity: 'quantity',
  [DEFAULT_CART_VALUE_METRIC_KEY]: DEFAULT_CART_VALUE_METRIC,
};

const productAddRemoveWishlistMappings = {
  ...productBaseMappings,
  price: 'price',
};

const productImpressionMappings = {
  ...productBaseMappings,
  position: 'position',
  price: 'price',
  list: 'list',
};

const productBaseWithQtyAndPriceMappings = {
  ...productBaseMappings,
  price: 'price',
  quantity: 'quantity',
};

const productWithIdAndQuantityMappings = {
  id: 'id',
  quantity: 'quantity',
};

const productViewedMappings = {
  ...productBaseMappings,
  price: 'price',
  [DEFAULT_IN_STOCK_METRIC_KEY]: DEFAULT_IN_STOCK_METRIC,
  [DEFAULT_OUT_OF_STOCK_METRIC_KEY]: DEFAULT_OUT_OF_STOCK_METRIC,
};

const productMappingsByEvent = {
  [eventTypes.PRODUCT_ADDED_TO_CART]: productAddRemoveCartMappings,
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: productAddRemoveCartMappings,
  [eventTypes.PRODUCT_CLICKED]: productClickedMappings,
  [eventTypes.PRODUCT_VIEWED]: productViewedMappings,
  [eventTypes.PRODUCT_LIST_VIEWED]: productImpressionMappings,
  [eventTypes.CHECKOUT_STEP_VIEWED]: productBaseWithQtyAndPriceMappings,
  [eventTypes.ORDER_COMPLETED]: productBaseWithQtyAndPriceMappings,
  [eventTypes.ORDER_REFUNDED]: productWithIdAndQuantityMappings,
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: productAddRemoveWishlistMappings,
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: productAddRemoveWishlistMappings,
  [eventTypes.PRODUCT_UPDATED_WISHLIST]: productAddRemoveWishlistMappings,
};

/**
 * Gets all the product mappings applicable for the specified event, merged with the user specified product mappings.
 *
 * @param {string} event - Event name.
 * @param {object} customProductMappings - Product mappings specified by the user.
 *
 * @returns {object} - An object with default product mappings for the event merged with the custom product mappings, if specified.
 */
const getProductMappingsForEvent = (event, customProductMappings) => {
  const eventProductMappings = productMappingsByEvent[event];

  const productMappings = {
    ...eventProductMappings,
    ...customProductMappings,
  };

  return productMappings;
};

/**
 * Convert the event product data to a new product data structure to be sent to GA using the specified mappings.
 *
 * @param {object} productData - Event product data to be converted.
 * @param {object} productMappings - Product mappings to be used by the conversion process.
 *
 * @returns {object} - Converted product data to be sent to GA.
 */
const getProductMapped = (productData, productMappings) => {
  return objectMapper(productData, productMappings);
};

/**
 * Gets a product event label to be sent to GA.
 *
 * @param {string} productId - Id of the product.
 * @param {string} productName - Name of the product.
 *
 * @returns {string} - The event label to be sent in the event.
 */
const getProductEventLabel = (productId, productName) => {
  return `${productId} - ${productName}`;
};

/**
 * Checks if there is the 'outOfStock' property on the product data payload.
 * If it exists, transform the boolean value into a '0' for the out of stock metric and '1' for the inStock metric.
 * These properties should always have oposite values. If one has '0', the other one must have '1', and vice-versa.
 *
 * @param {object} productData - The product data for the event.
 * @param {object} productMappings - Product mappings to be used by the conversion process.
 *
 * @returns {object} - The product data with the new stock related properties, if applied.
 */
const postProcessOutOfStockProduct = (productData, productMappings) => {
  const outOfStockMetricKey = get(
    productMappings,
    DEFAULT_OUT_OF_STOCK_METRIC_KEY,
  );
  const inStockMetricKey = get(productMappings, DEFAULT_IN_STOCK_METRIC_KEY);

  if (!outOfStockMetricKey || !inStockMetricKey) {
    return productData;
  }

  const hasOutOfStockProperty = productData.hasOwnProperty(outOfStockMetricKey);
  const outOfStockValue = productData[DEFAULT_OUT_OF_STOCK_METRIC];
  const isOutOfStockBoolean = isBoolean(outOfStockValue);

  if (hasOutOfStockProperty && isOutOfStockBoolean) {
    productData[DEFAULT_OUT_OF_STOCK_METRIC] = +outOfStockValue;
    productData[DEFAULT_IN_STOCK_METRIC] = +!outOfStockValue;
  }

  return productData;
};

/**
 * Calculates the cart value according to the operation and the quantity that is being added/removed.
 * If the product is being added, we need to multiply the value for the quantity.
 * If the product is being removed, we need to do the same but set the value as negative, so it can be subtracted on the GA side properly.
 *
 * @see https://www.simoahava.com/analytics/measure-cart-value-in-enhanced-ecommerce/
 *
 * @param {object} productData - The product data for the event.
 * @param {string} event - The event being processed.
 * @param {object} productMappings - Product mappings to be used by the conversion process.
 *
 * @returns {object} - The product data with the new stock related properties, if applied.
 */
const postProcessCartValue = (productData, event, productMappings) => {
  const cartValueMetric = get(productMappings, DEFAULT_CART_VALUE_METRIC_KEY);

  if (!cartValueMetric) {
    return productData;
  }

  const productQuantity = get(productData, 'quantity');
  const productPrice = get(productData, 'price');

  switch (event) {
    case eventTypes.PRODUCT_ADDED_TO_CART: {
      productData[cartValueMetric] = productPrice * productQuantity;
      break;
    }

    case eventTypes.PRODUCT_REMOVED_FROM_CART: {
      productData[cartValueMetric] = -(productPrice * productQuantity);
      break;
    }
    default:
      break;
  }

  return productData;
};

const setCurrencyCommand = data => {
  return ['set', 'currencyCode', utils.getCurrency(data)];
};

const setActionCommand = (action, params) => {
  return [SET_ACTION_COMMAND, action, params];
};

const sendEventCommand = (eventCategory, eventAction, eventLabel) => {
  return ['send', 'event', eventCategory, eventAction, eventLabel];
};

const addProductCommand = productData => {
  return [ADD_PRODUCT_COMMAND, productData];
};

const addImpressionCommand = impressionData => {
  return [ADD_IMPRESSION_COMMAND, impressionData];
};

const addImpressionsCommand = (list, products, productMappings) => {
  return map(products, product => {
    const productMapped = getProductMapped(product, productMappings);
    productMapped.list = list;
    return addImpressionCommand(productMapped);
  });
};

const addCheckoutProductsCommand = (products, productMappings) => {
  return map(products, product => {
    const productMapped = getProductMapped(product, productMappings);
    return addProductCommand(productMapped);
  });
};

const addRefundProductsCommand = (products, productMappings) => {
  return map(products, product => {
    const productMapped = getProductMapped(product, productMappings);
    return addProductCommand(productMapped);
  });
};

/**
 * GA commands map by event name.
 */
export default {
  [eventTypes.PRODUCT_ADDED_TO_CART]: (data, customProductMappings) => {
    const event = utils.getEvent(data);
    const productData = utils.getProperties(data);
    const productMappings = getProductMappingsForEvent(
      event,
      customProductMappings,
    );

    const productMapped = getProductMapped(productData, productMappings);
    const postProcessedProductMapped = postProcessCartValue(
      productMapped,
      event,
      productMappings,
    );

    return [
      setCurrencyCommand(data),
      addProductCommand(postProcessedProductMapped),
      setActionCommand('add'),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.PRODUCT_ADDED_TO_CART,
        getProductEventLabel(
          utils.getProductId(productData),
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [eventTypes.PRODUCT_REMOVED_FROM_CART]: (data, customProductMappings) => {
    const event = utils.getEvent(data);
    const productData = utils.getProperties(data);
    const productMappings = getProductMappingsForEvent(
      event,
      customProductMappings,
    );

    const productMapped = getProductMapped(productData, productMappings);
    const postProcessedProductMapped = postProcessCartValue(
      productMapped,
      event,
      productMappings,
    );

    return [
      setCurrencyCommand(data),
      addProductCommand(postProcessedProductMapped),
      setActionCommand('remove'),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.PRODUCT_REMOVED_FROM_CART,
        getProductEventLabel(
          utils.getProductId(productData),
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: data => {
    const productData = utils.getProperties(data);

    return [
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        `${eventTypes.PRODUCT_ADDED_TO_WISHLIST} - ${utils.getList(data)}`,
        getProductEventLabel(
          utils.getProductId(productData),
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: data => {
    const productData = utils.getProperties(data);

    return [
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        `${eventTypes.PRODUCT_REMOVED_FROM_WISHLIST} - ${utils.getList(data)}`,
        getProductEventLabel(
          utils.getProductId(productData),
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [eventTypes.PRODUCT_UPDATED_WISHLIST]: data => {
    const productData = utils.getProperties(data);

    return [
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        utils.getList(data),
        getProductEventLabel(
          utils.getProductId(productData),
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [eventTypes.PRODUCT_CLICKED]: (data, customProductMappings) => {
    const event = utils.getEvent(data);
    const productData = utils.getProperties(data);
    const productMappings = getProductMappingsForEvent(
      event,
      customProductMappings,
    );
    const productMapped = getProductMapped(productData, productMappings);

    return [
      setCurrencyCommand(data),
      addProductCommand(productMapped),
      setActionCommand('click', { list: utils.getList(data) }),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.PRODUCT_CLICKED,
        getProductEventLabel(
          utils.getProductId(productData),
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [eventTypes.PRODUCT_VIEWED]: (data, customProductMappings) => {
    const event = utils.getEvent(data);
    const productData = utils.getProperties(data);
    const productMappings = getProductMappingsForEvent(
      event,
      customProductMappings,
    );

    const productMapped = getProductMapped(productData, productMappings);
    const postProcessedProductMapped = postProcessOutOfStockProduct(
      productMapped,
      productMappings,
    );

    return [
      setCurrencyCommand(data),
      addProductCommand(postProcessedProductMapped),
      setActionCommand('detail'),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.PRODUCT_VIEWED,
        getProductEventLabel(
          utils.getProductId(productData),
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [eventTypes.PRODUCT_LIST_VIEWED]: (data, customProductMappings) => {
    const event = utils.getEvent(data);
    const products = utils.getProducts(data);
    const productMappings = getProductMappingsForEvent(
      event,
      customProductMappings,
    );
    const list = utils.getList(data);

    return [
      setCurrencyCommand(data),
      ...addImpressionsCommand(list, products, productMappings),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.PRODUCT_LIST_VIEWED,
        list,
      ),
    ];
  },

  [eventTypes.CHECKOUT_STEP_VIEWED]: (data, customProductMappings) => {
    const event = utils.getEvent(data);
    const products = utils.getProducts(data);
    const productMappings = getProductMappingsForEvent(
      event,
      customProductMappings,
    );
    const checkoutProperties = utils.getCheckoutProperties(data);

    return [
      setCurrencyCommand(data),
      ...addCheckoutProductsCommand(products, productMappings),
      setActionCommand('checkout', checkoutProperties),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.CHECKOUT_STEP_VIEWED,
        `${checkoutProperties.step}`,
      ),
    ];
  },

  [eventTypes.CHECKOUT_STEP_COMPLETED]: data => {
    const checkoutProperties = utils.getCheckoutProperties(data);

    return [
      setActionCommand('checkout_option', checkoutProperties),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.CHECKOUT_STEP_COMPLETED,
        `${checkoutProperties.step} - ${checkoutProperties.option}`,
      ),
    ];
  },

  [eventTypes.ORDER_COMPLETED]: (data, customProductMappings) => {
    const event = utils.getEvent(data);
    const products = utils.getProducts(data);
    const productMappings = getProductMappingsForEvent(
      event,
      customProductMappings,
    );

    const purchaseProperties = utils.getPurchaseProperties(data);

    return [
      setCurrencyCommand(data),
      ...addCheckoutProductsCommand(products, productMappings),
      setActionCommand('purchase', purchaseProperties),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.ORDER_COMPLETED,
        `${purchaseProperties.id}`,
      ),
    ];
  },

  [eventTypes.ORDER_REFUNDED]: (data, customProductMappings) => {
    const orderId = utils.getOrderId(data);
    const products = utils.getProducts(data);
    const event = utils.getEvent(data);
    const productMappings = getProductMappingsForEvent(
      event,
      customProductMappings,
    );

    return [
      ...addRefundProductsCommand(products, productMappings),
      setActionCommand('refund', { id: orderId }),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        eventTypes.ORDER_REFUNDED,
        `${orderId}`,
      ),
    ];
  },
};

// Schema used to validate the output of command functions
export const commandListSchema = validationSchemaBuilder
  .array()
  .of(validationSchemaBuilder.array());

// List of default non-interaction events
export const nonInteractionEvents = {
  [eventTypes.PRODUCT_VIEWED]: true,
  [eventTypes.PRODUCT_LIST_VIEWED]: true,
  [eventTypes.CHECKOUT_STEP_VIEWED]: true,
};
