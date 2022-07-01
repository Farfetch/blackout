import { INITIAL_STATE_LOCALE } from './reducer';
import { normalize } from 'normalizr';
import country from '../entities/schemas/country';
import isEmpty from 'lodash/isEmpty';
import type { ServerInitialState } from '../types/serverInitialState.types';

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
    sourceCountryCode,
    defaultCulture,
    defaultSubfolder,
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
      defaultCulture,
      defaultSubfolder,
    },
    country,
  );

  return {
    locale: {
      countryCode,
      sourceCountryCode,
    },
    entities,
  };
};

export default localeServerInitialState;
