import { FRAME_BORDER, ID, SCROLLING, TITLE } from './constants';
import IFrame from 'react-iframe';
import React from 'react';
import urlJoin from 'proper-url-join';
import type { PropTypes } from './types';

/**
 * Payment Gateway component.
 * Renders an IFrame to render the Payment Gateway, based on the passed props.
 *
 * @param props - Properties needed to render0.
 *
 * @example
 * ```ts
 * import { PaymentGateway } from '@farfetch/blackout-react/payments';
 *
 * <PaymentGateway
 *    paymentIntentId="0f9e8b73-8d08-49e7-8335-4e4d6db58540"
 *    staticName="whitelabel"
 *    folderName="pg-12"
 *    locale="en-US"
 * />
 * ```
 */
const PaymentGateway = ({
  folderName,
  iframeHeight,
  locale,
  paymentIntentId,
  staticName,
  url,
  ...props
}: PropTypes) => {
  const iframeUrl = urlJoin(url, {
    query: {
      paymentIntentId,
      staticName,
      folderName,
      locale,
    },
  });
  const height = iframeHeight ? String(iframeHeight) : undefined;

  return (
    <IFrame
      frameBorder={FRAME_BORDER}
      height={height}
      id={ID}
      scrolling={SCROLLING}
      title={TITLE}
      {...props}
      url={iframeUrl}
    />
  );
};

export default PaymentGateway;
