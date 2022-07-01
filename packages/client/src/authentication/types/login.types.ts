export type LoginResponse = {
  id: number;
  bagId: string;
  dateOfBirth?: string | null;
  email: string;
  gender?: number;
  title?: {
    id: string;
    value: string;
  } | null;
  name: string;
  phoneNumber?: string | null;
  segments: string[];
  username: string;
  wishlistId: string;
  isExternalLogin: boolean;
  isGuest: boolean;
  status: number;
  lastName?: string | null;
  firstName?: string | null;
  countryCode?: string;
  receiveNewsletters?: boolean;
  personalShopperId?: number;
  createdDate?: string;
  updatedDate?: string;
  guestBagItemsMerged: number;
  loyalty?: {
    membershipId: string;
    errorCode: string;
    errorMessage: string;
    succeeded: boolean;
  } | null;
  phoneNumberConfirmed: boolean;
};
