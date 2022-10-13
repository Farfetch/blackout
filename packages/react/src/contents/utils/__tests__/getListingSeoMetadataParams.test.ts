import { mockFilterSegments } from './__fixtures__/getListingSeoMetadataParams.fixtures';
import getListingSeoMetadataParams, {
  getSubPageType,
} from '../getListingSeoMetadataParams';

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
        Country: '',
        CountryCode: 'US',
        CategoryName: 'Beauty',
        FirstLevelCategory: 'Beauty',
        ParentCategory: '',
        LowestProductPrice: '$1',
      },
      subPageType: 'CategorySale',
    });
  });

  it('should return params for a category listing', () => {
    const props = {
      location: {
        pathname: '/shopping',
        search: '?categories=136000&pageindex=1',
      },
      totalItems: 10,
      filterSegments: [mockFilterSegments.belts],
      listingName: '',
      countryCode: 'US',
      currencyIsoCode: 'USD',
      countryName: 'United States',
      lowestProductPrice: 1,
    };

    const result = getListingSeoMetadataParams(props);

    expect(result).toEqual({
      path: '/shopping?categories=136000&pageindex=1',
      pageType: 2,
      param: {
        TotalNumberItems: 10,
        BrandName: '',
        CategoryName: 'Belts',
        CategoryID: 136000,
        FirstLevelCategory: '',
        ParentCategory: '',
        Country: 'United States',
        CountryCode: 'US',
        LowestProductPrice: '$1',
      },
      subPageType: 'Category',
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
        Country: '',
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

    expect(subPageType).toEqual('Default');
  });

  it('should return BrandSale', () => {
    const subPageType = getSubPageType({
      isOnSale: true,
      hasBrands: true,
    });

    expect(subPageType).toEqual('BrandSale');
  });

  it('should return Brand', () => {
    const subPageType = getSubPageType({
      isOnSale: false,
      hasBrands: true,
    });

    expect(subPageType).toEqual('Brand');
  });

  it('should return BrandCategory', () => {
    const subPageType = getSubPageType({
      isOnSale: false,
      hasBrands: true,
      hasCategories: true,
    });

    expect(subPageType).toEqual('BrandCategory');
  });

  it('should return BrandCategorySale', () => {
    const subPageType = getSubPageType({
      isOnSale: true,
      hasBrands: true,
      hasCategories: true,
    });

    expect(subPageType).toEqual('BrandCategorySale');
  });

  it('should return Category', () => {
    const subPageType = getSubPageType({
      isOnSale: false,
      hasCategories: true,
    });

    expect(subPageType).toEqual('Category');
  });

  it('should return CategorySale', () => {
    const subPageType = getSubPageType({
      isOnSale: true,
      hasCategories: true,
    });

    expect(subPageType).toEqual('CategorySale');
  });
});
