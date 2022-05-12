import React, { useRef } from "react";
import OverlayStyle from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  const overlayRef = useRef(null)

  const close = (e) => {
    if (e.target === overlayRef.current) {
      props.close()
    }
  }

  return (
    <div className={OverlayStyle.overlay}
      onClick={close}
      ref={overlayRef}>
    </div>
  )
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired
}

export default ModalOverlay