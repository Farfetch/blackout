import { StructuredProductData } from '../../../types';

export const product: StructuredProductData = {
  brandName: 'Acme',
  colorName: 'WHITE',
  currencyIsoCode: 'EUR',
  description: 'Belle skirt test',
  id: 15092735,
  images: [
    {
      url: 'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
    },
    {
      url: 'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
    },
  ],
  name: 'LSP CAMILLE BUBBLE GUM SKIRT',
  price: {
    includingTaxes: 771,
  },
  quantity: 0,
  mpn: undefined,
  sku: '000000000005933788',
  slug: 'lsp-camille-bubble-gum-skirt-15092735',
  url: '/en-pt/shopping/lsp-camille-bubble-gum-skirt-15092735',
  lastCategory: 'Women',
};

export const productWithQuantity = {
  ...product,
  quantity: 2,
};

export const productResult = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'LSP CAMILLE BUBBLE GUM SKIRT',
  description: 'Belle skirt test',
  image: [
    'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
    'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
  ],
  sku: '000000000005933788',
  productID: '15092735',
  color: 'WHITE',
  category: 'Women',
  brand: {
    '@type': 'Brand',
    name: 'Acme',
  },
  offers: {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    url: '/en-pt/shopping/lsp-camille-bubble-gum-skirt-15092735',
    price: 771,
    priceCurrency: 'EUR',
    itemCondition: 'https://schema.org/NewCondition',
    availability: 'https://schema.org/OutOfStock',
    seller: {
      '@type': 'Organization',
      name: 'Seller',
    },
  },
};

export const productResultWithStock = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'LSP CAMILLE BUBBLE GUM SKIRT',
  description: 'Belle skirt test',
  image: [
    'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
    'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
  ],
  sku: '000000000005933788',
  productID: '15092735',
  color: 'WHITE',
  category: 'Women',
  brand: {
    '@type': 'Brand',
    name: 'Acme',
  },
  offers: {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    url: '/en-pt/shopping/lsp-camille-bubble-gum-skirt-15092735',
    price: 771,
    priceCurrency: 'EUR',
    itemCondition: 'https://schema.org/NewCondition',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Seller',
    },
  },
};
