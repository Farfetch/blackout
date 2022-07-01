import {
  UserPersonalIdImageSide,
  VerifyLevel,
} from '@farfetch/blackout-client';

export const mockPersonalIdResponse = {
  backImageId: '',
  expiryDate: '',
  frontImageId: '',
  id: '',
  isDefault: true,
  maskedIdNumber: '',
  maskedName: '',
  verifyLevel: VerifyLevel.VALID,
};

export const mockGetUserDefaultPersonalIdResponse = {
  backImageId: 'string',
  expiryDate: 'string',
  frontImageId: 'string',
  id: 'string',
  isDefault: true,
  maskedIdNumber: 'string',
  maskedName: 'string',
  verifyLevel: VerifyLevel.VALID,
};

export const mockGetPersonalIdsResponse = [
  {
    backImageId: 'string',
    expiryDate: 'string',
    frontImageId: 'string',
    id: 'string',
    isDefault: true,
    maskedIdNumber: 'string',
    maskedName: 'string',
    verifyLevel: VerifyLevel.VALID,
  },
];

export const mockPostPersonalIdsResponse = {
  backImageId: 'string',
  expiryDate: 'string',
  frontImageId: 'string',
  id: 'string',
  idNumber: 'string',
  name: 'string',
};

export const mockPutDefaultPersonalIdResponse = {
  backImageId: 'string',
  expiryDate: 'string',
  frontImageId: 'string',
  id: 'string',
  isDefault: true,
  maskedIdNumber: 'string',
  maskedName: 'string',
  verifyLevel: VerifyLevel.VALID,
};

export const mockPatchPersonalIdResponse = {
  backImageId: '',
  expiryDate: '',
  frontImageId: '',
  id: '',
  idNumber: '',
  name: '',
};

export const mockPostPersonalIdImageResponse = {
  id: '',
  side: UserPersonalIdImageSide.FRONT,
};

export const mockPostPersonalIdsData = {
  backImageId: 'string',
  frontImageId: 'string',
  idNumber: 'string',
  name: 'string',
};

export const mockPutDefaultPersonalIdData = {
  id: 'string',
};
