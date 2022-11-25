import { adaptPrice } from '..';
import {
  basePrice,
  priceForFreeItem,
  priceNoInclTaxesKeys,
  pricesForPriceRange,
  priceWithPromotionPercentage,
} from '../__fixtures__/adapters.fixtures';

describe('adaptPrice()', () => {
  it('should return undefined when the price is invalid', () => {
    // @ts-expect-error Purposely setting wrong arguments to test
    expect(adaptPrice({})).toBeUndefined();
    // @ts-expect-error Purposely setting wrong arguments to test
    expect(adaptPrice()).toBeUndefined();
    // @ts-expect-error Purposely setting wrong arguments to test
    expect(adaptPrice('')).toBeUndefined();
  });

  it('should not adapt a price object when it is already formatted', () => {
    const adaptedPrice = {
      ...basePrice,
      isFormatted: true,
    };

    expect(adaptPrice(adaptedPrice)).toBe(adaptedPrice);
  });

  it('should adapt a standard price object correctly', () => {
    expect(adaptPrice(basePrice)).toMatchSnapshot('standard price adapter');
  });

  it('should adapt a price object without "*InclTaxes" keys correctly', () => {
    expect(adaptPrice(priceNoInclTaxesKeys)).toMatchSnapshot(
      'price without *InclTaxes keys adapter',
    );
  });

  it('should adapt a price object with promotion percentage key', () => {
    expect(adaptPrice(priceWithPromotionPercentage)).toMatchSnapshot(
      'price with promotion percentage key adapter',
    );
  });

  it('should adapt a price object for a price range', () => {
    expect(adaptPrice(pricesForPriceRange[0]!)?.type).toBe(0);
    expect(adaptPrice(pricesForPriceRange[0]!)).toMatchSnapshot(
      'price range - min',
    );

    expect(adaptPrice(pricesForPriceRange[1]!)?.type).toBe(1);
    expect(adaptPrice(pricesForPriceRange[1]!)).toMatchSnapshot(
      'price range - max',
    );
  });

  it('should adapt a price object for a free item', () => {
    expect(adaptPrice(priceForFreeItem)).toMatchSnapshot('price for free item');
  });
});
