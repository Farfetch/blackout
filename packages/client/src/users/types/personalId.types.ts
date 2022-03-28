export enum VerifyLevel {
  UNVERIFIED,
  VALID,
  EXPIRED,
  INVALID,
}

export type DefaultPersonalIdResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
};

export type PersonalIdsResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
}[];

export type PostPersonalIdsResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  idNumber: string;
  name: string;
};

export type PutDefaultPersonalIdResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
};
