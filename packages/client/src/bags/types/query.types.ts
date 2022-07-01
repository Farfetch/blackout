export type BagQueryBase = {
  includeOutOfStock?: boolean;
};

export type GetBagQuery = BagQueryBase;
export type DeleteBagItemQuery = BagQueryBase;
export type PostBagItemQuery = BagQueryBase;
export type PatchBagItemQuery = BagQueryBase;
