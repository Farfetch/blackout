import * as actionTypes from '../../actionTypes/index.js';
import {
  type Config,
  type FacetGroup,
  type GetProductListingFacets,
  type ProductListingFacetsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import facetsSchema from '../../../entities/schemas/facet.js';
import type { Dispatch } from 'redux';
import type { FetchListingFacetsAction } from '../../index.js';

const fetchListingFacetsFactory =
  (getListingFacets: GetProductListingFacets) =>
  (query?: ProductListingFacetsQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchListingFacetsAction>,
  ): Promise<FacetGroup[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PRODUCT_LISTING_FACETS_REQUEST,
      });

      const result = await getListingFacets(query, config);

      dispatch({
        type: actionTypes.FETCH_PRODUCT_LISTING_FACETS_SUCCESS,
        payload: normalize(result, [{ values: [[facetsSchema]] }]),
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        type: actionTypes.FETCH_PRODUCT_LISTING_FACETS_FAILURE,
        payload: {
          error: errorAsBlackoutError,
        },
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchListingFacetsFactory;
