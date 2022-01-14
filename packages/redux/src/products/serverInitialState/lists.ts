import { generateProductsListHash, getSlug } from '../utils';
import { INITIAL_STATE } from '../reducer/lists';
import { normalize } from 'normalizr';
import get from 'lodash/get';
import parse from 'url-parse';
import productsList from '../../entities/schemas/productsList';
import type { ListsServerInitialState } from './types';

/**
 * Converts server data for a products list (listing or sets) to store state.
 *
 * @memberof module:products/serverInitialState
 *
 * @param {object} data - Params injected by the server.
 * @param {object} data.model - Page model with products list (listing or sets)
 * data.
 * @param {object} data.options - General options for any modification.
 * @param {object} data.options.productImgQueryParam - Query parameter to be
 * appended to each product image URL.
 *
 * @returns {object} Initial state for the products lists reducer.
 */
const serverInitialState: ListsServerInitialState = ({
  model,
  options: { productImgQueryParam } = {},
}) => {
  if (!get(model, 'products')) {
    return { lists: INITIAL_STATE };
  }

  // Only passing specifically the properties that we see fit,
  // instead of spreading everything and end up with unnecessary data that
  // will only increase the payload/store.
  const {
    breadCrumbs,
    config,
    didYouMean,
    facetGroups,
    facetsBaseUrl,
    filterSegments,
    gender,
    genderName,
    id,
    name,
    products,
    redirectInformation,
    searchTerm,
    slug,
  } = model;
  const { pathname, query } = parse(slug, true);
  // Remove CDN required `json=true` param from query which breaks our
  // selectors and causes SSR de-optimization
  delete query.json;

  const builtSlug = getSlug(pathname);
  const isSet = model?.pageType === 'sets';
  const hash = generateProductsListHash(builtSlug, query, { isSet });

  // Normalize it
  const { entities } = normalize(
    {
      breadCrumbs,
      config,
      didYouMean,
      facetGroups,
      facetsBaseUrl,
      filterSegments,
      gender,
      genderName,
      hash,
      id,
      name,
      productImgQueryParam, // Send this to the entity's `adaptProductImages`
      products,
      redirectInformation,
      searchTerm,
      slug,
    },
    productsList,
  );

  return {
    lists: {
      error: {},
      hash,
      isHydrated: {
        [hash]: true,
      },
      isLoading: {
        [hash]: false,
      },
    },
    entities,
  };
};

export default serverInitialState;
