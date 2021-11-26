import { INITIAL_STATE as ATTRIBUTES_INITIAL_STATE } from '../reducer/attributes';
import { INITIAL_STATE as COLOR_GROUPING_INITIAL_STATE } from '../reducer/colorGrouping';
import { INITIAL_STATE as DETAILS_INITIAL_STATE } from '../reducer/details';
import { INITIAL_STATE as FITTINGS_INITIAL_STATE } from '../reducer/fittings';
import { INITIAL_STATE as MEASUREMENTS_INITIAL_STATE } from '../reducer/measurements';
import { normalize } from 'normalizr';
import { INITIAL_STATE as SIZE_GUIDES_INITIAL_STATE } from '../reducer/sizeGuides';
import { INITIAL_STATE as SIZES_INITIAL_STATE } from '../reducer/sizes';
import { INITIAL_STATE as VARIANTS_BY_MERCHANTS_LOCATIONS_INITIAL_STATE } from '../reducer/variantsByMerchantsLocations';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import productSchema from '../../entities/schemas/product';
import type { Model, StoreState } from '../../types';

/**
 * Converts server data for details of a product to store state.
 *
 * @memberof module:products/reducer
 *
 * @param {object} data - Params injected by the server.
 * @param {object} data.model - Page model with product details data.
 * @param {object} data.options - General options for any modification.
 * @param {object} data.options.productImgQueryParam - Query parameter to be
 * appended to each product image URL.
 *
 * @returns {object} Initial state for the product details reducer.
 */
const serverInitialState = ({
  model,
  options: { productImgQueryParam } = {},
}: {
  model: Model;
  options?: { productImgQueryParam?: string };
}): {
  attributes: StoreState['products']['attributes'];
  colorGrouping: StoreState['products']['colorGrouping'];
  details: StoreState['products']['details'];
  entities?: StoreState['entities'];
  fittings: StoreState['products']['fittings'];
  measurements: StoreState['products']['measurements'];
  sizeGuides: StoreState['products']['sizeGuides'];
  sizes: StoreState['products']['sizes'];
  variantsByMerchantsLocations: StoreState['products']['variantsByMerchantsLocations'];
} => {
  // Check if a model object is of a product detail page (type === 'Product')
  // - if not, do nothing
  if (isEmpty(model) || get(model, 'dataLayer.general.type') !== 'Product') {
    return {
      attributes: ATTRIBUTES_INITIAL_STATE,
      colorGrouping: COLOR_GROUPING_INITIAL_STATE,
      details: DETAILS_INITIAL_STATE,
      fittings: FITTINGS_INITIAL_STATE,
      measurements: MEASUREMENTS_INITIAL_STATE,
      sizeGuides: SIZE_GUIDES_INITIAL_STATE,
      sizes: SIZES_INITIAL_STATE,
      variantsByMerchantsLocations:
        VARIANTS_BY_MERCHANTS_LOCATIONS_INITIAL_STATE,
    };
  }

  // Only passing specifically the properties that we see fit,
  // instead of spreading everything and end up with unnecessary data that
  // will only increase the payload/store.
  const {
    breadCrumbs,
    colorSet,
    colorSwatch,
    complementaryInformation,
    imageGroups,
    liveModel,
    price,
    productAttributes,
    productRef,
    productSize,
    recommendedSet,
    relatedSets,
    result: productData,
    scaleId,
    sizes,
    sizeSet,
    slug,
  } = model;
  const productInfo = {
    // Send this to the entity's `adaptProductImages`
    productImgQueryParam,
    // Data needed to support product information
    attributes: productAttributes,
    breadCrumbs,
    colorSet,
    colorSwatch,
    complementaryInformation,
    imageGroups,
    liveModel,
    price,
    productRef,
    productSize,
    recommendedSet,
    relatedSets,
    // @ts-expect-error scaleId is duplicated on product payload
    scaleId,
    sizes,
    sizeSet,
    slug,
    ...productData,
    // The model already brings a `measurements` entry,
    // which is different from the
    // '/api/products/{id}/variantsMeasurements' response.
    // Thus, we need to override it since it'll always be requested async.
    measurements: undefined,
  };
  const { result: id, entities } = normalize(productInfo, productSchema);

  return {
    attributes: {
      error: {},
      isLoading: {
        [id]: false,
      },
    },
    colorGrouping: {
      error: {},
      isLoading: {
        [id]: false,
      },
    },
    details: {
      error: {},
      id,
      isHydrated: {
        [id]: true,
      },
      isLoading: {
        [id]: false,
      },
    },
    entities,
    fittings: {
      error: {},
      isLoading: {
        [id]: false,
      },
    },
    measurements: {
      error: {},
      isLoading: {},
    },
    sizeGuides: {
      error: {},
      isLoading: {
        [id]: false,
      },
    },
    sizes: {
      error: {},
      isLoading: {
        [id]: false,
      },
    },
    variantsByMerchantsLocations: {
      error: {},
      isLoading: {
        [id]: false,
      },
    },
  };
};

export default serverInitialState;
