export type LoginResponse = {
  id: number;
  bagId: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  title: {
    id: string;
    value: string;
  };
  name: string;
  phoneNumber: string;
  segments: string;
  username: string;
  whishlistId: string;
  isExternalLogin: boolean;
  isGuest: boolean;
  status: string | number;
  lastName: string;
  firstName: string;
  countryCode: string;
  receiveNewsletters: boolean;
  personalShopperId: number;
  createdDate: string;
  updatedDate: string;
};
