import type { Order, OrderItem } from '../../orders/index.js';

export type ExchangeFilter = {
  id: string;
  exchangeFilterItems: Array<ExchangeFilterItem>;
  /**
   * @deprecated logicOperator property is deprecated, use the filters property instead.
   */
  logicOperator: ExchangeFilterLogicOperator;
  filters: Array<ExchangeFilterCondition>;
};

export type ExchangeFilterItem = {
  orderCode: Order['id'];
  orderItemUuid: OrderItem['shippingOrderLineId'];
};

export type ExchangeFilterLogicOperator = {
  logicOperatorType: ExchangeFilterLogicOperatorType;
  operators: Array<ExchangeFilterLogicOperatorData>;
};

export enum ExchangeFilterLogicOperatorType {
  None = 'None',
  And = 'And',
  Or = 'Or',
}

export type ExchangeFilterCondition = ExchangeFilterLogicOperatorData;

export type ExchangeFilterLogicOperatorData = {
  criteria: ExchangeFilterLogicOperatorCriteria;
  comparator: ExchangeFilterLogicOperatorComparator;
  value: string | string[];
};

export enum ExchangeFilterLogicOperatorCriteria {
  None = 'None',
  MerchantId = 'MerchantId',
  Price = 'Price',
  ProductId = 'ProductId',
}

export enum ExchangeFilterLogicOperatorComparator {
  None = 'None',
  Equals = 'Equals',
  In = 'In',
  NotIn = 'NotIn',
  LessThanOrEqual = 'LessThanOrEqual',
  LessThan = 'LessThan',
}

export { ExchangeFilterLogicOperatorCriteria as ExchangeFilterConditionCriteria };
export { ExchangeFilterLogicOperatorComparator as ExchangeFilterConditionComparator };
