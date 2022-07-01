export enum VerifyLevel {
  UNVERIFIED,
  VALID,
  EXPIRED,
  INVALID,
}

export type UserPersonalId = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
};

export type UserPersonalIdPartial = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  idNumber: string;
  name: string;
};
