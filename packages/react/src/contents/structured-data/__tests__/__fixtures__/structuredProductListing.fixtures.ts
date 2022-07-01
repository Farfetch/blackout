import { product } from './structuredProduct.fixtures';
import { StructuredProductListing } from '../../../types';

export const productListing: StructuredProductListing = {
  entries: [
    {
      ...product,
    },
    {
      ...product,
      name: 'Queen Margaret GG Supreme Top Handle Bag',
      slug: 'queen-margaret-gg-supreme-top-handle-bag-15090902',
    },
  ],
  name: 'Products Listing',
  totalItems: 2,
};

export const productListingResult = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Products Listing',
  url: '/en-pt/shopping/women',
  numberOfItems: 2,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'LSP CAMILLE BUBBLE GUM SKIRT',
      url: '/en-pt/shopping/shopping/lsp-camille-bubble-gum-skirt-15092735',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Queen Margaret GG Supreme Top Handle Bag',
      url: '/en-pt/shopping/shopping/queen-margaret-gg-supreme-top-handle-bag-15090902',
    },
  ],
};
