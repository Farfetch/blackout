import { render } from '@testing-library/react';
import React from 'react';
// Components
import StructuredBreadcrumbs from '../Breadcrumbs';
// Fixtures
import breadcrumbs from '../__fixtures__/breadcrumbs.fixtures.json';

describe('<Breadcrumbs />', () => {
  it('should render properly', () => {
    const { container } = render(
      <StructuredBreadcrumbs breadcrumbs={breadcrumbs} space={2} />,
    );

    expect(container).toBeInTheDocument();
  });
});
