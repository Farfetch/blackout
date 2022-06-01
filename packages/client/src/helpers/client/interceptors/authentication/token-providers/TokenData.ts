import type { ITokenData } from './types/TokenData.types';

/**
 * Represents token data.
 */
class TokenData implements ITokenData {
  /**
   * Default value for the refresh token window offset. This value will be subtracted
   * from the token's expiresIn value to advance the window for refreshing the access
   * token.
   */
  static REFRESH_TOKEN_WINDOW_OFFSET = 30000;

  accessToken?: string;
  expiresIn?: string;
  expiresTimeUtc?: number;
  refreshToken?: string;
  userId?: number;

  /**
   * Constructs a new TokenData instance with the passed in data. If expiresTimeUtc
   * is not provided, it is assumed that the token was just created and will expire
   * after now + expiresIn seconds.
   *
   * @param data - Token data.
   */
  constructor(data: ITokenData) {
    if (!data) {
      throw new TypeError(
        "Missing 'data' parameter to 'TokenData' constructor call",
      );
    }

    const { accessToken, refreshToken, expiresIn, expiresTimeUtc, userId } =
      data;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    let expiresInAsNumber;

    if (typeof expiresIn === 'string') {
      expiresInAsNumber = Number(expiresIn);
    }

    this.expiresIn = expiresIn;
    this.expiresTimeUtc = 0;

    if (typeof expiresTimeUtc === 'number') {
      this.expiresTimeUtc = expiresTimeUtc;
    } else if (
      typeof expiresInAsNumber === 'number' &&
      !isNaN(expiresInAsNumber)
    ) {
      this.expiresTimeUtc = new Date().getTime() + expiresInAsNumber * 1000;
    }

    this.userId = userId;
  }

  /**
   * Returns if the token data (access token) needs to be refreshed. It will take in
   * account not only the token's expiresTimeUtc but also the refresh token window
   * offset value to advance the creation of the token before it is expired.
   *
   * @returns True if the token is within the refresh token window or false otherwise.
   */
  needsRefresh(): boolean {
    if (!this.expiresTimeUtc) {
      return true;
    }

    const currentTimeUtc = new Date().getTime();

    return (
      this.expiresTimeUtc - currentTimeUtc <=
      TokenData.REFRESH_TOKEN_WINDOW_OFFSET
    );
  }
}

export default TokenData;
