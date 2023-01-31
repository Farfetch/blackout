import { adaptPrice } from '..';
import {
  priceForFreeItem,
  priceNoInclTaxesKeys,
  pricesForPriceRange,
  priceWithInclTaxesKeys,
  priceWithPromotionPercentage,
} from '../__fixtures__/adapters.fixtures';

describe('adaptPrice()', () => {
  it('should adapt a legacy price object with "*InclTaxes" keys correctly', () => {
    expect(adaptPrice(priceWithInclTaxesKeys)).toMatchSnapshot(
      'price with *InclTaxes keys adapter',
    );
  });

  it('should adapt a legacy price object without "*InclTaxes" keys correctly', () => {
    expect(adaptPrice(priceNoInclTaxesKeys)).toMatchSnapshot(
      'price without *InclTaxes keys adapter',
    );
  });

  it('should adapt a legacy price object with promotion percentage key', () => {
    expect(adaptPrice(priceWithPromotionPercentage)).toMatchSnapshot(
      'price with promotion percentage key adapter',
    );
  });

  it('should adapt a legacy price object for a price range', () => {
    expect(adaptPrice(pricesForPriceRange[0]).type).toBe(0);
    expect(adaptPrice(pricesForPriceRange[0])).toMatchSnapshot(
      'price range - min',
    );

    expect(adaptPrice(pricesForPriceRange[1]).type).toBe(1);
    expect(adaptPrice(pricesForPriceRange[1])).toMatchSnapshot(
      'price range - max',
    );
  });

  it('should adapt a legacy price object when it has no price', () => {
    expect(adaptPrice(priceForFreeItem)).toMatchSnapshot('price for free item');
  });

  it('should not adapt a legacy price object when it is already formatted', () => {
    const formattedPrice = {
      includingTaxes: 123,
      tags: ['THIS PRICE IS FORMATTED'],
      isFormatted: true,
    };

    expect(adaptPrice(formattedPrice)).toBe(formattedPrice);
  });

  it('should not adapt anything when the legacy price is invalid', () => {
    expect(adaptPrice({})).toBeUndefined();
    expect(adaptPrice()).toBeUndefined();
    expect(adaptPrice('')).toBeUndefined();
  });
});
