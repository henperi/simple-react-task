import React from 'react';
import PropsTypes from 'prop-types';
import './Button.scss';
// import { bgColors } from '../../styles/bgColors';

/**
 * @typedef {{
 *  onClick: Function,
 *  fullWidth: boolean
 *  disabled: boolean
 *  className?: string,
 *  type: 'button' | 'submit' | 'reset',
 *  children?: any,
 *  radius?: 5 | 10 | 20 | 40 | 60 | 100,
 * }} buttonProps
 */

/**
 *
 * @param {buttonProps} buttonProps
 * @returns {JSX.Element} Button
 */
export const Button = ({
  className, children, onClick, radius, fullWidth, type, disabled,
}) => (
  <button
    onClick={() => onClick()}
    className={`button ${className} ${radius} ${fullWidth ? 'button--full-width' : ''}`}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropsTypes.string,
  children: PropsTypes.node,
  onClick: PropsTypes.func,
  radius: PropsTypes.number,
  fullWidth: PropsTypes.bool,
  disabled: PropsTypes.bool,
  type: PropsTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  className: '',
  children: PropsTypes.objectOf,
  onClick: () => {},
  radius: 5,
  fullWidth: false,
  disabled: false,
  type: 'submit',
};
