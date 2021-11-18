export const article = {
  date: {
    publicationDate: '2020-07-13T15:01:55.4526159Z',
    modificationDate: '2020-07-13T15:01:55.4526159Z',
  },
  breadcrumbs: [{ text: 'Homepage' }],
  url: '/',
  title: 'Homepage Title',
  image:
    '/BWStaticContent/50000/f6d2bfbd-cc5f-48b4-99d1-77b18d8dc52d_d-homepage-masthead-10p-store.jpg',
  author: 'Author',
  publisher: {
    name: 'Publisher name',
    url: 'http://www.publisher.com',
    logo: 'http://www.publisher.com/static/logo.jpg',
  },
};

export const articleResult = {
  '@context': 'http://schema.org/',
  '@type': 'Article',
  name: 'PRODUCT TEST AUTOMATIC title',
  headline: 'Homepage Title',
  description: 'PRODUCT TEST AUTOMATIC description',
  url: '/',
  publisher: {
    '@type': 'Organization',
    logo: {
      '@type': 'ImageObject',
      url: 'http://www.publisher.com/static/logo.jpg',
    },
    name: 'Browns',
    url: 'http://www.publisher.com',
  },
  datePublished: '2020-07-13T15:01:55.4526159Z',
  dateModified: '2020-07-13T15:01:55.4526159Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': '/',
  },
  author: {
    '@type': 'Thing',
    name: 'Author',
  },
  articleBody: 'Content of the page',
  articleSection: 'Article Section',
  image:
    '/BWStaticContent/50000/f6d2bfbd-cc5f-48b4-99d1-77b18d8dc52d_d-homepage-masthead-10p-store.jpg',
  keywords: 'PRODUCT TEST AUTOMATIC keywords',
};
