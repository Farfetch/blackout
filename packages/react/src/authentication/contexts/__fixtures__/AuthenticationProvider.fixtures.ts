import { TokenData, TokenKinds } from '@farfetch/blackout-client';

export const mockDefaultActiveTokenData = {
  kind: TokenKinds.Guest,
  data: new TokenData({
    accessToken: 'dummy_access_token',
    expiresIn: '12000',
    userId: 10000,
  }),
};
