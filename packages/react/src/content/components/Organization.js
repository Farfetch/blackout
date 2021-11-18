import { generateOrganization, renderScriptTag } from '../helpers';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef {object} OrganizationProps
 * @property {object} metadata - SEO metadata for type Organization on Homepage.
 * @property {object} name - Name of the Organization.
 * @property {string} url - Relative url of the page (location.pathname).
 * @property {string} logoUrl - Complete url for logotype.
 * @property {object} address - Full address information.
 * @property {string} address.street - Stress Address name.
 * @property {string} address.locality - Stress Locality name.
 * @property {string} address.region - Stress Region name.
 * @property {string} address.postalCode - Stress Postal Code name.
 * @property {string} address.country - Stress Country name.
 * @property {object} contact - Full Contact information.
 * @property {string} contact.phone - Phone number contact.
 * @property {string} contact.type - Contact type (e.g. Customer Service).
 * @property {string} contact.address - Contact address name.
 * @property {string} contact.email - E-mail contact.
 * @property {string} contact.option - Contact Option (e.g. A toll-free number or support for hearing-impaired callers).
 * @property {string} contact.areaServed - The geographic area where a service or offered item is provided.
 * @property {Array}  sameAs - SameAs links of organization (e.g. Links to facebook and/or instagram).
 */

/**
 * Render Structured Data (JSON-LD) for Organization.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {OrganizationProps} props - All props of Organization.
 *
 * @returns {object} - JSON-LD Schema.org object for an Organization.
 *
 * @example
 * <Organization
 *   metadata={object}
 *   name="string"
 *   url="string"
 *   logoUrl="string"
 *   address={{
 *     street: string,
 *     locality: string,
 *     region: string,
 *     postalCode: string,
 *     country: string
 *   }}
 *   contact={{
 *     phone: string,
 *     type: string,
 *     address: string,
 *     email: string,
 *     option: string,
 *     areaServed: string
 *   }}
 *   sameAs="Array"
 * />
 */
const Organization = ({
  metadata,
  name,
  url,
  logoUrl,
  address,
  contact,
  space,
  sameAs,
}) => {
  return (
    <Helmet>
      {renderScriptTag(
        generateOrganization(
          metadata,
          name,
          url,
          logoUrl,
          address,
          contact,
          sameAs,
        ),
        space,
      )}
    </Helmet>
  );
};

Organization.propTypes = {
  metadata: PropTypes.object,
  name: PropTypes.string,
  url: PropTypes.string,
  logoUrl: PropTypes.string,
  address: PropTypes.shape({
    street: PropTypes.string,
    locality: PropTypes.string,
    region: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
  }),
  contact: PropTypes.shape({
    phone: PropTypes.string,
    type: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    option: PropTypes.string,
    areaServed: PropTypes.string,
  }),
  space: PropTypes.number,
  sameAs: PropTypes.array,
};

export default Organization;
