import getProductSeoMetadataParams from '../getProductSeoMetadataParams';

const mockProduct = {
  price: {
    discount: {
      excludingTaxes: 0,
      includingTaxes: 0,
      rate: 0,
    },
    excludingTaxes: 30,
    formatted: {
      includingTaxes: '$30',
      includingTaxesWithoutDiscount: '$30',
    },
    includingTaxes: 30,
    includingTaxesWithoutDiscount: 30,
    promocode: {
      rate: 0,
    },
    tags: ['DAP'],
    taxes: {
      amount: 0,
      rate: 0,
      type: 'DAP',
    },
    isFormatted: true,
  },
  brand: {
    description: 'Yves Saint Laurent Beauty',
    id: 45511224,
    name: 'Yves Saint Laurent Beauty',
    priceType: 0,
    slug: 'yves-saint-laurent-beauty',
    overrideUrl: null,
  },
  categories: [
    {
      id: 144979,
      name: 'Makeup',
      parentId: 0,
      gender: 0,
    },
    {
      id: 144995,
      name: 'Eyes',
      parentId: 144979,
      gender: 0,
    },
    {
      id: 144997,
      name: 'Eye Shadow',
      parentId: 144995,
      gender: 0,
    },
  ],
  compositions: [],
  description:
    'A crease-proof eyeshadow packed with high-impact pigment for long-wearing color and shine.\n Enjoy intense color payoff and no fallout with this creamy, blendable formula. These rich, satin-finish shades set in a single stroke and bring an understated boldness to any eye color. Create a smoldering look for day or night using this couture collection that includes a radiant gold, a soft beige, a sophisticated brown, a transformative taupe, and a shimmery navy.\n',
  id: 18875198,
  shortDescription: 'Sequin Crush Mono Eyeshadow',
  color: 'EXPLOSIVE BROWN',
};

const mockResult = {
  pageType: 4,
  param: {
    ProductCategory: 'Eye Shadow',
    ProductCategoryName: 'Eye Shadow',
    ProductColor: 'EXPLOSIVE BROWN',
    ProductComposition1: undefined,
    ProductComposition2: undefined,
    ProductComposition3: undefined,
    ProductDescription:
      'A crease-proof eyeshadow packed with high-impact pigment for long-wearing color and shine.\n Enjoy intense color payoff and no fallout with this creamy, blendable formula. These rich, satin-finish shades set in a single stroke and bring an understated boldness to any eye color. Create a smoldering look for day or night using this couture collection that includes a radiant gold, a soft beige, a sophisticated brown, a transformative taupe, and a shimmery navy.\n',
    ProductName: 'Sequin Crush Mono Eyeshadow',
    ProductDesigner: 'Yves Saint Laurent Beauty',
  },
  subPageType: 'Default',
};

describe('getProductSeoMetadataParams', () => {
  it('should correctly return useSeoMetadata params for a PDP', () => {
    const params = getProductSeoMetadataParams(mockProduct);
    expect(params).toEqual(mockResult);
  });
});
