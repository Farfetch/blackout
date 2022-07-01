export type PostGuestTokenResponse = {
  accessToken: string;
  expiresIn: string;
};

export type PostTokenResponse = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
};
