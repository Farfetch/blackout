import * as actionTypes from '../../actionTypes/index.js';
import {
  type Config,
  type GetProductListing,
  type GetProductListingQuery,
  type GetProductSet,
  type GetProductSetQuery,
  type ProductListing,
  type ProductSet,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateProductListingHash } from '../../utils/index.js';
import {
  isProductListingCached,
  isProductListingHydrated,
} from '../../selectors/index.js';
import { normalize } from 'normalizr';
import productsListSchema from '../../../entities/schemas/productsList.js';
import type { Dispatch } from 'redux';
import type {
  GetOptionsArgument,
  Nullable,
  StoreState,
} from '../../../types/index.js';
import type { ProductListActionOptions } from '../../types/index.js';

/**
 * Creates a thunk configured with the specified client to fetch a product listing
 * for a given slug with specific query parameters.
 *
 * @param client                - Get listing or sets client.
 * @param slug                  - Slug to load product list for.
 * @param query                 - Query parameters to apply.
 * @param actionOptions         - Additional options to apply to the action.
 * @param config                - Custom configurations to send to the client instance (axios).
 * @param dispatch              - Redux dispatch.
 * @param getState              - Store state.
 * @param options               - Thunk options.
 * @param isSet                 - If is sets scope or not.
 * @param isCustomListingPage  - If is custom listing page scope or not.
 *
 * @returns Thunk to be dispatched to the redux store.
 */
const fetchProductListFactory = async (
  client: GetProductListing | GetProductSet,
  slug: string | number,
  query: GetProductListingQuery | GetProductSetQuery | Record<string, never>,
  {
    useCache = false,
    setProductsListHash = true,
  }: ProductListActionOptions | undefined = {},
  config: Config | undefined,
  dispatch: Dispatch,
  getState: () => StoreState,
  {
    getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
  }: GetOptionsArgument,
  isSet: boolean,
  isCustomListingPage: boolean,
): Promise<ProductListing | ProductSet | undefined> => {
  let hash: Nullable<string> = null;

  try {
    hash = generateProductListingHash(slug, query, {
      isSet,
      isCustomListingPage,
    });

    const { productImgQueryParam } = getOptions(getState);
    const isHydrated = isProductListingHydrated(getState(), hash);

    // Check if listing data is already fetched.
    // If it is, let the calling code know there's nothing to wait for.
    // If not, dispatch an action to fetch the listing data.
    if (isHydrated) {
      dispatch({
        meta: { hash },
        type: actionTypes.DEHYDRATE_PRODUCT_LISTING,
      });

      return;
    }

    // Verify if this set already exists on the products lists
    if (isProductListingCached(getState(), hash)) {
      if (useCache) {
        if (!setProductsListHash) {
          return;
        }

        dispatch({
          meta: { hash },
          type: actionTypes.SET_PRODUCT_LISTING_HASH,
        });

        return;
      } else {
        dispatch({
          type: actionTypes.RESET_PRODUCT_LISTINGS_STATE,
        });
      }
    }

    if (setProductsListHash) {
      dispatch({
        meta: { hash },
        type: actionTypes.SET_PRODUCT_LISTING_HASH,
      });
    }

    dispatch({
      meta: { hash },
      type: actionTypes.FETCH_PRODUCT_LISTING_REQUEST,
    });

    const result = await client(
      // @ts-expect-error Property slug can be a string or a number.
      isCustomListingPage ? '' : slug,
      query,
      config,
    );

    dispatch({
      meta: { hash },
      payload: normalize(
        {
          hash,
          // Send this to the entity's `adaptProductImages`
          productImgQueryParam,
          ...result,
        },
        productsListSchema,
      ),
      type: actionTypes.FETCH_PRODUCT_LISTING_SUCCESS,
    });

    return result;
  } catch (error) {
    const errorAsBlackoutError = toBlackoutError(error);

    dispatch({
      meta: { hash: hash as string },
      payload: { error: errorAsBlackoutError },
      type: actionTypes.FETCH_PRODUCT_LISTING_FAILURE,
    });

    throw errorAsBlackoutError;
  }
};

export default fetchProductListFactory;
