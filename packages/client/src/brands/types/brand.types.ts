export type Brand = {
  id: number;
  name: string;
  description: string | null;
  familyType?: BrandFamilyType;
  slug?: string;
  priceType?: number;
  isActive?: boolean;
};

export enum BrandFamilyType {
  MainBrand = 'MainBrand',
  SubBrand = 'SubBrand',
  Collaboration = 'Collaboration',
  Beauty = 'Beauty',
  PreOwned = 'PreOwned',
}
