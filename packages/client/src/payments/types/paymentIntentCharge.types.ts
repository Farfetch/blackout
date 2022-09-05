export enum ChargeStatus {
  Processing = 'Processing',
  Completed = 'Completed',
  Error = 'Error',
}

export enum DeclineCode {
  NotApplicable = 'NotApplicable',
  Default = 'Default',
  Generic = 'Generic',
  Refused = 'Refused',
  InvalidCardDetails = 'InvalidCardDetails',
  InvalidTransaction = 'InvalidTransaction',
  InsufficientFundsOrInvalidAddress = 'InsufficientFundsOrInvalidAddress',
  ThreeDSecure = 'ThreeDSecure',
}

export type ChargeInstrument = {
  id: string;
  operationStatus: ChargeStatus;
  declineCode: DeclineCode;
};

export type Charge = {
  id: string;
  status: ChargeStatus;
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
  chargeInstruments: ChargeInstrument[];
};

export type PaymentIntentCharge = Omit<Charge, 'chargeId'>;
