export enum VerifyLevel {
  UNVERIFIED,
  VALID,
  EXPIRED,
  INVALID,
}

export enum Side {
  FRONT,
  BACK,
  UNKNOWN,
}

export type UserPersonalIdResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
};

export type UserDefaultPersonalIdResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
};

export type UserPersonalIdsResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
}[];

export type PostUserPersonalIdsResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  idNumber: string;
  name: string;
};

export type PutUserDefaultPersonalIdResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
};

export type PatchUserPersonalIdResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  idNumber: string;
  name: string;
};

export type PostUserPersonalIdImageResponse = {
  id: string;
  side: Side;
};

export type PatchUserPersonalIdData = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  idNumber: string;
  name: string;
};

export type PostUserPersonalIdImageData = {
  file: string;
};
