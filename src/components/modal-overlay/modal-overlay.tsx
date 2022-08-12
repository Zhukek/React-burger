import React, { FC, SyntheticEvent, useRef } from "react";
import OverlayStyle from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

const ModalOverlay: FC<{close: () => void}> = ({close}) => {
  const overlayRef = useRef(null)

  const closeOnClick = (e: SyntheticEvent) => {
    if (e.target === overlayRef.current) {
      close()
    }
  }

  return (
    <div className={OverlayStyle.overlay}
      onClick={closeOnClick}
      ref={overlayRef}>
    </div>
  )
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired
}

export default ModalOverlay