export const productResult = {
  '@context': 'http://schema.org/',
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
    name: 'acme',
  },
  offers: {
    '@context': 'http://schema.org/',
    '@type': 'Offer',
    url: '/en-pt/shopping/lsp-camille-bubble-gum-skirt-15092735',
    price: 771,
    priceCurrency: 'EUR',
    itemCondition: 'http://schema.org/NewCondition',
    availability: 'http://schema.org/OutOfStock',
    seller: {
      '@type': 'Organization',
      name: 'Seller',
    },
  },
};

export const productResultWithStock = {
  '@context': 'http://schema.org/',
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
    name: 'acme',
  },
  offers: {
    '@context': 'http://schema.org/',
    '@type': 'Offer',
    url: '/en-pt/shopping/lsp-camille-bubble-gum-skirt-15092735',
    price: 771,
    priceCurrency: 'EUR',
    itemCondition: 'http://schema.org/NewCondition',
    availability: 'http://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Seller',
    },
  },
};

export const resultNoProduct = {
  '@context': 'http://schema.org/',
  '@type': 'Product',
  name: undefined,
  description: undefined,
  image: undefined,
  sku: undefined,
  productID: undefined,
  mpn: undefined,
  color: undefined,
  category: 'Women',
  brand: { '@type': 'Brand', name: undefined },
  offers: {
    '@context': 'http://schema.org/',
    '@type': 'Offer',
    url: '/en-pt/shopping/lsp-camille-bubble-gum-skirt-15092735',
    price: undefined,
    priceCurrency: undefined,
    itemCondition: 'http://schema.org/NewCondition',
    availability: 'http://schema.org/OutOfStock',
    priceValidUntil: undefined,
    seller: { '@type': 'Organization', name: 'Seller' },
  },
};
