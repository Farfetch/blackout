export type GuestUser = {
  id: number;
  bagId: string;
  wishlistId: string;
  ip: string;
  countryCode: string;
  externalId: string;
  friendId: string;
  expiryDate: string;
};

export enum UserStatus {
  Inactive = 'Inactive',
  Disabled = 'Disabled',
  Locked = 'Locked',
  PendingResetPassword = 'PendingResetPassword',
  PendingEmailConfirmation = 'PendingEmailConfirmation',
  Active = 'Active',
  Unknown = 'Unknown',
}

// Returned by users/me request when the user is guest
// This is the normalization of the GuestUser structure done by
// the backend from the users/me request to match the User structure
// returned by the users/me for registered users.
export type GuestUserNormalized = {
  bagId: string;
  countryCode: string;
  guestBagItemsMerged: number;
  phoneNumberConfirmed?: boolean;
  id: number;
  isExternalLogin: boolean;
  isGuest: true;
  receiveNewsletters?: boolean;
  status: UserStatus;
  wishlistId: string;
};
