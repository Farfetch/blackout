import {
  type EventData,
  PageType,
  type PageviewEventData,
  type TrackType,
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
  [pageType in PageType]: EventData<TrackType> & {
    event: PageType;
  };
};

const pageFixtures: Partial<PageFixtures> = {
  [PageType.Homepage]: homepagePageData,
  [PageType.Search]: searchPageData,
  [PageType.Bag]: bagPageData,
  [PageType.Wishlist]: wishlistPageData,
  [PageType.ProductListing]: listingPageData,
  [PageType.ProductDetails]: productPageData,
  [PageType.Checkout]: checkoutPageData,
};

export default pageFixtures;
