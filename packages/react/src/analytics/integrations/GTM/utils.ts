import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import type {
  AnalyticsProduct,
  EventData,
  EventProperties,
  TrackTypesValues,
  UserData,
  UserTraits,
} from '@farfetch/blackout-analytics';
import type { GTMEventContext } from './types';
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
  email: UserTraits['email'];
  name: UserTraits['name'];
  isGuest: UserTraits['isGuest'];
} => ({
  id: get(user, 'id'),
  localId: get(user, 'localId'),
  email: get(user, 'traits.email'),
  name: get(user, 'traits.name'),
  isGuest: get(user, 'traits.isGuest'),
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
  ) as typeof window.navigator['userAgent'],
});

/**
 * Picks the product categories.
 *
 * @param categories - Product categories.
 *
 * @returns The product categories.
 */
export const getProductCategory = (
  categories: AnalyticsProduct['category'],
): Array<string> | void => {
  if (isArray(categories)) {
    return categories;
  }

  if (isString(categories)) {
    return categories.split('/');
  }
};

/**
 * Picks the product parameters of interest.
 *
 * @param product - Product event payload object.
 *
 * @returns The filtered product object.
 */
export const getProductData = (product: AnalyticsProduct) => ({
  ...product,
  category: getProductCategory(product.category),
});
