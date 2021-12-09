import { pageTypes } from '@farfetch/blackout-analytics';
import bagPageData from './bagPageData.fixtures';
import homepagePageData from './homepagePageData.fixtures';
import searchPageData from './searchPageData.fixtures';
import wishlistPageData from './wishlistPageData.fixtures';

export default {
  [pageTypes.HOMEPAGE]: homepagePageData,
  [pageTypes.SEARCH]: searchPageData,
  [pageTypes.BAG]: bagPageData,
  [pageTypes.WISHLIST]: wishlistPageData,
};
