import isEqual from 'lodash/isEqual';
import TokenData from './TokenData';
import type {
  GuestTokenRequester,
  OptionsStorageProvider,
  OptionsStorageSerializer,
  UserTokenRequester,
} from '../types/TokenManagerOptions.types';
import type { ITokenData } from './types/TokenData.types';
import type { TokenChangesListeners } from './types/TokenChangesListeners.types';

let TokenListenerIdInternalCount = 0;

/**
 * Base class for a token provider. Provides the base methods required to renew,
 * save and clear tokens.
 */
class TokenProvider {
  canSaveTokenDataFlag: boolean;
  requester: UserTokenRequester | GuestTokenRequester;
  storageKey?: string;
  storageProvider?: OptionsStorageProvider;
  tokenChangesListeners: Array<TokenChangesListeners>;
  tokenData: TokenData | null;
  tokenDataSerializer?: OptionsStorageSerializer;
  userId?: number;
  /**
   * Constructs a new TokenProvider instance.
   *
   * @param requester           - A function that will be responsible to request new tokens. If async,
   *                              the call will be awaited.
   * @param storageProvider     - An object implementing the Storage API's methods getItem, setItem and
   *                              removeItem. If those methods are async, the calls will be awaited.
   * @param tokenDataSerializer - An object implementing the serializeTokenData and deserializeTokenData
   *                              methods. If storage provider is defined, tokenDataSerializer is
   *                              required.
   * @param storageKey          - The storage key that will be used on the calls to storageProvider's
   *                              methods as the key argument.
   */
  constructor(
    requester: UserTokenRequester | GuestTokenRequester,
    storageProvider?: OptionsStorageProvider,
    tokenDataSerializer?: OptionsStorageSerializer,
    storageKey?: string,
  ) {
    this.requester = requester;
    this.storageProvider = storageProvider;
    this.tokenDataSerializer = tokenDataSerializer;
    this.storageKey = storageKey;
    this.tokenData = null;
    this.userId = undefined;
    this.tokenChangesListeners = [];
    this.canSaveTokenDataFlag = true;
  }

  /**
   * Returns the current user id associated with this token provider instance.
   *
   * @returns The current user id associated with this token provider instance or undefined if not set.
   */
  getUserId() {
    return this.userId;
  }

  /**
   * Returns the most recently cached access token or undefined if no access token is
   * available.
   *
   * @returns The most recently cached access token or undefined if no access token is available.
   */
  getCachedAccessToken() {
    return this.tokenData?.accessToken;
  }

  /**
   * Sets token data with this instance which will trigger the onTokenDataChanged
   * method.
   *
   * @param tokenData - Token data to be set.
   *
   * @returns Promise that will be resolved after the call to onTokenDataChanged returns.
   */
  async setTokenData(tokenData: TokenData | null) {
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
   * @returns The currently set token data.
   */
  getTokenData(): ITokenData | null {
    return this.tokenData;
  }

  /**
   * Gets the kind of tokens that are supported by this provider.
   *
   * @returns The kind of tokens supported.
   */
  getSupportedTokenKind() {
    throw new TypeError('Not implemented exception');
  }

  async invalidateCurrentAccessToken() {
    if (this.tokenData) {
      const newTokenData = new TokenData({ ...this.tokenData });
      delete newTokenData.accessToken;
      await this.setTokenData(newTokenData);
    }

    return Promise.resolve();
  }

  /**
   * Sets user id with this instance. Will trigger a call to onTokenDataChanged if
   * the passed user id is different than the current one set. This is what will make
   * the association of a previously obtained access token with a user id because the
   * data returned from the token creation endpoints does not contain the user id
   * yet.
   *
   * @param userId - The user id to set.
   *
   * @returns Promise that will be resolved after the call to onTokenDataChanged returns.
   */
  async setUserId(userId: number) {
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
   * Clears all data from memory and triggers onTokenDataChanged to remove data from
   * storage, if provided.
   *
   * @returns Promise that will be resolved after the call to onTokenDataChanged returns.
   */
  async clearData() {
    this.tokenData = null;
    this.userId = undefined;

    await this.onTokenDataChanged();
  }

  /**
   * Method responsible to get valid access tokens. It must be implemented by a
   * subclass.
   *
   * @returns Promise that will be resolved with a valid access token to be used.
   */
  getAccessToken() {
    throw new TypeError('Not implemented exception');
  }

  /**
   * Method responsible to load access tokens from storage, if available.
   *
   * @returns Promise that will be resolved when the storageProvider's getItem method is finished.
   */
  async load() {
    if (!this.storageProvider) {
      return Promise.resolve(null);
    }

    let savedData;

    if (this.storageKey) {
      savedData = await this.storageProvider.getItem(this.storageKey);
    }

    if (savedData) {
      const deserializedTokenData =
        this.tokenDataSerializer?.deserializeTokenData(savedData);

      /* istanbul ignore else */
      if (deserializedTokenData) {
        this.tokenData = new TokenData(deserializedTokenData);

        if (this.tokenData && this.tokenData.userId) {
          this.userId = this.tokenData.userId;
        }
      }
    }

    return Promise.resolve(null);
  }

  /**
   * Called after the token data has changed. Will persist token data if a storage
   * provider instance is provided.
   *
   * @returns Promise that will be resolved when the call to storageProvider's methods are finished.
   */
  async onTokenDataChanged() {
    if (!!this.storageProvider) {
      // First we check if tokenData is null because calling setItem on react native's async storage
      // with a null value, will crash
      if (!this.tokenData && this.storageKey) {
        await this.storageProvider.removeItem(this.storageKey);
      } else if (
        this.canSaveTokenData() &&
        this.storageKey &&
        this.tokenDataSerializer
      ) {
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
   * @param newTokenData - The new token data.
   */
  invokeTokenChangedListeners(newTokenData: ITokenData | null) {
    this.tokenChangesListeners.forEach((listener: TokenChangesListeners) => {
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
   * Method that checks if this instance is fully configured to accept retrieve
   * access token requests.
   *
   * @returns True if the instance is ready to retrieve tokens and false otherwise.
   */
  canRetrieveTokens() {
    return false;
  }

  /**
   * Adds a listener to token data changes.
   *
   * @param tokenChangesListener - The listener to add.
   *
   * @returns The id of the listener in order to be used on the removeTokenChangesListener function.
   */
  addTokenChangesListener(
    tokenChangesListener: (tokenData?: ITokenData | null) => void,
  ) {
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
   * @param tokenChangesListenerId - The id of the listener to remove.
   */
  removeTokenChangesListener(tokenChangesListenerId: number) {
    const listenerIndex = this.tokenChangesListeners.findIndex(
      (listener: TokenChangesListeners) =>
        listener.id === tokenChangesListenerId,
    );

    if (listenerIndex !== -1) {
      this.tokenChangesListeners.splice(listenerIndex, 1);
    }
  }

  /**
   * Returns if the current token data can be persisted in storage.
   *
   * By default returns true only if both the storage provider and
   * canSaveTokenDataFlag are true.
   *
   * @returns If the token can be saved.
   */
  canSaveTokenData() {
    return this.canSaveTokenDataFlag;
  }

  /**
   * Sets the flag that enables/disables the saving of token data in storage.
   *
   * @throws
   * TypeError if not receiving a boolean.
   *
   * @param canSaveTokenData - If the token can be saved or not.
   */
  setCanSaveTokenData(canSaveTokenData: boolean) {
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
