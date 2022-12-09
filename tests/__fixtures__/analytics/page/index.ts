import {
  EventData,
  PageTypes,
  PageviewEventData,
  TrackTypes,
} from '@farfetch/blackout-analytics';
import bagPageData from './bagPageData.fixtures';
import checkoutPageData from './checkoutPageData.fixtures';
import homepagePageData from './homepagePageData.fixtures';
import listingPageData from './listingPageData.fixtures';
import productPageData from './productPageData.fixtures';
import searchPageData from './searchPageData.fixtures';
import wishlistPageData from './wishlistPageData.fixtures';

export type DefaultPageFixturesResult = PageviewEventData & {
  event: string;
};

export type PageFixtures = {
  [pageType in PageTypes]: EventData<TrackTypes> & {
    event: PageTypes;
  };
};

const pageFixtures: Partial<PageFixtures> = {
  [PageTypes.HOMEPAGE]: homepagePageData,
  [PageTypes.SEARCH]: searchPageData,
  [PageTypes.BAG]: bagPageData,
  [PageTypes.WISHLIST]: wishlistPageData,
  [PageTypes.PRODUCT_LISTING]: listingPageData,
  [PageTypes.PRODUCT_DETAILS]: productPageData,
  [PageTypes.CHECKOUT]: checkoutPageData,
};

export default pageFixtures;
