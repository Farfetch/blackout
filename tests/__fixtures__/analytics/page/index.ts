import { pageTypes, PageviewEventData } from '@farfetch/blackout-analytics';
import bagPageData from './bagPageData.fixtures';
import homepagePageData from './homepagePageData.fixtures';
import searchPageData from './searchPageData.fixtures';
import wishlistPageData from './wishlistPageData.fixtures';

export type DefaultPageFixturesResult = PageviewEventData & {
  event: string;
};

export type PageFixtures = {
  [pageTypes.HOMEPAGE]: DefaultPageFixturesResult;
  [pageTypes.SEARCH]: DefaultPageFixturesResult;
  [pageTypes.BAG]: DefaultPageFixturesResult;
  [pageTypes.WISHLIST]: DefaultPageFixturesResult;
};

const pageFixtures: PageFixtures = {
  [pageTypes.HOMEPAGE]: homepagePageData,
  [pageTypes.SEARCH]: searchPageData,
  [pageTypes.BAG]: bagPageData,
  [pageTypes.WISHLIST]: wishlistPageData,
};

export default pageFixtures;
