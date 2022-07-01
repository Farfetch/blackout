enum Type {
  Default,
  ItemSwatch,
}

export type DigitalAsset = {
  mediaType: string;
  displayOrder: number;
  size: string;
  url: string;
  type: Type;
};
