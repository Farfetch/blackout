import { cleanup, render } from '@testing-library/react';
import {
  mockContentToolData,
  mockLegacyData,
} from 'tests/__fixtures__/contents';
import { registerComponent } from '../..';
import React, { ReactElement } from 'react';
import renderContent from '../renderContent';

const MockTextComponent = (): ReactElement => (
  <p data-test="textElement">Content</p>
);

describe('renderContent', () => {
  beforeAll(() => {
    registerComponent('text', MockTextComponent);
  });

  afterEach(cleanup);

  it('should render a component element with legacy data', () => {
    const { getByTestId } = render(renderContent(mockLegacyData));
    const element = getByTestId('textElement');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Content');
  });

  it('should render a component with content tool data structure', () => {
    const { getByTestId } = render(
      renderContent(mockContentToolData, 'active'),
    );
    const element = getByTestId('textElement');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Content');
  });

  it('should deal with undefined components', () => {
    const { queryByTestId } = render(
      renderContent({ components: undefined }),
    );
    const element = queryByTestId('textElement');

    expect(element).not.toBeInTheDocument();
  });
});
