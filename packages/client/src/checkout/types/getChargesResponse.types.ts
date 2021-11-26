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

export type ChargeInstrument = {
  id: string;
  operationStatus: GetChargesStatus;
  declineCode: DeclineCode;
};

export type GetChargesResponse = {
  chargeId: string;
  status: GetChargesStatus;
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
  chargeInstruments: ChargeInstrument[];
};
