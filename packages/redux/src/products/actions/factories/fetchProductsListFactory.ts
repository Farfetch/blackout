import {
  DEHYDRATE_PRODUCTS_LIST,
  FETCH_PRODUCTS_LIST_FAILURE,
  FETCH_PRODUCTS_LIST_REQUEST,
  FETCH_PRODUCTS_LIST_SUCCESS,
  RESET_PRODUCTS_LISTS_STATE,
  SET_PRODUCTS_LIST_HASH,
} from '../../actionTypes';
import { generateProductsListHash } from '../../utils';
import { isProductsListCached, isProductsListHydrated } from '../../selectors';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import productsListSchema from '../../../entities/schemas/productsList';
import type { Dispatch } from 'redux';
import type {
  GetListing,
  GetSet,
  Listing,
  ListingQuery,
  Set,
  SetQuery,
} from '@farfetch/blackout-client';
import type { GetOptionsArgument, Nullable, StoreState } from '../../../types';
import type { ProductsListActionOptions } from '../../types';

/**
 * Creates a thunk configured with the specified client to fetch a product listing
 * for a given slug with specific query parameters.
 *
 * @param client        - Get listing or sets client.
 * @param slug          - Slug to load products list for.
 * @param query         - Query parameters to apply.
 * @param actionOptions - Additional options to apply to the action.
 * @param config        - Custom configurations to send to the client instance (axios).
 * @param dispatch      - Redux dispatch.
 * @param getState      - Store state.
 * @param options       - Thunk options.
 * @param isSet         - If is sets scope or not.
 *
 * @returns Thunk to be dispatched to the redux store.
 */
export const fetchProductsListFactory = async (
  client: GetListing | GetSet,
  slug: string | number,
  query: ListingQuery | SetQuery | Record<string, never>,
  {
    useCache = false,
    setProductsListHash = true,
  }: ProductsListActionOptions | undefined = {},
  config: Record<string, unknown> | undefined,
  dispatch: Dispatch,
  getState: () => StoreState,
  {
    getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
  }: GetOptionsArgument,
  isSet: boolean,
): Promise<Listing | Set | undefined> => {
  let hash: Nullable<string> = null;
  try {
    hash = generateProductsListHash(slug, query, { isSet });
    const { productImgQueryParam } = getOptions(getState);
    const isHydrated = isProductsListHydrated(getState(), hash);

    // Check if listing data is already fetched.
    // If it is, let the calling code know there's nothing to wait for.
    // If not, dispatch an action to fetch the listing data.
    if (isHydrated) {
      dispatch({
        meta: { hash },
        type: DEHYDRATE_PRODUCTS_LIST,
      });

      return;
    }

    // Verify if this set already exists on the products lists
    if (isProductsListCached(getState(), hash)) {
      if (useCache) {
        if (!setProductsListHash) {
          return;
        }

        dispatch({
          meta: { hash },
          type: SET_PRODUCTS_LIST_HASH,
        });

        return;
      } else {
        dispatch({
          type: RESET_PRODUCTS_LISTS_STATE,
        });
      }
    }

    if (setProductsListHash) {
      dispatch({
        meta: { hash },
        type: SET_PRODUCTS_LIST_HASH,
      });
    }

    dispatch({
      meta: { hash },
      type: FETCH_PRODUCTS_LIST_REQUEST,
    });

    // @ts-expect-error Property slug can be a string or a number.
    const result = await client(slug, query, config);

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
      type: FETCH_PRODUCTS_LIST_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      meta: { hash: hash as string },
      payload: { error: toError(error) },
      type: FETCH_PRODUCTS_LIST_FAILURE,
    });

    throw error;
  }
};
