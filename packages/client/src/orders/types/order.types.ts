import type { OrderItem } from './orderItem.types';
import type { UserAddress } from '../../types/common/address.types';

export type Order = {
  id: string;
  checkoutOrderId: number;
  userId: number;
  paymentId: string;
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
};

export enum CustomerType {
  Normal = 'Normal',
  PersonalShopper = 'PersonalShopper',
  VipBrazil = 'VipBrazil',
}
