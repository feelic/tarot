import React from 'react';
import styles from './Select.module.scss';

/**
 * Button component.
 *
 * @param {Object} props
 * @param {string} props.type One of "primary", "secondary"
 * @param {function} props.onClick onClick event handler
 * @param {element} props.icon Icon
 * @returns {JSX}
 */
const Select = props => {
  const {value, type, children, onChange} = props;

  return (
    <select
      value={value}
      className={`
            ${styles[type] || ''}
            `}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
