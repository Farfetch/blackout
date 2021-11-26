import {
  TokenData,
  TokenKinds,
} from '@farfetch/blackout-client/helpers/client/interceptors/authentication';

export const mockDefaultActiveTokenData = {
  kind: TokenKinds.Guest,
  data: new TokenData({
    accessToken: 'dummy_access_token',
    expiresIn: '12000',
    userId: 10000,
  }),
};
