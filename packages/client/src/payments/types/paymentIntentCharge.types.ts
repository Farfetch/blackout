export enum ChargeStatus {
  Processing,
  Completed,
  Error,
}

export enum DeclineCode {
  NotApplicable,
  Default,
  Generic,
  Refused,
  InvalidCardDetails,
  InvalidTransaction,
  InsufficientFundsOrInvalidAddress,
  ThreeDSecure,
}

export type ChargeInstrument = {
  id: string;
  operationStatus: ChargeStatus;
  declineCode: DeclineCode;
};

export type Charge = {
  chargeId: string;
  status: ChargeStatus;
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
  chargeInstruments: ChargeInstrument[];
};

export type PaymentIntentCharge = Omit<Charge, 'chargeId'>;
