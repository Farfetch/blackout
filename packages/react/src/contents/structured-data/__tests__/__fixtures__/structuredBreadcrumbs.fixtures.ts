export const breadcrumbs = [
  {
    name: 'Home',
    url: '/',
    text: 'Home',
  },
  {
    name: 'Women',
    url: '/en-pt/shopping/women',
    text: 'Women',
  },
  {
    name: 'Clothing',
    url: '/en-pt/shopping/women-clothing',
    text: 'Clothing',
  },
];

export const breadcrumbsResult = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': '/',
        name: 'Home',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@id': '/en-pt/shopping/women',
        name: 'Women',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@id': '/en-pt/shopping/women-clothing',
        name: 'Clothing',
      },
    },
  ],
};

export const breadcrumbsResultEmpty = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [],
};
