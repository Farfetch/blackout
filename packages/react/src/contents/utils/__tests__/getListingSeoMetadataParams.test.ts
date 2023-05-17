import { mockFilterSegments } from './__fixtures__/getListingSeoMetadataParams.fixtures.js';
import getListingSeoMetadataParams, {
  getSubPageType,
} from '../getListingSeoMetadataParams.js';

describe('getListingSeoMetadataParams', () => {
  it('should return params for a category listing', () => {
    const props = {
      location: {
        pathname: '/shopping',
        search: '?categories=137569&pageindex=1',
      },
      totalItems: 10026,
      filterSegments: [mockFilterSegments.beauty],
      listingName: '',
      countryCode: 'US',
      cultureCode: 'en-US',
      countryName: 'United States',
      currencyIsoCode: 'USD',
      lowestProductPrice: 1,
    };

    const result = getListingSeoMetadataParams(props);

    expect(result).toEqual({
      path: '/shopping?categories=137569&pageindex=1',
      pageType: 2,
      param: {
        TotalNumberItems: 10026,
        BrandName: '',
        CategoryID: 137569,
        CategoryName: 'Beauty',
        ParentCategory: '',
        FirstLevelCategory: 'Beauty',
        LowestProductPrice: '$1',
        Country: 'United States',
        CountryCode: 'US',
      },
      subPageType: 'Category',
    });
  });

  it('should return params for a category listing with breadcrumbs', () => {
    const props = {
      location: {
        pathname: '/shopping/christmas-decorations-baubles',
        search: '',
      },
      totalItems: 10026,
      filterSegments: [mockFilterSegments.baubles],
      listingName: '',
      countryName: 'United States',
      cultureCode: 'en-US',
      currencyIsoCode: 'USD',
      lowestProductPrice: 1,
      countryCode: 'US',
      breadCrumbs: [
        {
          text: 'Christmas',
          slug: null,
          link: '/shopping/christmas',
          parent: false,
        },
        {
          text: 'Decorations',
          slug: null,
          link: '/shopping/christmas-decorations',
          parent: false,
        },
        {
          text: 'Baubles',
          slug: null,
          link: '/shopping/christmas-decorations-baubles',
          parent: false,
        },
      ],
    };

    const result = getListingSeoMetadataParams(props);

    expect(result).toEqual({
      path: '/shopping/christmas-decorations-baubles',
      pageType: 2,
      param: {
        BrandName: '',
        TotalNumberItems: 10026,
        CategoryID: 141514,
        FirstLevelCategory: 'Christmas',
        ParentCategory: 'Decorations',
        CategoryName: 'Baubles',
        Country: 'United States',
        CountryCode: 'US',
        LowestProductPrice: '$1',
      },
      subPageType: 'Category',
    });
  });

  it('should return params for a sale category listing', () => {
    const props = {
      location: {
        pathname: '/shopping/sale',
        search: '?categories=137569&pageindex=1',
      },
      totalItems: 73,
      filterSegments: [mockFilterSegments.pricetype, mockFilterSegments.beauty],
      countryCode: 'US',
      cultureCode: 'en-US',
      countryName: 'United States',
      currencyIsoCode: 'USD',
      lowestProductPrice: 1,
    };

    const result = getListingSeoMetadataParams(props);

    expect(result).toEqual({
      path: '/shopping/sale?categories=137569&pageindex=1',
      pageType: 2,
      param: {
        TotalNumberItems: 73,
        BrandName: '',
        CategoryID: 137569,
        Country: 'United States',
        CountryCode: 'US',
        CategoryName: 'Beauty',
        FirstLevelCategory: 'Beauty',
        ParentCategory: '',
        LowestProductPrice: '$1',
      },
      subPageType: 'CategorySale',
    });
  });

  it('should return params for a brand listing', () => {
    const props = {
      location: {
        pathname: '/shopping/chanel',
        search: '',
      },
      totalItems: 27,
      filterSegments: [mockFilterSegments.chanel],
      countryCode: 'US',
      countryName: 'United States',
      cultureCode: 'en-US',
      currencyIsoCode: 'USD',
      lowestProductPrice: 1,
    };

    const result = getListingSeoMetadataParams(props);

    expect(result).toEqual({
      path: '/shopping/chanel',
      pageType: 2,
      param: {
        TotalNumberItems: 27,
        BrandName: 'CHANEL',
        CategoryName: '',
        Country: 'United States',
        CountryCode: 'US',
        FirstLevelCategory: '',
        ParentCategory: '',
        LowestProductPrice: '$1',
      },
      subPageType: 'Brand',
    });
  });

  it('should return params for a set', () => {
    const props = {
      location: {
        pathname: '/sets/trending-items',
        search: '',
        hash: '',
      },
      totalItems: 6,
      filterSegments: [],
      listingName: 'Trending Items',
      countryCode: 'US',
      cultureCode: 'en-US',
      currencyIsoCode: 'USD',
      countryName: 'United States',
      lowestProductPrice: 1,
    };

    const result = getListingSeoMetadataParams(props);

    expect(result).toEqual({
      path: '/sets/trending-items',
      pageType: 3,
      param: {
        SetName: 'Trending Items',
        Country: 'United States',
        CountryCode: 'US',
      },
      subPageType: 'Default',
    });
  });
});

describe('getSubPageType', () => {
  it('should return Default', () => {
    const subPageType = getSubPageType({
      isOnSale: false,
    });

    expect(subPageType).toBe('Default');
  });

  it('should return BrandSale', () => {
    const subPageType = getSubPageType({
      isOnSale: true,
      hasBrands: true,
    });

    expect(subPageType).toBe('BrandSale');
  });

  it('should return Brand', () => {
    const subPageType = getSubPageType({
      isOnSale: false,
      hasBrands: true,
    });

    expect(subPageType).toBe('Brand');
  });

  it('should return BrandCategory', () => {
    const subPageType = getSubPageType({
      isOnSale: false,
      hasBrands: true,
      hasCategories: true,
    });

    expect(subPageType).toBe('BrandCategory');
  });

  it('should return BrandCategorySale', () => {
    const subPageType = getSubPageType({
      isOnSale: true,
      hasBrands: true,
      hasCategories: true,
    });

    expect(subPageType).toBe('BrandCategorySale');
  });

  it('should return Category', () => {
    const subPageType = getSubPageType({
      isOnSale: false,
      hasCategories: true,
    });

    expect(subPageType).toBe('Category');
  });

  it('should return CategorySale', () => {
    const subPageType = getSubPageType({
      isOnSale: true,
      hasCategories: true,
    });

    expect(subPageType).toBe('CategorySale');
  });
});
