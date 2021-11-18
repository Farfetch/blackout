import { render, waitFor } from '@testing-library/react';
import React from 'react';
// Components
import StructuredProduct from '../Product';
// fixtures
import { metadata } from '../__fixtures__/metadata.fixtures';
import { product, productResult } from '../__fixtures__/product.fixtures';

describe('<Product />', () => {
  it('should render properly', async () => {
    const { productDetail, lastCategory, url, seller } = product;

    render(
      <StructuredProduct
        product={productDetail}
        metadata={metadata}
        lastCategory={lastCategory}
        url={url}
        seller={seller}
        space={2}
      />,
    );

    const scriptTag = await waitFor(
      () => document.getElementsByTagName('script')[0].innerHTML,
    );
    const scriptParsed = JSON.parse(scriptTag);

    expect(scriptParsed).toEqual(productResult);
  });
});
