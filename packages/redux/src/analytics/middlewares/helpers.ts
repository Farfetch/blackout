import {
  getBrand as getBrandSelector,
  getCategory as getCategorySelector,
} from '../../entities/selectors';
import Analytics, { utils } from '@farfetch/blackout-analytics';
import get from 'lodash/get';
import type { ProductEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Returns the different product categories separated with a `/`.
 *
 * @param state   - The current application state.
 * @param product - The product object.
 *
 * @returns String with all category names joined with a '/' character.
 */
export const getCategory = (
  state: StoreState,
  product: ProductEntity | undefined,
): string =>
  get(product, 'categories', [])
    .map(id => get(getCategorySelector(state, id), 'name'))
    .join('/');

/**
 * Returns the product brand name.
 *
 * @param state   - The current application state.
 * @param product - The product object.
 *
 * @returns The brand name for the product.s
 */
export const getBrand = (
  state: StoreState,
  product: ProductEntity | undefined,
): string | undefined => {
  const productBrand = get(product, 'brand');

  const brand = productBrand
    ? getBrandSelector(state, productBrand)
    : undefined;

  return get(brand, 'name');
};

/**
 * Returns the product variant (color).
 *
 * @param product - The product object.
 *
 * @returns The product variant.
 */
export const getVariant = (
  product: ProductEntity | undefined,
): string | undefined => {
  const mainVariant = get(product, 'colors', []).find(color =>
    get(color, 'tags', []).some(tag => tag === 'DesignerColor'),
  );

  return get(mainVariant, 'color.name');
};

/**
 * Returns the product size by the selected size id.
 *
 * @param product - The product object.
 * @param sizeId  - The selected size ID.
 *
 * @returns The size name.
 */
export const getSize = (
  product: ProductEntity | undefined,
  sizeId: number,
): string | undefined =>
  get(
    get(product, 'sizes', []).find(
      (size: NonNullable<ProductEntity['sizes']>[number]) =>
        get(size, 'id') === sizeId,
    ),
    'name',
  );

/**
 * Returns the currency code passed to analytics via `useContext()`.
 *
 * @param analyticsInstance - Analytics instance.
 *
 * @returns The currency from analytics's context.
 */
export const getCurrency = async (
  analyticsInstance: Analytics,
): Promise<string | undefined> => {
  const currency: string | undefined = (await analyticsInstance.context(
    'currencyCode',
  )) as string | undefined;

  if (!currency) {
    utils.logger.error(
      'Track event failed. Make sure to set `currencyCode` via `analytics.useContext()`.',
    );
  }

  return currency;
};

/**
 * Calculates the price discount absolute value by subtracting the price with
 * discount value from the price without discount value. Using the
 * price.discount.rate or even the price.discount.includingTaxes was considered but
 * they introduce additional complexity as they might not exist in the store or
 * cause rounding errors in the case of the price.discount.rate as it is a
 * percentage.
 *
 * @param priceWithDiscount    - The price value with discount.
 * @param priceWithoutDiscount - The price value without discount.
 *
 * @returns The absolute discount value or 0 if either priceWithDiscount or priceWithoutDiscount are
 * not numbers.
 */
export const calculatePriceDiscount = (
  priceWithDiscount: number,
  priceWithoutDiscount: number,
): number => {
  return typeof priceWithDiscount === 'number' &&
    typeof priceWithoutDiscount === 'number'
    ? priceWithoutDiscount - priceWithDiscount
    : 0;
};
