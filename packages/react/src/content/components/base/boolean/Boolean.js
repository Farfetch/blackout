import { Checkbox, Container } from './styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Boolean = ({ data: { value, displayOptions } }) => {
  const [bool, setBool] = useState(value || false);
  const displayName = displayOptions?.displayName || 'Boolean';

  return (
    <div style={Container}>
      <input
        data-test={`boolean-${displayName}`}
        type="checkbox"
        checked={bool}
        id="boolean"
        label={displayName}
        name="boolean"
        onChange={() => setBool(!bool)}
        style={Checkbox}
      />

      <label htmlFor="boolean">{displayName}</label>
    </div>
  );
};

Boolean.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Boolean;
