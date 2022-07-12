export type ServerInitialState = {
  entities?: Partial<{
    code: string;
    cultures: Array<string>;
    currencies: Array<{
      isoCode: string;
      cultureCode: string;
    }>;
    newsletterSubscriptionOptionDefault: boolean;
    platformId: string;
    structure: Array<string>;
  }>;
  locale: {
    countryCode: string | null;
    sourceCountryCode: string | null;
  };
};
