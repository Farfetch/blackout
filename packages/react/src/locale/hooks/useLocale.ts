import {
  getCountry,
  getCountryCode,
  getCountryCulture,
  getSourceCountryCode,
  getSubfolder,
} from '@farfetch/blackout-redux';
import { useSelector } from 'react-redux';

export function useLocale() {
  // Selectors
  const countryCode = useSelector(getCountryCode);
  const countryCultureCode = useSelector(getCountryCulture);
  const sourceCountryCode = useSelector(getSourceCountryCode);
  const country = useSelector(getCountry);
  const subfolder = useSelector(getSubfolder);
  // Custom logic
  const currency = country?.currencies?.[0];

  return {
    data: {
      subfolder,
      countryCultureCode,
      countryCode,
      country,
      sourceCountryCode,
      currency,
    },
  };
}

export default useLocale;
