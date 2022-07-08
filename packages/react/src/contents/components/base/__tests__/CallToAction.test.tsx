import { cleanup, render } from '@testing-library/react';
import CallToAction from '../callToAction/CallToAction';
import React from 'react';

describe('<CallToAction />', () => {
  afterEach(cleanup);

  it('should render properly', () => {
    const data = {
      text: 'foo',
      url: '/test',
      target: '_self',
    };

    const { getByText } = render(
      <CallToAction children={undefined} data={data} />,
    );

    expect(getByText('foo')).toBeInTheDocument();
  });

  it('should render span if not pass url and text', () => {
    const { getByText } = render(
      <CallToAction data={{ target: '_self' }}>foo</CallToAction>,
    );

    expect(getByText('foo').closest('span')).toBeDefined();
  });

  it('should render a with target blank to open in another tab', () => {
    const data = {
      text: 'foo',
      url: 'https://foo.com',
      target: '_blank',
    };

    const { getByText } = render(
      <CallToAction children={undefined} data={data} />,
    );

    expect(getByText('foo').closest('a')).toHaveAttribute('target', '_blank');
  });
});
