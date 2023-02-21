import { cleanup, render } from '@testing-library/react';
import { mockLegacyData } from 'tests/__fixtures__/contents';
import { registerComponent } from '../..';
import React, { type ReactElement } from 'react';
import renderContent from '../renderContent';

const MockTextComponent = (): ReactElement => {
  return <p data-test="textElement">Content</p>;
};

const location = {
  query: undefined,
};

console.warn = jest.fn();

describe('renderContent', () => {
  beforeAll(() => {
    registerComponent('text', MockTextComponent);
  });

  afterEach(cleanup);

  it('should render a component element with legacy data', () => {
    const { getByTestId } = render(
      renderContent(mockLegacyData, { location, viewportBreakpoint: 'lg' }),
    );
    const element = getByTestId('textElement');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Content');
  });

  it('should deal with undefined components', () => {
    const { queryByTestId } = render(
      // @ts-expect-error Set components to undefined for test
      renderContent({ components: undefined }, location, 'lg'),
    );
    const element = queryByTestId('textElement');

    expect(element).not.toBeInTheDocument();
  });
});
