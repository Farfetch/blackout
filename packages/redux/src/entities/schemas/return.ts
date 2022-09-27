import { adaptDate } from '../../helpers/adapters';
import { schema } from 'normalizr';
import omit from 'lodash/omit';
import returnItem from './returnItem';

export default new schema.Entity(
  'returns',
  { items: [returnItem] },
  {
    processStrategy: value => {
      const item = omit(value, [
        'baseUrl',
        'clientOnlyPage',
        'components',
        'countryCode',
        'countryId',
        'cultureCode',
        'currencyCode',
        'currencyCultureCode',
        'dataLayer',
        'isMobileDevice',
        'newsletterSubscriptionOptionDefault',
        'pageContent',
        'pageType',
        'redirectUrl',
        'relativeUrl',
        'requestSourceCountryCode',
        'returnUrl',
        'screenPixelsHeight',
        'screenPixelsWidth',
        'seoMetadata',
        'seoPageType',
        'serverSideJsApp',
        'siteKeys',
        'slug',
        'staticPath',
        'subfolder',
        'translationsUrl',
      ]);

      item.availableDates =
        item.availableDates && item.availableDates.map(adaptDate);
      item.createdDate = item.createdDate && adaptDate(item.createdDate);
      item.maximumDateForPickup =
        item.maximumDateForPickup && adaptDate(item.maximumDateForPickup);
      item.pickupSchedule = {
        end: item.pickupSchedule && adaptDate(item.pickupSchedule.end),
        start: item.pickupSchedule && adaptDate(item.pickupSchedule.start),
      };

      return item;
    },
  },
);
