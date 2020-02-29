import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

/**
 *
 * @param {any} ModalProps
 * @returns {JSX.Element} Button
 */
function Modal({
  children, className, onClose, isVisible,
}) {
  return isVisible ? (
    <div className={`modal row__mainAxis--center row__crossAxis--center ${className}`}>
      <div
        className="backdrop"
        role="menu"
        tabIndex={0}
        onKeyPress={() => onClose()}
        onClick={() => onClose()}
      />
      <div className="modal--child">
        {children}
        <button className="close" onClick={() => onClose()}>
          x
        </button>
      </div>
    </div>
  ) : (
    <Fragment />
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  isVisible: PropTypes.bool,
};

Modal.defaultProps = {
  className: '',
  children: PropTypes.objectOf,
  onClose: () => {},
  isVisible: true,
};
export default Modal;
