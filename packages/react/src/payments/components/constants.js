export const frameBorder = 0;
export const scrolling = 'auto';
export const id = 'PAYMENT_GATEWAY_IFRAME';
export const title = 'PAYMENT_GATEWAY_IFRAME';
export const OPERATION_SOURCE = 'payment-gateway';
export const OPERATION_TYPE = {
  LOAD: 'load',
  VALIDATION: 'validation',
  ADD_CREDIT_CARD_INSTRUMENT: 'add-creditCard-instrument',
};
export const initialState = {
  isFormValid: false,
  instrumentId: '',
  instrumentAdded: false,
};
export const paymentGatewayReducer = (state, action) => {
  return { state, ...action };
};
