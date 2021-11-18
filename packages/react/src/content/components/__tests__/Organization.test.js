import { render, waitFor } from '@testing-library/react';
import React from 'react';
// Components
import StructuredOrganization from '../Organization';
// Fixtures
import {
  organization,
  organizationResult,
} from '../__fixtures__/organization.fixtures';

describe('<Organization />', () => {
  it('should render properly', async () => {
    const { metadata, name, url, logoUrl, address, contact, sameAs } =
      organization;

    render(
      <StructuredOrganization
        metadata={metadata}
        name={name}
        url={url}
        logoUrl={logoUrl}
        address={address}
        contact={contact}
        space={2}
        sameAs={sameAs}
      />,
    );

    const scriptTag = await waitFor(
      () => document.getElementsByTagName('script')[0].innerHTML,
    );
    const scriptParsed = JSON.parse(scriptTag);

    expect(scriptParsed).toEqual(organizationResult);
  });
});
