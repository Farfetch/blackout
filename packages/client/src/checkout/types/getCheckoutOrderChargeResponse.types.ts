export enum GetChargeStatus {
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
  operationStatus: GetChargeStatus;
  declineCode: DeclineCode;
};

export type GetCheckoutOrderChargeResponse = {
  chargeId: string;
  status: GetChargeStatus;
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
  chargeInstruments: ChargeInstrument[];
};
