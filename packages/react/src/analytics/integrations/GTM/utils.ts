import {
  type AnalyticsProduct,
  type EventData,
  type EventProperties,
  type TrackTypesValues,
  type UserData,
  type UserTraits,
  utils,
} from '@farfetch/blackout-analytics';
import { get, isArray, isString } from 'lodash-es';
import { MAX_PRODUCT_CATEGORIES } from '../GA4/constants.js';
import type { GTMEventContext } from './types/index.js';
import type { User } from '@farfetch/blackout-client';
import type URLParse from 'url-parse';

/**
 * Picks the user parameters of interest.
 *
 * @param data - Analytics event object.
 *
 * @returns Properties of the event.
 */
export const getEventProperties = (
  data: EventData<TrackTypesValues>,
): EventProperties | Record<string, undefined> => get(data, 'properties', {});

/**
 * Picks the user parameters of interest.
 *
 * @param user - Analytics user object.
 *
 * @returns The filtered user object.
 */
export const getUserParameters = (
  user: UserData,
): {
  id: UserData['id'];
  localId: UserData['localId'];
  email: User['email'];
  name: User['name'];
  isGuest: UserTraits['isGuest'];
} => ({
  id: get(user, 'id'),
  localId: get(user, 'localId'),
  email: get(user, 'traits.email'),
  name: get(user, 'traits.name'),
  isGuest: get(user, 'traits.isGuest', true),
});

/**
 * Picks the event context parameters of interest.
 *
 * @param context - Analytics event context object.
 *
 * @returns The filtered context object.
 */
export const getContextParameters = (
  context: EventData<TrackTypesValues>['context'],
): GTMEventContext => ({
  currencyCode: get(context, 'currencyCode') as string,
  eventContext: get(context, 'event'),
  libraryVersion: get(context, 'library.version') as string,
  location: get(context, 'web.window.location') as URLParse<
    Record<string, string | undefined>
  >,
  userAgent: get(
    context,
    'web.window.navigator.userAgent',
  ) as (typeof window.navigator)['userAgent'],
});

/**
 * Picks the product categories.
 *
 * @param categories - Product categories.
 *
 * @returns The product categories.
 */
export const getProductCategory = (
  categories: AnalyticsProduct['category'] | Array<string>,
): Array<string> => {
  let productCategories;

  if (isArray(categories)) {
    productCategories = categories;
  } else if (isString(categories)) {
    productCategories = categories.split('/');
  }

  if (productCategories && productCategories.length > MAX_PRODUCT_CATEGORIES) {
    productCategories = [
      productCategories[0],
      ...productCategories.slice(-MAX_PRODUCT_CATEGORIES + 1),
    ];

    utils.logger.warn(
      `[GTM] - Product category hierarchy exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GTM only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
    );
  }

  return productCategories as Array<string>;
};

/**
 * Picks the product parameters of interest.
 *
 * @param product - Product event payload object.
 *
 * @returns The filtered product object.
 */
export const getProductData = (
  product: AnalyticsProduct,
): AnalyticsProduct => ({
  ...product,
  ...getProductCategory(product.category),
});
