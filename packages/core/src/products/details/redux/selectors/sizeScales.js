// @TODO: Remove this file in version 2.0.0.
import { getProduct, getSizeScale } from '../../../../entities/redux/selectors';
import { getSizeScaleError, getSizeScaleIsLoading } from '../reducer';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../../package.json';
import { warnDeprecatedMethod } from '../../../../helpers';
import get from 'lodash/get';

/**
 * Returns the scale ID of the product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {number|undefined} Scale ID.
 */
export const getProductSizeScaleId = (state, id) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/products/details/redux/getProductSizeScaleId',
  );

  const product = getProduct(state, id);

  return get(product, 'scaleId');
};

/**
 * Returns the loading state of the size scale.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need a similar behavior, use the
 * '@farfetch/blackout-core/sizeScales/redux/isSizeScaleLoadingById' method instead.
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} The scale loading state.
 */
export const isProductSizeScaleLoading = (state, id) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/products/details/redux/isProductSizeScaleLoading',
    '@farfetch/blackout-core/sizeScales/redux/isSizeScaleLoadingById',
  );

  const scaleId = getProductSizeScaleId(state, id);

  return getSizeScaleIsLoading(state.details)[scaleId];
};

/**
 * Checks if a specific product size scale is already fetched.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need a similar behavior, use the
 * '@farfetch/blackout-core/sizeScales/redux/isSizeScaleFetched' method instead.
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} The status of the scale - If was already requested or not.
 */
export const isProductSizeScaleFetched = (state, id) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/products/details/redux/isProductSizeScaleFetched',
    '@farfetch/blackout-core/sizeScales/redux/isSizeScaleFetched',
  );

  const scaleId = getProductSizeScaleId(state, id);

  return getSizeScaleIsLoading(state.details).hasOwnProperty(scaleId);
};

/**
 * Returns a product size scale.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need a similar behavior, use the
 * '@farfetch/blackout-core/sizeScales/redux/getSizeScaleById' method instead.
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} The scale.
 */
export const getProductSizeScale = (state, id) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/products/details/redux/getProductSizeScale',
    '@farfetch/blackout-core/sizeScales/redux/getSizeScaleById',
  );

  const scaleId = getProductSizeScaleId(state, id);

  return getSizeScale(state, scaleId);
};

/**
 * Returns the error state of any size scale.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need a similar behavior, use the
 * '@farfetch/blackout-core/sizeScales/redux/getSizeScaleErrorById' method instead.
 *
 * @param {object} state - Application state.
 *
 * @returns {object} The sizescale error object.
 */
export const getProductSizeScaleError = state => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/products/details/redux/getProductSizeScaleError',
    '@farfetch/blackout-core/sizeScales/redux/getSizeScaleErrorById',
  );

  return getSizeScaleError(state.details);
};
