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

export type PersonalIdResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  isDefault: boolean;
  maskedIdNumber: string;
  maskedName: string;
  verifyLevel: VerifyLevel;
};

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

export type PatchPersonalIdResponse = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  id: string;
  idNumber: string;
  name: string;
};

export type PostPersonalIdImageResponse = {
  id: string;
  side: Side;
};

export type PatchPersonalIdData = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  idNumber: string;
  name: string;
};

export type PostPersonalIdImageData = {
  file: string;
};
