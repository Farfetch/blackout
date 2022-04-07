import PropTypes from 'prop-types';
import React from 'react';

const CallToAction = ({ children, data: { text, href, target } }) => {
  if (!href && !text) {
    return <span>{children || null}</span>;
  }

  const anchorTarget = target === '_self' ? null : target;

  return (
    <a href={href} target={anchorTarget}>
      {children || text}
    </a>
  );
};

CallToAction.defaultProps = {
  children: null,
};

CallToAction.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default CallToAction;
