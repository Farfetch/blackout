import { cleanup, render } from '@testing-library/react';
import CallToAction from '../callToAction/CallToAction';
import React from 'react';

describe('<CallToAction />', () => {
  afterEach(cleanup);

  it('should render properly', () => {
    const data = {
      text: 'foo',
      href: '/test',
      target: '_self',
    };

    const { container } = render(<CallToAction data={data} />);

    expect(container).toMatchSnapshot();
  });

  it('should render span if not pass href and text', () => {
    const data = {};
    const { getByText } = render(<CallToAction data={data}>foo</CallToAction>);

    expect(getByText('foo').closest('span')).toBeDefined();
  });

  it('should render a with target blank to open in another tab', () => {
    const data = {
      text: 'foo',
      href: 'https://foo.com',
      target: '_blank',
    };

    const { getByText } = render(<CallToAction data={data} />);

    expect(getByText('foo').closest('a')).toHaveAttribute('target', '_blank');
  });
});
