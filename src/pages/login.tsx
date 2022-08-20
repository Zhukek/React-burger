import React, { FC } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "../services/hooks";

import LoginForm from "../components/forms/login-form";
import styles from "./form-pages.module.css";

interface ILocation {
  from: {
    hash: string;
    key: string;
    pathname: string;
  }
}

export const LoginPage: FC = () => {
  const location = useLocation<ILocation>();
  const {passResetSuccess, authorization} = useSelector(store => store.user)
  
  if (authorization) {
    return (
      <Redirect to={ location.state?.from || '/'} />
    )
  }

  return (
    <>
      <p className={`text text_type_main-medium ${styles.reset_text}`}>{passResetSuccess ? 'Пароль был успешно изменен' : ''}</p>
      <LoginForm />
      <div className={styles.links}>
        <span className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link className={styles.link} to="/register">
            <span className="ml-2">Зарегистрироваться</span>
          </Link>
        </span>
        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link className={styles.link} to="/forgot-password">
            <span className="ml-2">Восстановить пароль</span>
          </Link>
        </span>
      </div>
    </>
  )
}