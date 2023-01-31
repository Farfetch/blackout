/**
 * Represents token data.
 */
class TokenData {
  /**
   * Default value for the refresh token window offet. This value will be subtracted from the
   * token's expiresIn value to advance the window for refreshing the access token.
   */
  static REFRESH_TOKEN_WINDOW_OFFSET = 30000;

  /**
   * Constructs a new TokenData instance with the passed in data.
   * If expiresTimeUtc is not provided, it is assumed that the token was just created and will expire after now + expiresIn seconds.
   *
   * @param {object} data - Token data.
   * @param {string} data.accessToken - The access token.
   * @param {number} data.expiresIn - The number of seconds until the token is valid.
   * @param {string} [data.refreshToken] - The refresh token. Can be undefined for guest users token data.
   * @param {number} [data.expiresTimeUtc] - The calculated date in utc when the token will be expired. If not provided, it will be assumed that the token was just created and the expiresTimeUtc will be calculated from the expiresIn value based on this assumption.
   * @param {number} [data.userId] - The user id associated with this token data. Can be undefined as it is not available at the same time the token data is.
   */
  constructor(data) {
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
   * Returns if the token data (access token) needs to be refreshed.
   * It will take in account not only the token's expiresTimeUtc but also
   * the refresh token window offset value to advance the creation of the
   * token before it is expired.
   *
   * @returns {boolean} True if the token is within the refresh token window or false otherwise.
   */
  needsRefresh() {
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
