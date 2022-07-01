export enum DigitalAssetType {
  Default,
  ItemSwatch,
}

export type DigitalAsset = {
  mediaType: string;
  displayOrder: number;
  size: string;
  url: string;
  type: DigitalAssetType;
};
