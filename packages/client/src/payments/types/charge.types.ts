export enum GetChargesStatus {
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

export type ChargeInstruments = {
  id: string;
  operationStatus: GetChargesStatus;
  declineCode: DeclineCode;
};

export type Charge = {
  status: GetChargesStatus;
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
  chargeInstruments: ChargeInstruments[];
};

export type Charges = Charge & {
  chargeId: string | null;
};
