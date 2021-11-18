// @TODO: remove this file in the next version
/**
 * @module products/utils
 * @category Products
 * @subcategory Utils
 */
import { name as PCKG_NAME, version as PCKG_VERSION } from '../../package.json';
import { warnDeprecatedMethod } from '../helpers';
import get from 'lodash/get';

/**
 * Sort the size stocks by preferedMerchant + other merchants.
 * Also this removes stocks without quantity available.
 *
 * @deprecated Since version 1.10.1. Will be deleted in version 2.0.0.
 * This method is no longer needed because the size stocks already comes sorted.
 *
 * @function
 *
 * @param {object} product - The product to be added to the bag or wishlist.
 * @param {object} size - The specific size to be added.
 *
 * @returns {Array} The size stocks sorted with the preferedMerchant in first
 *  place.
 */
export const sortStocksByPreferedMerchant = (product, size) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'sortStocksByPreferedMerchant',
  );
  // Gets the prefered merchant from the product
  const preferedMerchant = get(product, 'preferedMerchant.merchantId');
  // Gets all the information about the size received
  const sizeHydrated = product.sizes.find(({ id }) => id === size.id);
  // Find if the stocks from the size received contains the preferedMerchant
  const stockPreferedMerchant = sizeHydrated.stock.find(
    ({ merchantId }) => merchantId === preferedMerchant,
  );
  // The default return is all the stocks available
  let sizeStocks = sizeHydrated.stock;

  // If the preferedMerchant exists in the stocks, should be the first stocks used.
  if (stockPreferedMerchant) {
    const stockWithoutPreferedMerchant = sizeHydrated.stock.filter(
      ({ merchantId }) => merchantId !== preferedMerchant,
    );

    sizeStocks = [stockPreferedMerchant, ...stockWithoutPreferedMerchant];
  }

  // Finally, we remove the stocks without quantity
  return sizeStocks.filter(stock => !!stock.quantity);
};
