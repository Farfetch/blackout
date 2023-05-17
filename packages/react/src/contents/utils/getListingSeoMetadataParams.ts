import { currencyFormatter } from '../../locale/index.js';
import { SeoPageType, SeoSubPageType } from '@farfetch/blackout-client';
import type { GetListingSeoMetadataParams } from '../types/index.js';

const SET_REGEX = /\.*\/(sets)\.*/;
const PricetypeFacetKey = 'pricetype';
const BrandFacetKey = 'brands';
const CategoriesFacetKey = 'categories';

const getListingSeoMetadataParams: GetListingSeoMetadataParams = ({
  location,
  totalItems = 0,
  filterSegments = [],
  listingName,
  lowestProductPrice = undefined,
  countryCode,
  cultureCode,
  currencyIsoCode,
  countryName,
  breadCrumbs = [],
}) => {
  const isOnSale =
    filterSegments?.find(facet => facet.key === PricetypeFacetKey)?.value === 1;

  const isSet = location.pathname.match(SET_REGEX);
  const path = `${location.pathname}${location.search}`;

  const brandName =
    filterSegments?.find(
      ({ key, fromQueryString }) => key === BrandFacetKey && !fromQueryString,
    )?.description || '';

  const formatCurrency = currencyFormatter(cultureCode, currencyIsoCode || '', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: false,
    style: 'currency',
  });

  const getLowestPrice = () => {
    return typeof lowestProductPrice === 'number' &&
      !isNaN(lowestProductPrice) &&
      totalItems > 0
      ? formatCurrency(lowestProductPrice)
      : undefined;
  };

  if (isSet) {
    return {
      path,

      pageType: SeoPageType.Sets,
      param: {
        Country: countryName,
        CountryCode: countryCode,
        SetName: listingName || '',
      },
      subPageType: SeoSubPageType.Default,
    };
  }

  const breadCrumbCategory = breadCrumbs?.[breadCrumbs.length - 1]?.text;
  const breadCrumbParentCategory = breadCrumbs?.[breadCrumbs.length - 2]?.text;
  const breadCrumbFirstLevelCategory = breadCrumbs?.[0]?.text;
  const categories = filterSegments
    ?.filter(({ key }) => key === CategoriesFacetKey)
    ?.sort((a, b) => b.deep - a.deep);

  const category = categories?.[0];
  const segmentCategoryName = category?.description;
  const deepLevel = category?.deep;
  const segmentParentCategory =
    (deepLevel &&
      categories?.find(({ deep }) => deep === deepLevel - 1)?.description) ||
    '';
  const segmentFirstLevelCategory =
    categories?.find(({ deep }) => deep === 1)?.description || '';
  const categoryID = categories?.[0]?.value;

  const subPageType = getSubPageType({
    hasBrands: !!brandName,
    hasCategories: !!categories?.length,
    isOnSale,
  });

  let categoryName = '';
  let firstLevelCategory = '';
  let parentCategory = '';

  switch (subPageType) {
    case SeoSubPageType.BrandCategory:
    case SeoSubPageType.BrandCategorySale:
      categoryName = segmentCategoryName || breadCrumbCategory || '';
      break;
    case SeoSubPageType.Category:
    case SeoSubPageType.CategorySale:
      categoryName = segmentCategoryName || breadCrumbCategory || '';
      parentCategory = breadCrumbParentCategory || segmentParentCategory || '';
      firstLevelCategory =
        breadCrumbFirstLevelCategory || segmentFirstLevelCategory || '';
      break;
  }

  const lowestPrice = getLowestPrice();

  return {
    path,
    pageType: SeoPageType.Listing,
    param: {
      TotalNumberItems: totalItems,
      LowestProductPrice: lowestPrice,
      Country: countryName,
      CountryCode: countryCode,
      BrandName: brandName,
      CategoryName: categoryName,
      ParentCategory: parentCategory,
      FirstLevelCategory: firstLevelCategory,
      ...(categoryID && { CategoryID: categoryID }),
    },
    subPageType,
  };
};

export const getSubPageType = ({
  hasBrands,
  hasCategories,
  isOnSale,
}: {
  hasBrands?: boolean;
  hasCategories?: boolean;
  isOnSale: boolean;
}) => {
  const subPageTypeSegments = [];

  if (hasBrands) {
    subPageTypeSegments.push(SeoSubPageType.Brand);
  }

  if (hasCategories) {
    subPageTypeSegments.push(SeoSubPageType.Category);
  }

  if (subPageTypeSegments?.length) {
    if (isOnSale) {
      subPageTypeSegments.push(SeoSubPageType.Sale);
    }

    return subPageTypeSegments.join('');
  }

  return SeoSubPageType.Default;
};

export default getListingSeoMetadataParams;
