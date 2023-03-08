import {
  type EventData,
  PageTypes,
  type PageviewEventData,
  type TrackTypes,
} from '@farfetch/blackout-analytics';
import bagPageData from './bagPageData.fixtures.mjs';
import checkoutPageData from './checkoutPageData.fixtures.mjs';
import homepagePageData from './homepagePageData.fixtures.mjs';
import listingPageData from './listingPageData.fixtures.mjs';
import productPageData from './productPageData.fixtures.mjs';
import searchPageData from './searchPageData.fixtures.mjs';
import wishlistPageData from './wishlistPageData.fixtures.mjs';

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
