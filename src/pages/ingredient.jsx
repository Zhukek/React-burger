import React from "react";
import { titleIngridients } from "../services/constants";
import Modal from "../components/modal/modal";
import IngridientDetails from "../components/ingridient-details/ingridient-details";
import { HomePage } from "./home";
import { useHistory } from "react-router-dom";

export const IngredientPageModal = () => {
  const history = useHistory();
  const closeModal = () => {
    history.goBack();
  }

  return (
    <>
      <HomePage />
      <Modal title={titleIngridients} close={closeModal}>
        <IngridientDetails />
      </Modal>
    </>
  )
}