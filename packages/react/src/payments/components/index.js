/**
 * Payments Components.
 *
 * @module payments/components
 * @category Payments
 * @subcategory Components
 */

export {
  default as PaymentGateway,
  addPaymentGatewayListener,
  removePaymentGatewayListener,
  createInstrument,
  getOperationResult,
} from './PaymentGateway';

export * from './constants';
