import { type CheckoutOrderItem } from './checkoutOrderItem.types.js';

export type CheckoutSessionItem = Omit<
  CheckoutOrderItem,
  | 'checkoutOrderId'
  | 'promocodeDiscountPercentage'
  | 'price'
  | 'variants'
  | 'summary'
> & {
  price: Omit<
    CheckoutOrderItem['price'],
    'formattedPriceWithoutCurrency' | 'formattedPriceWithoutDiscountAndCurrency'
  >;
  variants: Array<
    Omit<
      CheckoutOrderItem['variants'][number],
      'formattedPrice' | 'formattedPriceWithoutDiscount' | 'price'
    > & {
      price: Omit<
        CheckoutOrderItem['variants'][number]['price'],
        | 'formattedPrice'
        | 'formattedPriceWithoutCurrency'
        | 'formattedPriceWithoutDiscount'
        | 'formattedPriceWithoutDiscountAndCurrency'
      >;
    }
  >;
  summary: Omit<
    CheckoutOrderItem['summary'],
    | 'formattedGrandTotal'
    | 'formattedSubTotalAmount'
    | 'formattedSubTotalOriginalAmount'
  >;
};
