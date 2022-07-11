import type { Config } from '../../types';

export type GetUserResponse = {
  bagId: string;
  dateOfBirth: string;
  email: string;
  gender: number;
  genderId: number;
  genders: string[];
  id: number;
  isExternalLogin: boolean;
  name: string;
  phoneNumber: string;
  segments: string[];
  username: string;
  wishlistId: string;
  title: {
    id: string;
    value: string;
  };
  firstName?: string;
  lastName?: string;
};

export type GetUser = (config?: Config) => Promise<GetUserResponse>;
