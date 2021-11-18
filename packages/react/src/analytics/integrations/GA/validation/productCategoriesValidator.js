/**
 * @module productCategoriesValidator
 * @private
 */

import {
  ADD_IMPRESSION_COMMAND,
  ADD_PRODUCT_COMMAND,
  MAX_PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_FIELD,
} from '../constants';
import { utils } from '@farfetch/blackout-core/analytics';
import get from 'lodash/get';

/**
 * Gets the category hierarchy for a product category field.
 *
 * @param {string} productCategoryField  - String corresponding to the category field found of a product added in ec:addProduct or ec:addImpression commands.
 *
 * @returns {Array}                      - An array containing the category hierarchy.
 */
function getCategoryHierarchy(productCategoryField) {
  return productCategoryField.split('/');
}

/**
 * Validates if the category field of a product added in ec:addProduct or in ec:addImpression commands does
 * not exceed the maximum number of levels for the category hierarchy. A category hierarchy is a string
 * where each category is separated by a / character.
 * If the validation fails, only a warn message is logged.
 *
 * @param {Array<Array>} gaCommandList - Command list that will feed the window.ga function.
 */
function productCategoriesValidator(gaCommandList) {
  if (!gaCommandList) {
    return;
  }

  gaCommandList.forEach(command => {
    const [commandName, commandArgument] = command;

    if (
      commandName === ADD_IMPRESSION_COMMAND ||
      commandName === ADD_PRODUCT_COMMAND
    ) {
      const productData = commandArgument;
      const productCategoryField = get(productData, PRODUCT_CATEGORY_FIELD);

      if (productCategoryField) {
        if (typeof productCategoryField === 'string') {
          const categoryHierarchy = getCategoryHierarchy(productCategoryField);

          if (categoryHierarchy.length > MAX_PRODUCT_CATEGORIES) {
            utils.logger.warn(
              `[GA] - Product category hierarchy '${productCategoryField}' exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GA only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
            );
          }
        } else {
          utils.logger.warn(
            `[GA] - Product category field must be a string but got a ${typeof productCategoryField} with value ${productCategoryField}.`,
          );
        }
      }
    }
  });
}

export default productCategoriesValidator;
