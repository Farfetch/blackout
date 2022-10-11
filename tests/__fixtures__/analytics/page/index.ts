import { pageTypes, PageviewEventData } from '@farfetch/blackout-analytics';
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

type pageEvents = keyof typeof pageTypes;

export type PageFixtures = {
  [event in typeof pageTypes[pageEvents]]?: DefaultPageFixturesResult;
};

const pageFixtures: PageFixtures = {
  [pageTypes.HOMEPAGE]: homepagePageData,
  [pageTypes.SEARCH]: searchPageData,
  [pageTypes.BAG]: bagPageData,
  [pageTypes.WISHLIST]: wishlistPageData,
  [pageTypes.PRODUCT_LISTING]: listingPageData,
  [pageTypes.PRODUCT_DETAILS]: productPageData,
  [pageTypes.CHECKOUT]: checkoutPageData,
};

export default pageFixtures;
