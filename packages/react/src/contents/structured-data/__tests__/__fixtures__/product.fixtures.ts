export const product = {
  productDetail: {
    brand: { name: 'Acme' },
    categories: [138235, 138236, 138283, 139118],
    colors: [
      {
        color: {
          id: 112496,
          name: 'WHITE',
        },
      },
    ],
    currencyIsoCode: 'EUR',
    description: 'Belle skirt test',
    id: 15092735,
    images: [
      {
        order: 1,
        size: '200',
        sources: {
          200: 'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
        },
        url: 'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
      },
      {
        order: 2,
        size: '200',
        sources: {
          200: 'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
        },
        url: 'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
      },
    ],
    name: 'LSP CAMILLE BUBBLE GUM SKIRT',
    parentProductId: 0,
    preferedMerchant: { merchantId: 12455 },
    price: {
      includingTaxes: 771,
      includingTaxesWithoutDiscount: 771,
      excludingTaxes: 626.83,
    },
    quantity: 0,
    mpn: undefined,
    sku: '000000000005933788',
    slug: 'lsp-camille-bubble-gum-skirt-15092735',
    url: '/en-pt/shopping/lsp-camille-bubble-gum-skirt-15092735',
  },
  lastCategory: 'Women',
  url: '/en-pt/shopping/lsp-camille-bubble-gum-skirt-15092735',
  seller: 'Seller',
};

export const productWithQuantity = {
  ...product.productDetail,
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
