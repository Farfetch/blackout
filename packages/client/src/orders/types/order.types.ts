import type { ClickAndCollect } from '../../checkout';
import type { OrderItem, OrderItemLegacy } from './orderItem.types';
import type { PaymentIntent } from '../../payments';
import type {
  UserAddress,
  UserAddressLegacy,
} from '../../types/common/address.types';

export type Order = {
  id: string;
  checkoutOrderId: number;
  clickAndCollect?: ClickAndCollect;
  customerEmail?: string;
  userId: number;
  paymentId?: string;
  currency: string;
  shippingAddress: UserAddress;
  billingAddress: UserAddress;
  createdDate: string;
  updatedDate: string;
  items: OrderItem[];
  totalQuantity: number;
  subTotalAmount: number;
  totalDiscount: number;
  totalShippingFee: number;
  totalTaxes: number;
  totalDomesticTaxes: number;
  grandTotal: number;
  credit: number;
  customerType: CustomerType;
  formattedCredit: string;
  formattedGrandTotal: string;
  formattedSubTotalAmount: string;
  formattedTotalDiscount: string;
  formattedTotalShippingFee: string;
  formattedTotalTaxes: string;
  formattedTotalDomesticTaxes: string;
  taxType: string;
  paymentIntentIds?: Array<PaymentIntent['id']>;
  promotionOffers?: Array<OrderPromotionOffer>;
};

export type OrderPromotionOffer = {
  shippingOffers: Array<ShippingOffer>;
  merchantOrderCode: string;
};

export type ShippingOffer = {
  discount: number;
};

export enum CustomerType {
  Normal = 'Normal',
  PersonalShopper = 'PersonalShopper',
  VipBrazil = 'VipBrazil',
}

export enum CustomerTypeLegacy {
  Normal,
  PersonalShopper,
  VipBrazil,
}

export type OrderLegacy = Omit<
  Order,
  'customerType' | 'billingAddress' | 'shippingAddress' | 'items'
> & {
  customerType: CustomerTypeLegacy;
  billingAddress?: UserAddressLegacy;
  shippingAddress?: UserAddressLegacy;
  items: OrderItemLegacy[];
};
