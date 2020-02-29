import React from 'react';
import PropsTypes from 'prop-types';
import './card.scss';
import { bgColors } from '../../styles/bgColors';

/**
 * @typedef {{
 *  bgColor?: import('../../styles/bgColors').bgColors,
 *  className?: string,
 *  children?: any,
 *  margin?: 0 | 5 | 10 | 20 | 40 | 60 | 80 | 100,
 *  padding?: 0 | 5 | 10 | 20 | 40 | 60 | 80 | 100,
 *  isSelected?: boolean
 * }} cardProps
 */

/**
 *
 * @param {cardProps} cardProps
 * @returns {JSX.Element} Row
 */
export const Card = ({
  className, children, bgColor, padding, margin, isSelected,
}) => (
  <div
    className={`card bg--${bgColor} ${className} ${margin && `margin__all--${margin}`} padding__all--${padding} ${isSelected
      ? 'card--selected' : ''}`}
  >
    {children}
  </div>
);

Card.propTypes = {
  bgColor: PropsTypes.oneOf([...bgColors]),
  margin: PropsTypes.oneOf([0, 5, 10, 20, 40, 60, 80, 100]),
  padding: PropsTypes.oneOf([0, 5, 10, 20, 40, 60, 80, 100]),
  className: PropsTypes.string,
  children: PropsTypes.node,
  isSelected: PropsTypes.bool,
};

Card.defaultProps = {
  bgColor: 'default',
  margin: 0,
  padding: 0,
  className: '',
  children: null,
  isSelected: false,
};
