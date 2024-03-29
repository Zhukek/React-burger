import React, { FC } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "../services/hooks";

import ResetPasswordForm from "../components/forms/reset-password";
import styles from "./form-pages.module.css";

export const ResetPasswordPage: FC = () => {
  const {authorization, passReset} = useSelector(store=>store.user);

  if (authorization) {
    return (
      <Redirect to='/' />
    )
  }

  if (!passReset) {
    return (
      <Redirect to='/forgot-password'/>
    )
  }

  return (
    <>
      <ResetPasswordForm />
      <div className={styles.links}>
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link className={styles.link} to="/login">
            <span className="ml-2">Войти</span>
          </Link>
        </span>
      </div>
    </>
  )
}