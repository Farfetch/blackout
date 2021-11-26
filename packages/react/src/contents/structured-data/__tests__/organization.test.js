import {
  organization,
  organizationResult,
} from '../__fixtures__/organization.fixtures';
import { renderScriptTag } from '../../helpers';
import structuredOrganization from '../organization';

const { metadata, name, url, logoUrl, address, contact, sameAs } = organization;

describe('structuredOrganization', () => {
  it('should correctly generate JSON-LD for a Organization', () => {
    const renderStructuredOrganization = structuredOrganization(
      metadata,
      name,
      url,
      logoUrl,
      address,
      contact,
      sameAs,
    );

    expect(renderStructuredOrganization).toEqual(
      renderScriptTag(organizationResult),
    );
  });
});
