import { generateProductListingHash, getSlug } from '../utils/index.js';
import { get, isEmpty } from 'lodash-es';
import { INITIAL_STATE } from '../reducer/lists.js';
import { normalize } from 'normalizr';
import { toBlackoutError } from '@farfetch/blackout-client';
import parse from 'url-parse';
import productsList from '../../entities/schemas/productsList.js';
import type { ProductListingsServerInitialState } from './types/index.js';

/**
 * Converts server data for a product list (listing or sets) to store state.
 *
 * @param data - Params injected by the server.
 *
 * @returns Initial state for the products lists reducer.
 */
const serverInitialState: ProductListingsServerInitialState = ({
  model,
  options: { productImgQueryParam } = {},
}) => {
  const { slug } = model;
  const { pathname, query } = parse(slug, true);
  // Remove CDN required `json=true` param from query which breaks our
  // selectors and causes SSR de-optimization

  delete query.json;

  const dataLayerType = model?.dataLayer?.general?.type;
  const isListing = dataLayerType === 'Listing';
  const isCustomListingPage = !isEmpty(
    model?.relatedCommerceData?.referencedListing,
  );

  const builtSlug = getSlug(pathname, isCustomListingPage);
  const isSetFallback = /\/sets\//.test(pathname) && isListing;
  const isSet = model?.pageType === 'set' || isSetFallback;
  const hash = generateProductListingHash(builtSlug, query, {
    isSet,
  });
  const referencedListing = get(model, 'relatedCommerceData.referencedListing');

  if (referencedListing && referencedListing.length) {
    const {
      breadCrumbs,
      config,
      didYouMean,
      facetGroups,
      facetsBaseUrl,
      filterSegments,
      gender,
      genderName,
      name,
      products,
      redirectInformation,
      searchTerm,
    } = model.relatedCommerceData?.referencedListing?.[0];

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
        productListingFacets: {
          isLoading: false,
          error: null,
          result: [],
        },
      },
      entities,
    };
  }

  if (!get(model, 'products')) {
    if (isListing) {
      const error = toBlackoutError({});

      error.status = 400;

      return {
        lists: {
          error: {
            [hash]: error,
          },
          hash,
          isHydrated: {
            [hash]: true,
          },
          isLoading: {
            [hash]: false,
          },
          productListingFacets: {
            error: null,
            isLoading: false,
            result: [],
          },
        },
      };
    }

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
  } = model;

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
      productListingFacets: {
        isLoading: false,
        error: null,
        result: [],
      },
    },
    entities,
  };
};

export default serverInitialState;
