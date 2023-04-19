export enum UserPersonalIdVerifyLevel {
  Unverified,
  Valid,
  Expired,
  Invalid,
}

export type UserPersonalId = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: UserPersonalIdVerifyLevel;
};

export type UserPersonalIdPartial = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  idNumber: string;
  name: string;
};
