import isEqual from 'lodash/isEqual';
import TokenData from './TokenData';
import TokenKinds from './TokenKinds';

let TokenListenerIdInternalCount = 0;

/**
 * Base class for a token provider.
 * Provides the base methods required to renew, save and clear tokens.
 */
class TokenProvider {
  /**
   * Constructs a new TokenProvider instance.
   *
   * @param {Function} requester - A function that will be responsible to request new tokens. If async, the call will be awaited.
   * @param {object} [storageProvider] - An object implementing the Storage API's methods getItem, setItem and removeItem. If those methods are async, the calls will be awaited.
   * @param {object} [tokenDataSerializer] - An object implementing the serializeTokenData and deserializeTokenData methods. If storage provider is defined, tokenDataSerializer is required.
   * @param {string} [storageKey] - The storage key that will be used on the calls to storageProvider's methods as the key argument.
   */
  constructor(requester, storageProvider, tokenDataSerializer, storageKey) {
    this.requester = requester;
    this.storageProvider = storageProvider;
    this.tokenDataSerializer = tokenDataSerializer;
    this.storageKey = storageKey;
    this.tokenData = null;
    this.userId = null;
    this.tokenChangesListeners = [];
    this.canSaveTokenDataFlag = true;
  }

  /**
   * Returns the current user id associated with this token provider instance.
   *
   * @returns {(number | undefined)} The current user id associated with this token provider instance or undefined if not set.
   */
  getUserId() {
    return this.userId;
  }

  /**
   * Returns the most recently cached access token or undefined if no access token is available.
   *
   * @returns {(string | undefined)} The most recently cached access token or undefined if no access token is available.
   */
  getCachedAccessToken() {
    return this.tokenData?.accessToken;
  }

  /**
   * Sets token data with this instance which will trigger the onTokenDataChanged method.
   *
   * @param {TokenData} tokenData - Token data to be set.
   *
   * @async
   * @returns {Promise} Promise that will be resolved after the call to onTokenDataChanged returns.
   */
  async setTokenData(tokenData) {
    if (isEqual(this.tokenData, tokenData)) {
      return;
    }

    this.tokenData = tokenData;

    const tokenDataUserId = this.tokenData?.userId;

    if (tokenDataUserId) {
      this.userId = tokenDataUserId;
    }

    await this.onTokenDataChanged();
  }

  /**
   * Gets the currently set token data via setTokenData function.
   *
   * @returns {object} The currently set token data.
   */
  getTokenData() {
    return this.tokenData;
  }

  /**
   * Gets the kind of tokens that are supported by this
   * provider.
   *
   * @returns {TokenKinds} The kind of tokens supported.
   */
  getSupportedTokenKind() {
    throw new TypeError('Not implemented exception');
  }

  async invalidateCurrentAccessToken() {
    if (this.tokenData) {
      const newTokenData = { ...this.tokenData };
      delete newTokenData.accessToken;
      await this.setTokenData(newTokenData);
    }

    return Promise.resolve();
  }

  /**
   * Sets user id with this instance. Will trigger a call to onTokenDataChanged if the passed user id
   * is different than the current one set. This is what will make the association of a previously obtained
   * access token with a user id because the data returned from the token creation endpoints
   * does not contain the user id yet.
   *
   * @param {number} userId - The user id to set.
   *
   * @async
   * @returns {Promise} Promise that will be resolved after the call to onTokenDataChanged returns.
   */
  async setUserId(userId) {
    /* istanbul ignore else */
    if (this.userId !== userId) {
      this.userId = userId;

      // As setUserId can be called before a token data is obtained, we need to check
      // again if there is a value on the this.tokenData to avoid storing only the userId.
      if (this.tokenData && this.tokenData.userId !== this.userId) {
        this.tokenData = new TokenData({
          ...this.tokenData,
          userId,
        });

        await this.onTokenDataChanged();
      }
    }
  }

  /**
   * Clears all data from memory and triggers onTokenDataChanged to remove data from storage, if provided.
   *
   * @async
   * @returns {Promise} Promise that will be resolved after the call to onTokenDataChanged returns.
   */
  async clearData() {
    this.tokenData = undefined;
    this.userId = undefined;

    await this.onTokenDataChanged();
  }

  /**
   * Method responsible to get valid access tokens.
   * It must be implemented by a subclass.
   *
   * @param {boolean} useCache - If cache should be used or not.
   *
   * @returns {Promise} Promise that will be resolved with a valid access token to be used.
   */
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  getAccessToken(useCache) {
    throw new TypeError('Not implemented exception');
  }

  /**
   * Method responsible to load access tokens from storage, if available.
   *
   * @async
   * @returns {Promise} Promise that will be resolved when the storageProvider's getItem method is finished.
   */
  async load() {
    if (!this.storageProvider) {
      return Promise.resolve(null);
    }

    const savedData = await this.storageProvider.getItem(this.storageKey);

    if (savedData) {
      const deserializedTokenData =
        this.tokenDataSerializer.deserializeTokenData(savedData);

      /* istanbul ignore else */
      if (deserializedTokenData) {
        this.tokenData = new TokenData(deserializedTokenData);

        if (this.tokenData && this.tokenData.userId) {
          this.userId = this.tokenData.userId;
        }
      }
    }
  }

  /**
   * Called after the token data has changed.
   * Will persist token data if a storage provider instance is provided.
   *
   * @async
   * @returns {Promise} Promise that will be resolved when the call to storageProvider's methods are finished.
   */
  async onTokenDataChanged() {
    if (!!this.storageProvider) {
      // First we check if tokenData is null because calling setItem on react native's async storage
      // with a null value, will crash
      if (!this.tokenData) {
        await this.storageProvider.removeItem(this.storageKey);
      } else if (this.canSaveTokenData()) {
        await this.storageProvider.setItem(
          this.storageKey,
          this.tokenDataSerializer.serializeTokenData(this.tokenData),
        );
      }
    }

    this.invokeTokenChangedListeners(this.tokenData);
  }

  /**
   * Invokes token data changes listeners.
   *
   * @param {object} newTokenData - The new token data.
   */
  invokeTokenChangedListeners(newTokenData) {
    this.tokenChangesListeners.forEach(listener => {
      /* istanbul ignore else */
      if (typeof listener.callback === 'function') {
        try {
          listener.callback(newTokenData);
        } catch {
          // Ignore error for now
        }
      }
    });
  }

  /**
   * Method that checks if this instance is fully configured to accept retrieve access token requests.
   *
   * @returns {boolean} True if the instance is ready to retrieve tokens and false otherwise.
   */
  canRetrieveTokens() {
    return false;
  }

  /**
   * Adds a listener to token data changes.
   *
   * @param {Function} tokenChangesListener - The listener to add.
   *
   * @returns {number} The id of the listener in order to be used on the removeTokenChangesListener function.
   */
  addTokenChangesListener(tokenChangesListener) {
    const newListenerId = ++TokenListenerIdInternalCount;

    this.tokenChangesListeners.push({
      id: newListenerId,
      callback: tokenChangesListener,
    });

    return newListenerId;
  }

  /**
   * Removes a listener from the token data changes listeners list.
   *
   * @param {number} tokenChangesListenerId - The id of the listener to remove.
   */
  removeTokenChangesListener(tokenChangesListenerId) {
    const listenerIndex = this.tokenChangesListeners.findIndex(
      listener => listener.id === tokenChangesListenerId,
    );

    if (listenerIndex !== -1) {
      this.tokenChangesListeners.splice(listenerIndex, 1);
    }
  }

  /**
   * Returns if the current token data can be persisted in storage.
   *
   * By default returns true only if both the storage provider and canSaveTokenDataFlag are true.
   *
   * @returns {boolean} If the token can be saved.
   */
  canSaveTokenData() {
    return this.canSaveTokenDataFlag;
  }

  /**
   * Sets the flag that enables/disables the saving of token data
   * in storage.
   *
   * @throws TypeError if not receiving a boolean.
   *
   * @param {boolean} canSaveTokenData - If the token can be saved or not.
   */
  setCanSaveTokenData(canSaveTokenData) {
    if (typeof canSaveTokenData !== 'boolean') {
      throw new TypeError(
        `Called 'setCanSaveTokenData' with a value that is not a boolean: ${canSaveTokenData}`,
      );
    }

    if (this.canSaveTokenDataFlag !== canSaveTokenData) {
      this.canSaveTokenDataFlag = canSaveTokenData;

      /* istanbul ignore else */
      if (!this.canSaveTokenDataFlag) {
        this.clearData();
      }
    }
  }
}

export default TokenProvider;
