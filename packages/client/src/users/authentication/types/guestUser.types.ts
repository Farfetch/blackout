export enum UserStatus {
  Inactive = 'Inactive',
  Disabled = 'Disabled',
  Locked = 'Locked',
  PendingResetPassword = 'PendingResetPassword',
  PendingEmailConfirmation = 'PendingEmailConfirmation',
  Active = 'Active',
  Unknown = 'Unknown',
}

// This type is the combination of the type for values returned
// by the users/me request and the get/post guest users. The properties
// that are not common between the 2 types are made optional because of that.
export type GuestUser = {
  bagId: string;
  countryCode: string;
  expiryDate?: string;
  externalId?: string;
  friendId?: string;
  guestBagItemsMerged?: number;
  id: number;
  ip?: string;
  isExternalLogin?: boolean;
  isGuest: true;
  phoneNumberConfirmed?: boolean;
  receiveNewsletters?: boolean;
  status?: UserStatus;
  wishlistId: string;
};
