import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetAccountSetting } from './types/index.js';

/**
 * Method responsible for getting a setting by its id.
 *
 * @param settingId  - Id that identifies the setting.
 * @param config - Custom settings to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getAccountSetting: GetAccountSetting = (settingId, config) =>
  client
    .get(join('/account/v1/settings', settingId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getAccountSetting;
