import { INITIAL_STATE } from './reducer';
import { normalize } from 'normalizr';
import country from '../entities/schemas/country';
import isEmpty from 'lodash/isEmpty';
import type { Model } from '../types';
import type { ServerInitialState } from './types';

/**
 * Converts server data for locale into store state.
 *
 * @param data - Params injected by the server.
 *
 * @returns - Initial state for the locale reducer.
 */
export default ({ model }: { model: Model }): ServerInitialState => {
  if (isEmpty(model)) {
    return { locale: INITIAL_STATE };
  }

  const {
    countryCode,
    countryId,
    cultureCode,
    currencyCode,
    currencyCultureCode,
    newsletterSubscriptionOptionDefault,
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
      structure: subfolder,
    },
    country,
  );

  return {
    locale: {
      countryCode,
    },
    entities,
  };
};
