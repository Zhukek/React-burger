import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";
import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const Modal = ({close, title='', children}) => {
  
  useEffect(() => {
    document.addEventListener('keydown', escClose)

    return(() => {
    document.removeEventListener('keydown', escClose)
    })
  },[])

  const escClose = (e) => {
    if (e.key === 'Escape') {
      close()
    }
  }
  

  return ReactDOM.createPortal(
    <div className={ModalStyles.main}>
      <div className={ModalStyles.modal}>
        <h3 className="mt-10 ml-10 mr-10 text text_type_main-large pt-3 pb-3">{title}</h3>
        <button className={ModalStyles.close}
        onClick={close}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay close={close} />
    </div>,
    document.getElementById('rootModal')
  )
}

Modal.propTypes = {
  title: PropTypes.string
}

export default Modal;