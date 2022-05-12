import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";
import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const Modal = (props) => {

  useEffect(() => {
    document.addEventListener('keydown', escClose)

    return(() => {
    document.removeEventListener('keydown', escClose)
    })
  },[])

  const escClose = (e) => {
    if (e.key === 'Escape') {
      props.close()
    }
  }
  

  return ReactDOM.createPortal(
    <div className={ModalStyles.main}>
      <div className={ModalStyles.modal}>
        <h3 className="mt-10 ml-10 mr-10 text text_type_main-large pt-3 pb-3">{props.title}</h3>
        <button className={ModalStyles.close}
        onClick={props.close}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
      <ModalOverlay close={props.close} />
    </div>,
    document.getElementById('rootModal')
  )
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.array.isRequired
}

export default Modal;