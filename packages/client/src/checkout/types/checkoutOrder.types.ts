import type { CheckoutAddress } from '../../types/common/address.types';
import type { CheckoutOrderItem, CheckoutOrderMerchant } from '.';

export enum ShippingMode {
  ByMerchant,
  ByBundle,
}

export enum CheckoutOrderStatus {
  Opened,
  Freezed,
  Paid,
  OrderCreated,
  Cancelled,
}

export type CheckoutOrder = {
  id: number;
  bagId: string;
  billingAddress?: CheckoutAddress;
  checkoutOrderMerchants: CheckoutOrderMerchant[];
  countryId: number;
  createdDate: string;
  credits: {
    sourceCreditValue: number;
    sourceCurrencyId: number;
    storeId: number;
    targetCreditValue: number;
    targetCurrencyId: number;
    userId: string;
  }[];
  currency: string;
  customerType: string;
  grandTotal: number;
  items: CheckoutOrderItem[];
  locale: string;
  orderId: string;
  promocode: string;
  shippingAddress?: CheckoutAddress;
  status: CheckoutOrderStatus;
  subTotalAmount: number;
  subTotalAmountExclTaxes: number;
  totalDiscount: number;
  totalQuantity: number;
  totalShippingFee: number;
  totalTaxes: number;
  totalDomesticTaxes: number;
  totalCredit: number;
  formattedGrandTotal: string;
  formattedSubTotalAmount: string;
  formattedSubTotalAmountExclTaxes: string;
  formattedTotalDiscount: string;
  formattedTotalShippingFee: string;
  formattedTotalTaxes: string;
  formattedTotalDomesticTaxes: string;
  formattedTotalCredit: string;
  taxType: string;
  updatedDate: string;
  userId: number;
  clickAndCollect: {
    collectPointId: number;
    merchantLocationId: number;
  };
  tags: string[];
  hadUnavailableItems: boolean;
  isGuestUser: boolean;
  shippingMode: ShippingMode;
  paymentIntentId?: string;
};
