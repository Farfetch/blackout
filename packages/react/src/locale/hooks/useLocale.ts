import {
  getCountry,
  getCountryCode,
  getCountryCulture,
  getCountryStructure,
  getSourceCountryCode,
} from '@farfetch/blackout-redux';
import { useSelector } from 'react-redux';

export function useLocale() {
  // Selectors
  const countryCode = useSelector(getCountryCode);
  const countryCultureCode = useSelector(getCountryCulture);
  const sourceCountryCode = useSelector(getSourceCountryCode);
  const countryStructure = useSelector(getCountryStructure);
  const country = useSelector(getCountry);
  // Custom logic
  const subfolder = countryStructure?.replace(/(\/)/, '');
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
