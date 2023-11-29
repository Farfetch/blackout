import type {
  CheckoutAddress,
  CheckoutShippingAddress,
} from '../../types/common/address.types.js';
import type { CheckoutOrderItem, CheckoutOrderMerchant } from './index.js';
import type { CustomerTypeLegacy } from '../../orders/types/order.types.js';
import type { MerchantLocation } from '../../merchantsLocations/types/merchantLocation.types.js';
import type { PaymentIntent } from '../../payments/index.js';
import type { PromotionEvaluationId } from '../../promotionEvaluations/index.js';

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
  billingAddress: CheckoutAddress;
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
  customerType: CustomerTypeLegacy;
  grandTotal: number;
  items: CheckoutOrderItem[];
  locale: string;
  orderId: string;
  // This is to be deprecated and removed in a future version
  // in favour of the promocodes property.
  promocode?: string;
  promocodes?: string[];
  shippingAddress: CheckoutShippingAddress;
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
  clickAndCollect?: ClickAndCollect;
  tags: string[];
  hadUnavailableItems: boolean;
  isGuestUser: boolean;
  shippingMode: ShippingMode;
  paymentIntentId?: PaymentIntent['id'];
  promotionEvaluationId?: PromotionEvaluationId;
  customerId?: number;
  tenantId?: number;
  isGuesUser?: boolean;
};
