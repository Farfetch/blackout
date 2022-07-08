import { render } from '@testing-library/react';
import DateTime from '../dateTime/DateTime';
import React from 'react';

describe('<DateTime />', () => {
  it('should render properly', () => {
    const { getByText } = render(
      <DateTime data={{ utcDate: '2022-05-05T14:10:00Z' }} />,
    );

    expect(getByText('Thu May 05 2022')).toBeInTheDocument();
  });

  it('should not render if not date value exists', () => {
    const { container } = render(<DateTime data={{ utcDate: null }} />);

    expect(container.firstChild).toBeNull();
  });
});
