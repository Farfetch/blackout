import type { BagItem } from './bagItem.types.js';
import type { HypermediaLink } from './hypermediaLink.types.js';

export type Bag = {
  bagSummary: {
    currency: string;
    currencySymbol: string;
    dateCreated: string;
    dateUpdated: string;
    grandTotal: number;
    subTotalAmount: number;
    subTotalAmountExclTaxes: number;
    totalDiscount: number;
    totalShippingFee: number;
    totalTaxes: number;
    totalProductPromotionDiscount: number;
    formattedGrandTotal: string;
    formattedSubTotalAmount: string;
    formattedSubTotalAmountExclTaxes: string;
    formattedTotalDiscount: string;
    formattedTotalShippingFee: string;
    formattedTotalTaxes: string;
    formattedTotalProductPromotionDiscount: string;
    taxType: string;
  };
  count: number;
  id: string;
  items: BagItem[];
  hadUnavailableItems: boolean;
  '@controls'?: {
    [key: string]: HypermediaLink;
  };
};
