import React from 'react';
import styles from './Button.module.scss';

/**
 * Button component.
 *
 * @param {Object} props
 * @param {string} props.type One of "primary", "secondary"
 * @param {function} props.onClick onClick event handler
 * @param {element} props.icon Icon
 * @returns {JSX}
 */
const Button = props => {
  const {type, active, icon, children, onClick} = props;

  return (
    <button
      className={`
        ${styles[type] || ''}
        ${active ? styles.active : ''}
        `}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'primary'
};

export default Button;
