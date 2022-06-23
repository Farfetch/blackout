import type { Config } from '../../types';

export type PutUserResponse = {
  id: number;
  bagId: string;
  dateOfBirth: string;
  email: string;
  gender: number | string;
  title: {
    id: string;
    value: string;
  };
  name: string;
  phoneNumber: string;
  segments: string[];
  username: string;
  wishlistId: string;
  isExternalLogin: boolean;
  isGuest: boolean;
  status: string;
  lastName: string;
  firstName: string;
  countryCode: string;
  receiveNewsletters: boolean;
  personalShopperId?: number;
  createdDate: string;
  updatedDate: string;
};

export type PutUserData = {
  name: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  receiveNewsletters?: boolean;
  personalShopperId?: number;
  titleId?: string;
  firstName?: string;
  lastName?: string;
};

export type PutUser = (
  id: number,
  data: PutUserData,
  config?: Config,
) => Promise<PutUserResponse>;
