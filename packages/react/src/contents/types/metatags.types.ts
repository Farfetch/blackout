import type {
  Brand,
  Composition,
  FilterSegment,
  Label,
  ProductsBreadcrumb,
  SeoPageType,
  SeoSubPageType,
} from '@farfetch/blackout-client';
import type { CategoryEntity, PriceAdapted } from '@farfetch/blackout-redux';

type MaskIcon = {
  rel: string;
  href?: string;
  color?: string;
};

type MetaName = 'description' | 'keywords';

export type AppIconLinks = Partial<{
  appleIcons: {
    href: string;
    sizes: string;
  }[];
  icons: {
    href: string;
    sizes: string;
  }[];
  maskIcon: Partial<MaskIcon>;
}>;

export type Meta = {
  name: MetaName;
  content: string;
};

export type Link = {
  rel: string;
  href: string;
  hreflang?: string;
};

export type ProductSeoMetadataParams = {
  pageType: SeoPageType;
  param: {
    ProductCategory?: string;
    ProductCategoryName?: string;
    ProductColor?: string;
    ProductComposition1?: Composition['material'];
    ProductComposition2?: Composition['material'];
    ProductComposition3?: Composition['material'];
    ProductDescription?: string;
    ProductName?: string;
    ProductDesigner?: string;
  };
  subPageType: SeoSubPageType;
};

export type GetProductSeoMetadataParams = (product: {
  price?: PriceAdapted;
  name?: string;
  shortDescription?: string;
  description?: string;
  compositions?: Composition[];
  color?: string;
  brand?: Brand | null;
  categories?: CategoryEntity[];
  label?: Label[];
}) => ProductSeoMetadataParams;

export type ListingSeoMetadataParams = {
  path?: string;
  pageType?: SeoPageType;
  pathname?: string;
  subPageType?: string;
  param: {
    SetName?: string;
    TotalNumberItems?: number;
    BrandName?: string;
    CategoryName?: string;
    FirstLevelCategory?: string;
    LowestProductPrice?: string | number | undefined;
    ParentLevelCategory?: string;
  };
};

export type GetListingSeoMetadataParams = (args: {
  location: { pathname: string; search: string };
  totalItems?: number;
  filterSegments?: FilterSegment[];
  listingName?: string | null;
  lowestProductPrice?: number;
  countryName: string;
  countryCode: string;
  cultureCode: string;
  currencyIsoCode: string;
  breadCrumbs?: ProductsBreadcrumb[];
}) => ListingSeoMetadataParams;
