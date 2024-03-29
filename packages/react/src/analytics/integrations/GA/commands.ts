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
} from './constants.js';
import {
  type AnalyticsProduct,
  type EventData,
  EventType,
  type TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { get, isBoolean, map } from 'lodash-es';
import { validationSchemaBuilder } from '../shared/validation/eventSchemas.js';
import objectMapper from './objectMapper.js';
import type { ProductMappings } from './types/index.js';

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

const productMappingsByEvent: Record<string, ProductMappings> = {
  [EventType.ProductAddedToCart]: productAddRemoveCartMappings,
  [EventType.ProductRemovedFromCart]: productAddRemoveCartMappings,
  [EventType.ProductClicked]: productClickedMappings,
  [EventType.ProductViewed]: productViewedMappings,
  [EventType.ProductListViewed]: productImpressionMappings,
  [EventType.CheckoutStepViewed]: productBaseWithQtyAndPriceMappings,
  [EventType.OrderCompleted]: productBaseWithQtyAndPriceMappings,
  [EventType.OrderRefunded]: productWithIdAndQuantityMappings,
  [EventType.ProductAddedToWishlist]: productAddRemoveWishlistMappings,
  [EventType.ProductRemovedFromWishlist]: productAddRemoveWishlistMappings,
  [EventType.ProductUpdatedWishlist]: productAddRemoveWishlistMappings,
};

/**
 * Gets all the product mappings applicable for the specified event, merged with
 * the user specified product mappings.
 *
 * @param event                 - Event name.
 * @param customProductMappings - Product mappings specified by the user.
 *
 * @returns - An object with default product mappings for the event merged with the custom product
 * mappings, if specified.
 */
const getProductMappingsForEvent = (
  event: string,
  customProductMappings: ProductMappings,
): ProductMappings => {
  const eventProductMappings = productMappingsByEvent[event];

  const productMappings = {
    ...eventProductMappings,
    ...customProductMappings,
  };

  return productMappings;
};

/**
 * Convert the event product data to a new product data structure to be sent to GA
 * using the specified mappings.
 *
 * @param productData     - Event product data to be converted.
 * @param productMappings - Product mappings to be used by the conversion process.
 *
 * @returns Converted product data to be sent to GA.
 */
const getProductMapped = (
  productData: AnalyticsProduct,
  productMappings: ProductMappings,
): AnalyticsProduct => {
  return objectMapper(productData, productMappings);
};

/**
 * Gets a product event label to be sent to GA.
 *
 * @param productId   - Id of the product.
 * @param productName - Name of the product.
 *
 * @returns The event label to be sent in the event.
 */
const getProductEventLabel = (
  productId: string,
  productName: string,
): string => {
  return `${productId} - ${productName}`;
};

/**
 * Checks if there is the 'outOfStock' property on the product data payload. If it
 * exists, transform the boolean value into a '0' for the out of stock metric and
 * '1' for the inStock metric. These properties should always have opposite values.
 * If one has '0', the other one must have '1', and vice-versa.
 *
 * @param productData     - The product data for the event.
 * @param productData     - The product data for the event.
 * @param productMappings - Product mappings to be used by the conversion process.
 *
 * @returns The product data with the new stock related properties, if applied.
 */
const postProcessOutOfStockProduct = (
  productData: AnalyticsProduct,
  productMappings: ProductMappings,
): AnalyticsProduct => {
  const outOfStockMetricKey = get(
    productMappings,
    DEFAULT_OUT_OF_STOCK_METRIC_KEY,
  );
  const inStockMetricKey = get(productMappings, DEFAULT_IN_STOCK_METRIC_KEY);

  if (!outOfStockMetricKey || !inStockMetricKey) {
    return productData;
  }

  const hasOutOfStockProperty = productData.hasOwnProperty(
    outOfStockMetricKey as PropertyKey,
  );
  const outOfStockValue = productData[DEFAULT_OUT_OF_STOCK_METRIC];
  const isOutOfStockBoolean = isBoolean(outOfStockValue);

  if (hasOutOfStockProperty && isOutOfStockBoolean) {
    productData[DEFAULT_OUT_OF_STOCK_METRIC] = +outOfStockValue;
    productData[DEFAULT_IN_STOCK_METRIC] = +!outOfStockValue;
  }

  return productData;
};

/**
 * Calculates the cart value according to the operation and the quantity that is
 * being added/removed. If the product is being added, we need to multiply the
 * value for the quantity. If the product is being removed, we need to do the same
 * but set the value as negative, so it can be subtracted on the GA side properly.
 *
 * @see {@link https://www.simoahava.com/analytics/measure-cart-value-in-enhanced-ecommerce/}
 *
 * @param productData     - The product data for the event.
 * @param event           - The event being processed.
 * @param productMappings - Product mappings to be used by the conversion process.
 *
 * @returns The product data with the new stock related properties, if applied.
 */
const postProcessCartValue = (
  productData: AnalyticsProduct,
  event: keyof typeof productMappingsByEvent,
  productMappings: ProductMappings,
): AnalyticsProduct => {
  const cartValueMetric = get(
    productMappings,
    DEFAULT_CART_VALUE_METRIC_KEY,
  ) as string | undefined;

  if (!cartValueMetric) {
    return productData;
  }

  const productQuantity = get(productData, 'quantity') as number;
  const productPrice = get(productData, 'price') as number;

  switch (event) {
    case EventType.ProductAddedToCart: {
      productData[cartValueMetric] = productPrice * productQuantity;
      break;
    }

    case EventType.ProductRemovedFromCart: {
      productData[cartValueMetric] = -(productPrice * productQuantity);
      break;
    }
    default:
      break;
  }

  return productData;
};

const setCurrencyCommand = (data: EventData<TrackTypesValues>): string[] => {
  return ['set', 'currencyCode', utils.getCurrency(data)];
};

const setActionCommand = (
  action: string,
  params?: Record<string, string | number>,
) => {
  return [SET_ACTION_COMMAND, action, params];
};

const sendEventCommand = (
  eventCategory: string,
  eventAction: string,
  eventLabel: string,
): string[] => {
  return ['send', 'event', eventCategory, eventAction, eventLabel];
};

const addProductCommand = (productData: AnalyticsProduct) => {
  return [ADD_PRODUCT_COMMAND, productData];
};

const addImpressionCommand = (impressionData: AnalyticsProduct) => {
  return [ADD_IMPRESSION_COMMAND, impressionData];
};

const addImpressionsCommand = (
  list: string,
  products: AnalyticsProduct[],
  productMappings: ProductMappings,
) => {
  return map(products, (product: AnalyticsProduct) => {
    const productMapped = getProductMapped(product, productMappings);

    productMapped.list = list;

    return addImpressionCommand(productMapped);
  });
};

const addCheckoutProductsCommand = (
  products: AnalyticsProduct[],
  productMappings: ProductMappings,
) => {
  return map(products, product => {
    const productMapped = getProductMapped(product, productMappings);

    return addProductCommand(productMapped);
  });
};

const addRefundProductsCommand = (
  products: AnalyticsProduct[],
  productMappings: ProductMappings,
) => {
  return map(products, product => {
    const productMapped = getProductMapped(product, productMappings);

    return addProductCommand(productMapped);
  });
};

/**
 * GA commands map by event name.
 */

const commands = {
  [EventType.ProductAddedToCart]: (
    data: EventData<TrackTypesValues>,
    customProductMappings: ProductMappings,
  ) => {
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
        EventType.ProductAddedToCart,
        getProductEventLabel(
          utils.getProductId(productData) as string,
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [EventType.ProductRemovedFromCart]: (
    data: EventData<TrackTypesValues>,
    customProductMappings: ProductMappings,
  ) => {
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
        EventType.ProductRemovedFromCart,
        getProductEventLabel(
          utils.getProductId(productData) as string,
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [EventType.ProductAddedToWishlist]: (data: EventData<TrackTypesValues>) => {
    const productData = utils.getProperties(data);

    return [
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        `${EventType.ProductAddedToWishlist} - ${utils.getList(data)}`,
        getProductEventLabel(
          utils.getProductId(productData) as string,
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [EventType.ProductRemovedFromWishlist]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const productData = utils.getProperties(data);

    return [
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        `${EventType.ProductRemovedFromWishlist} - ${utils.getList(data)}`,
        getProductEventLabel(
          utils.getProductId(productData) as string,
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [EventType.ProductUpdatedWishlist]: (data: EventData<TrackTypesValues>) => {
    const productData = utils.getProperties(data);

    return [
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        utils.getList(data),
        getProductEventLabel(
          utils.getProductId(productData) as string,
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [EventType.ProductClicked]: (
    data: EventData<TrackTypesValues>,
    customProductMappings: ProductMappings,
  ) => {
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
        EventType.ProductClicked,
        getProductEventLabel(
          utils.getProductId(productData) as string,
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [EventType.ProductViewed]: (
    data: EventData<TrackTypesValues>,
    customProductMappings: ProductMappings,
  ) => {
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
        EventType.ProductViewed,
        getProductEventLabel(
          utils.getProductId(productData) as string,
          utils.getProductName(productData),
        ),
      ),
    ];
  },

  [EventType.ProductListViewed]: (
    data: EventData<TrackTypesValues>,
    customProductMappings: ProductMappings,
  ) => {
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
        EventType.ProductListViewed,
        list,
      ),
    ];
  },

  [EventType.CheckoutStepViewed]: (
    data: EventData<TrackTypesValues>,
    customProductMappings: ProductMappings,
  ) => {
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
        EventType.CheckoutStepViewed,
        `${checkoutProperties.step}`,
      ),
    ];
  },

  [EventType.CheckoutStepCompleted]: (data: EventData<TrackTypesValues>) => {
    const checkoutProperties = utils.getCheckoutProperties(data);

    return [
      setActionCommand('checkout_option', checkoutProperties),
      sendEventCommand(
        EVENT_CATEGORY_ECOMMERCE,
        EventType.CheckoutStepCompleted,
        `${checkoutProperties.step} - ${checkoutProperties.option}`,
      ),
    ];
  },

  [EventType.OrderCompleted]: (
    data: EventData<TrackTypesValues>,
    customProductMappings: ProductMappings,
  ) => {
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
        EventType.OrderCompleted,
        `${purchaseProperties.id}`,
      ),
    ];
  },

  [EventType.OrderRefunded]: (
    data: EventData<TrackTypesValues>,
    customProductMappings: ProductMappings,
  ) => {
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
        EventType.OrderRefunded,
        `${orderId}`,
      ),
    ];
  },
};

export default commands;

// Schema used to validate the output of command functions
export const commandListSchema = validationSchemaBuilder
  .array()
  .of(validationSchemaBuilder.array());

// List of default non-interaction events
export const nonInteractionEvents = {
  [EventType.ProductViewed]: true,
  [EventType.ProductListViewed]: true,
  [EventType.CheckoutStepViewed]: true,
};
