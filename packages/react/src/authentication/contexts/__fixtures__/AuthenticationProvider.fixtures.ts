import { TokenData, TokenKind } from '@farfetch/blackout-client';

export const mockDefaultActiveTokenData = {
  kind: TokenKind.Guest,
  data: new TokenData({
    accessToken: 'dummy_access_token',
    expiresIn: '12000',
    userId: 10000,
  }),
};
