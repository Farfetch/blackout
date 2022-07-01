import type { CheckoutAddress } from '../../types/common/address.types';
import type { OrderItem } from './orderItem.types';

export type Order = {
  id: string;
  checkoutOrderId: number;
  userId: number;
  paymentId: string;
  currency: string;
  shippingAddress: CheckoutAddress;
  billingAddress: CheckoutAddress;
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
  taxType: number;
};

enum CustomerType {
  Normal,
  PersonalShopper,
  VipBrazil,
}
