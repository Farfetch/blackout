import {
  UserPersonalIdImageSide,
  UserPersonalIdVerifyLevel,
} from '@farfetch/blackout-client';

export const mockPersonalIdResponse = {
  backImageId: '',
  expiryDate: '',
  frontImageId: '',
  id: '',
  isDefault: true,
  maskedIdNumber: '',
  maskedName: '',
  verifyLevel: UserPersonalIdVerifyLevel.Valid,
};

export const mockGetUserDefaultPersonalIdResponse = {
  backImageId: 'string',
  expiryDate: 'string',
  frontImageId: 'string',
  id: 'string',
  isDefault: true,
  maskedIdNumber: 'string',
  maskedName: 'string',
  verifyLevel: UserPersonalIdVerifyLevel.Valid,
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
    verifyLevel: UserPersonalIdVerifyLevel.Valid,
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
  verifyLevel: UserPersonalIdVerifyLevel.Valid,
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
  side: UserPersonalIdImageSide.Front,
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

export const config = {
  'X-SUMMER-RequestId': 'test',
};
export const expectedConfig = {
  'X-SUMMER-RequestId': 'test',
};

export const personalIdImageData = {
  file: 'string',
};
