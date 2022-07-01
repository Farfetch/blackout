/**
 * Hook to provide all kinds of data for the business logic attached to the search
 * functionality (search intents).
 */
import {
  areSearchIntentsLoading,
  buildQueryStringFromObject,
  buildSetFiltersQueryParams,
  fetchSearchIntents as fetchSearchIntentsAction,
  getSearchIntentsError,
  getSearchIntentsResult,
  resetSearchIntents as resetSearchIntentsAction,
} from '@farfetch/blackout-redux';
import {
  SearchIntentsResource,
  SearchIntentsTypeFilter,
  SearchIntentsTypeRequest,
} from '@farfetch/blackout-client';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import urlJoin from 'proper-url-join';
import type { GetSearchRedirectUrl, UseSearchIntents } from './types';

const DEFAULT_BASE_URL = '/shopping';

/*
 * This is not related to the endpoint response, but it's our recommendation
 * about the order to construct the slugs to redirect the user to a more
 * specific page.
 * The recommendation is create the slug firstly with the gender, followed by
 * the brands and with categories in the end.
 */
const FILTER_SLUGS_ORDER = [
  SearchIntentsTypeFilter.Gender,
  SearchIntentsTypeFilter.Brands,
  SearchIntentsTypeFilter.Categories,
];

/**
 * Gets the URL to redirect according to the search intents result. In a nutshell,
 * the logic is based on types:
 *
 * <ul>
 *    <li><b>Redirect:</b> not much to say, redirect to the received url;</li>
 *    <li><b>Product:</b> builds the url for the respective product's PDP;</li>
 *    <li><b>Listing:</b> builds the url, with the correct slugs, for the
 *    respective listing.</li>
 * </ul>.
 *
 * @param searchIntents - Search intents result.
 * @param baseUrl       - Base url to prepend to the final redirect url.
 *
 * @returns The URL to redirect the user into.
 */
const getSearchRedirectUrl: GetSearchRedirectUrl = (searchIntents, baseUrl) => {
  if (!searchIntents) {
    return;
  }

  const {
    typeRequest,
    redirectUrl,
    resources: originalResources,
  } = searchIntents;
  // Prevent mutation on the original resources
  const resources = originalResources ? [...originalResources] : [];

  switch (typeRequest) {
    // If the typeRequest is of the type "Redirect", automatically redirects to the url received.
    case SearchIntentsTypeRequest.Redirect:
      return `/${redirectUrl}`;
    // If the typeRequest is of the type "Product", automatically redirects to the pdp of the product received, by slug.
    case SearchIntentsTypeRequest.Product: {
      const productSlug = resources[0]?.values[0]?.slug;

      return `${baseUrl}/${productSlug}`;
    }
    // If the typeRequest is of the type "Listing", automatically redirects to a specific listing according the resources received.
    case SearchIntentsTypeRequest.Listing: {
      const resourcesWithSlug: SearchIntentsResource[] = [];

      // If the resources are possible to transform in slug - they have to follow a
      // specific construction order: Gender (3) / Brand (1) / Category (2)
      FILTER_SLUGS_ORDER.forEach(filterSlugType => {
        // To transform a resource into a slug is necessary that resource only have 1 value associated with slug and the filter type should be
        // one of these types: Gender (3), brand (1) or category (2) (FILTER_SLUGS_ORDER).
        // All resources found of this type are passed to an array named resourcesWithSlug
        // and are removed from the initial array resources, to ensure that they will no longer be used.
        const filteredIndex = resources.findIndex(
          ({ typeFilter, values }) =>
            typeFilter === filterSlugType &&
            values.length <= 1 &&
            values[0]?.slug,
        );
        if (filteredIndex !== -1) {
          // If found, add the resource to the resourcesWithSlug array.
          resourcesWithSlug.push(
            resources[filteredIndex] as SearchIntentsResource,
          );
          // If found, remove the resource from the original array.
          resources.splice(filteredIndex, 1);
        }
      });

      // If exist slugs is necessary to construct a URL with all the slugs associated.
      const slugsUrl = resourcesWithSlug
        ?.map(({ values }) => values.map(({ slug }: { slug: string }) => slug))
        .join('/');

      // With the remaining resources we have to transform them in queryParams, like {'categories': [123,456]}
      const queryParams = resources.reduce<Record<string, string[]>>(
        (acc, { typeFilter, values }) => {
          // Find the typeFilter of the resource, like Categories
          const queryParam = Object.entries(SearchIntentsTypeFilter).find(
            type => type[1] === typeFilter,
          );
          const queryValues = values.map(({ value }) => value);
          const queryKey =
            // If the typeFilter is 10(Text) should be treated as a query.
            // Otherwise the queryParam found before (Categories) should be used.
            typeFilter !== SearchIntentsTypeFilter.Text
              ? queryParam?.[0].toLowerCase()
              : 'query';

          if (queryKey) {
            acc[queryKey] = queryValues;
          }

          return acc;
        },
        {},
      );

      // With this util we transform all the queryParams in a queryString
      const filtersQueryParams = buildSetFiltersQueryParams({}, queryParams);
      const queryString = buildQueryStringFromObject(filtersQueryParams);

      // Finally we navigate to a specific listing
      return urlJoin(baseUrl, slugsUrl, queryString);
    }
    default:
      return;
  }
};

/**
 * @param baseUrl - Base url to prepend to the final redirect url. Defaults to
 *                  <code>'/shopping'</code>.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage a search request.
 */
const useSearchIntents: UseSearchIntents = (baseUrl = DEFAULT_BASE_URL) => {
  const error = useSelector(getSearchIntentsError);
  const isLoading = useSelector(areSearchIntentsLoading);
  const searchIntents = useSelector(getSearchIntentsResult);
  const searchRedirectUrl =
    searchIntents && getSearchRedirectUrl(searchIntents, baseUrl);
  // Actions
  const fetchSearchIntents = useAction(fetchSearchIntentsAction);
  const resetSearchIntents = useAction(resetSearchIntentsAction);

  return {
    /**
     * Gets the search intents.
     */
    fetchSearchIntents,
    /**
     * Resets the search intents result.
     */
    resetSearchIntents,
    /**
     * Search intents error.
     */
    error,
    /**
     * Whether the search intents request is loading.
     */
    isLoading,
    /**
     * Search intents result received.
     */
    searchIntents,
    /**
     * Redirect url where the user should be redirected with the intents received.
     *
     */
    searchRedirectUrl,
  };
};

export default useSearchIntents;
