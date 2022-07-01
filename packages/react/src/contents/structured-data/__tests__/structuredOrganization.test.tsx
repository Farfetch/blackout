import {
  MockRenderScript,
  organization,
  organizationResult,
} from './__fixtures__';
import structuredOrganization from '../structuredOrganization';

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
      MockRenderScript(JSON.stringify(organizationResult)),
    );
  });
});
