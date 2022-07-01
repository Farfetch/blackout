import * as schemaProperties from './schemas/schemaProperties';
import { getMetatag } from '../utils';
import { renderScriptTag } from '../helpers';
import type { Address, Contact } from '../types';
import type { Organization, WithContext } from 'schema-dts';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client';

/**
 * Generate Structured Data (JSON-LD) for Organization.
 *
 * @example
 * ```
 * import { structuredOrganization } from '@farfetch/blackout-react/content/structured-data';
 *
 * <Helmet>
 *  {structuredOrganization(
 *    metadata,
 *    name,
 *    url,
 *    logoUrl,
 *    address: {
 *      street: '...',
 *      locality: '...',
 *      ...
 *    },
 *    contact: {
 *      phone: '...',
 *      type: '...',
 *      ...
 *    },
 *    sameAs: ['...', '...'],
 *    2)
 *   }
 * </Helmet>
 *
 * ```
 *
 * @param metadata - SEO metadata for type Organization on Homepage.
 * @param name     - Name of the Organization.
 * @param url      - Relative url of the page (location.pathname).
 * @param logoUrl  - Complete url for logotype.
 * @param address  - Full address information.
 * @param contact  - Full Contact information.
 * @param sameAs   - SameAs links of organization (e.g. Links to facebook and/or instagram).
 * @param space    - Add whitespace and indentation to the serialized output.
 *
 * @returns - A script tag with Organization JSON-LD structured data.
 */
const structuredOrganization = (
  metadata: SEOMetadata,
  name: string,
  url: string,
  logoUrl: string,
  address: Address,
  contact: Contact,
  sameAs: string[],
  space?: number,
): ReactElement => {
  const generateSchemaOrgProperty = (property: string) =>
    getMetatag(property, metadata?.metatags);

  const ORGANIZATION: WithContext<Organization> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_ORGANISATION,
    name: generateSchemaOrgProperty('organization:name') || name,
    url: generateSchemaOrgProperty('organization:url') || url,
    logo: generateSchemaOrgProperty('organization:logo') || logoUrl,
    sameAs: generateSchemaOrgProperty('organization:sameAS') || sameAs,
    address: {
      '@type': schemaProperties.DEFAULT_TYPE_ADDRESS,
      streetAddress:
        generateSchemaOrgProperty('organization:streetAddress') ||
        address?.street,
      addressLocality:
        generateSchemaOrgProperty('organization:addressLocality') ||
        address?.locality,
      addressRegion:
        generateSchemaOrgProperty('organization:addressRegion') ||
        address?.region,
      postalCode:
        generateSchemaOrgProperty('organization:postalCode') ||
        address?.postalCode,
      addressCountry:
        generateSchemaOrgProperty('organization:addressCountry') ||
        address?.country,
    },
    contactPoint: {
      '@type': schemaProperties.DEFAULT_TYPE_CONTACT_POINT,
      telephone:
        generateSchemaOrgProperty('organization:telephone') || contact?.phone,
      contactType:
        generateSchemaOrgProperty('organization:contactType') || contact?.type,
      email: generateSchemaOrgProperty('organization:email') || contact?.email,
      contactOption:
        generateSchemaOrgProperty('organization:contactOption') ||
        contact?.option,
      areaServed:
        generateSchemaOrgProperty('organization:areaServed') ||
        contact?.areaServed,
    },
  };

  return renderScriptTag(ORGANIZATION, space);
};

export default structuredOrganization;
