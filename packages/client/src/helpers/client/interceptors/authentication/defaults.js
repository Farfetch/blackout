import CryptoJS from 'crypto-js';

/**
 * Formats the authorization request header with the passed in access token.
 *
 * @param {string} accessToken - The access token to be included in the authorization header.
 *
 * @returns {(string|null)} The authorization request header with the access token included or null if no access token is passed.
 */
export const defaultAuthorizationHeaderFormatter = accessToken => {
  if (!accessToken) {
    return null;
  }

  return 'Bearer ' + accessToken;
};

/**
 * Creates a token data serializer to be used in AxiosAuthenticationTokenManager's storage.serializer
 * option. It uses cryptojs's AES algorithm to encrypt data with the passed in secret key.
 * Please notice that as the key lives on the front-end, an attacker will always be able to obtain it
 * and get access to the decrypted data, so this will only make it a little bit harder for an attacker to obtain
 * the saved token data.
 *
 * @param {string} secretKey - The key to be used to encrypt token data.
 *
 * @returns {object} Object implementing serializeTokenData and deserializeTokenData methods to be used in AxiosAuthenticationTokenManager's storage.serializer option.
 */
export const getDefaultTokenDataSerializer = secretKey => {
  return {
    serializeTokenData: tokenData => {
      return CryptoJS.AES.encrypt(
        JSON.stringify(tokenData),
        secretKey,
      ).toString();
    },
    deserializeTokenData: rawData => {
      const bytes = CryptoJS.AES.decrypt(rawData, secretKey);

      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    },
  };
};
