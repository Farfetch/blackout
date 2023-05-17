import { INITIAL_STATE_LOCALE } from './reducer.js';
import { isEmpty } from 'lodash-es';
import { normalize } from 'normalizr';
import country from '../entities/schemas/country.js';
import type { ServerInitialState } from '../types/serverInitialState.types.js';

/**
 * Converts server data for locale into store state.
 *
 * @param data - Params injected by the server.
 *
 * @returns - Initial state for the locale reducer.
 */

const localeServerInitialState: ServerInitialState = ({ model }) => {
  if (isEmpty(model)) {
    return { locale: INITIAL_STATE_LOCALE };
  }

  const {
    countryCode,
    countryId,
    cultureCode,
    currencyCode,
    currencyCultureCode,
    newsletterSubscriptionOptionDefault,
    requestSourceCountryCode,
    subfolder,
  } = model;
  // Normalize it
  const { entities } = normalize(
    {
      code: countryCode,
      cultures: [cultureCode],
      currencies: [
        {
          isoCode: currencyCode,
          cultureCode: currencyCultureCode,
        },
      ],
      newsletterSubscriptionOptionDefault,
      platformId: countryId,
      defaultCulture: cultureCode,
      defaultSubfolder: subfolder,
    },
    country,
  );

  return {
    locale: {
      countryCode,
      sourceCountryCode: requestSourceCountryCode,
      subfolder,
    },
    entities,
  };
};

export default localeServerInitialState;
