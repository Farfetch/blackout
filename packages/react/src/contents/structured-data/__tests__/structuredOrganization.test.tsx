import {
  MockRenderScript,
  organization,
  organizationResult,
  organizationResultWithLegalNameDescription,
  organizationResultWithPotentialAction,
} from './__fixtures__/index.js';
import structuredOrganization from '../structuredOrganization.js';

const {
  metadata,
  name,
  url,
  logoUrl,
  address,
  contact,
  sameAs,
  legalName,
  description,
  urlTemplate,
  searchTitle,
} = organization;

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

  it('should correctly generate JSON-LD for a Organization with legal name and description', () => {
    const renderStructuredOrganization = structuredOrganization(
      metadata,
      name,
      url,
      logoUrl,
      address,
      contact,
      sameAs,
      undefined,
      legalName,
      description,
    );

    expect(renderStructuredOrganization).toEqual(
      MockRenderScript(
        JSON.stringify(organizationResultWithLegalNameDescription),
      ),
    );
  });

  it('should correctly generate JSON-LD for a Organization with potential action', () => {
    const renderStructuredOrganization = structuredOrganization(
      metadata,
      name,
      url,
      logoUrl,
      address,
      contact,
      sameAs,
      undefined,
      undefined,
      undefined,
      searchTitle,
      urlTemplate,
    );

    expect(renderStructuredOrganization).toEqual(
      MockRenderScript(JSON.stringify(organizationResultWithPotentialAction)),
    );
  });
});
