export type TokenContext = {
  guestUserId?: number;
  guestUserEmail?: string;
  guestUserSecret?: string;
  grantType?: string;
} & Record<string, unknown>;
