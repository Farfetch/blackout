import type { CheckoutAddress } from '../../types/common/address.types';
import type { CheckoutOrderItem, CheckoutOrderMerchant } from '.';
import type { CustomerType } from '../../orders/types/order.types';
import type { MerchantLocation } from '../../merchantsLocations/types/merchantLocation.types';

export enum ShippingMode {
  ByMerchant = 'ByMerchant',
  ByBundle = 'ByBundle',
}

export enum CheckoutOrderStatus {
  Opened,
  Freezed,
  Paid,
  OrderCreated,
  Cancelled,
}

export type ClickAndCollect = {
  merchantLocationId: MerchantLocation['id'];
  collectPointId: number;
};

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
  customerType: CustomerType;
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
  clickAndCollect: ClickAndCollect;
  tags: string[];
  hadUnavailableItems: boolean;
  isGuestUser: boolean;
  shippingMode: ShippingMode;
  paymentIntentId?: string;
};
