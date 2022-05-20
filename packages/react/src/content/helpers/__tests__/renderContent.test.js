import { cleanup, render } from '@testing-library/react';
import {
  mockContentToolData,
  mockLegacyData,
} from '../__fixtures__/renderContent.fixtures';
import { registerComponent } from '../../components/Component';
import React from 'react';
import renderContent from '../renderContent';

const location = {
  pathname: '/',
};
const MockComponent = () => <p data-test="textElement">Content</p>;

describe('renderContent', () => {
  beforeEach(() => {
    registerComponent('text', MockComponent);
  });

  afterEach(cleanup);

  it('should not render any component if components are empty', () => {
    const { queryByTestId } = render(
      renderContent({ components: [] }, location),
    );

    expect(queryByTestId('textElement')).not.toBeInTheDocument();
  });

  it('should render a component element with legacy data', () => {
    const { getByTestId } = render(renderContent(mockLegacyData, location));

    expect(getByTestId('textElement')).toBeInTheDocument();
    expect(getByTestId('textElement')).toHaveTextContent('Content');
  });

  it('should render a component with content tool data structure', () => {
    const { getByTestId } = render(
      renderContent(mockContentToolData, location, 'lg', 'active'),
    );

    expect(getByTestId('textElement')).toBeInTheDocument();
    expect(getByTestId('textElement')).toHaveTextContent('Content');
  });
});
