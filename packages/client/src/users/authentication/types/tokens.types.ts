export type Token = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
};

export type GuestToken = Omit<Token, 'refreshToken'>;
