import { buildListingHash, getSlug } from '../utils';
import { INITIAL_STATE } from './reducer';
import { normalize } from 'normalizr';
import get from 'lodash/get';
import parse from 'url-parse';
import searchResult from '../../../entities/schemas/searchResult';

/**
 * Converts server data for a listing to store state.
 *
 * @function serverInitialState
 * @memberof module:products/listing/reducer
 *
 * @param {object} data - Params injected by the server.
 * @param {object} data.model - Page model with listing data.
 * @param {object} data.options - General options for any modification.
 * @param {object} data.options.productImgQueryParam - Query parameter to be
 * appended to each product image URL.
 *
 * @returns {object} Initial state for the product listing reducer.
 */
export default ({ model, options: { productImgQueryParam } = {} }) => {
  if (!get(model, 'products')) {
    return { listing: { ...INITIAL_STATE } };
  }

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
    subfolder,
  } = model;
  const { pathname, query } = parse(slug, true);

  // Remove CDN required `json=true` param from query which breaks our
  // selectors and causes SSR de-optimization
  delete query.json;

  const builtSlug = getSlug(pathname);
  const hash = buildListingHash(subfolder, builtSlug, query);
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
    searchResult,
  );

  return {
    listing: {
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
