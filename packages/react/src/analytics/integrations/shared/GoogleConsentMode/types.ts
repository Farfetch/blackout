import { type ConsentData } from '@farfetch/blackout-analytics';

export enum GoogleConsentType {
  Granted = 'granted',
  Denied = 'denied',
}

export type GoogleConsentCategoryConfig = {
  categories?: Array<string>; // the consent category associated with element
  default?: GoogleConsentType;
  getConsentValue?: (consentData: ConsentData) => GoogleConsentType;
};

export type GoogleConsentMappingsBase<T> = {
  ad_storage: T;
  ad_user_data: T;
  ad_personalization: T;
  analytics_storage: T;
};

export type GoogleConsentRegionConfig = Partial<
  GoogleConsentMappingsBase<GoogleConsentType>
> & { region: Array<string> };

export type GoogleConsentModeConfig =
  GoogleConsentMappingsBase<GoogleConsentCategoryConfig> & {
    regions?: Array<GoogleConsentRegionConfig>;
    waitForUpdate?: number;
    mode?: 'Basic' | 'Advanced';
  };
