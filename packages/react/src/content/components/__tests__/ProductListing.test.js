import { render } from '@testing-library/react';
import React from 'react';
// Components
import StructuredProductListing from '../ProductsListing';
// Fixtures
import productListing from '../__fixtures__/productListing.fixtures.json';

const url = '/en-pt/shopping/women';
const metadata = {
  canonicalUrl: 'https://api.blackout.com/en-pt/shopping/women',
  metatags: [
    {
      content: 'Products Listing',
      property: { type: 'property', description: 'productsList:name' },
    },
  ],
};
describe('<ProductListing />', () => {
  it('should render properly', () => {
    const { container } = render(
      <StructuredProductListing
        listing={productListing}
        url={url}
        metadata={metadata}
        space={2}
      />,
    );

    expect(container).toBeInTheDocument();
  });
});
