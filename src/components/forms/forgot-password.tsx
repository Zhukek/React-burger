import React, { FC, SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "../../services/hooks";

import styles from "./_form.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { passResetRequest } from "../../services/burger-api";
import { OPEN_RESET_PAGE } from "../../services/actions/user";

const ForgotPasswordForm: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formError, setFormError] = useState('')
  const [emailValue, setEmailValue] = useState({
    value: '',
    error: false
  });

  const onEmailChange = (e: SyntheticEvent) => {
    setEmailValue({
      value: (e.target as HTMLInputElement).value, 
      error: false
    })
    setFormError('')
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let error = false
    if (emailValue.value === "") {
      error = true;
      setEmailValue({
        value: '',
        error: true
      })
    }

    if (!error) {
      passResetRequest(emailValue.value)
        .then((res) => {
          if (res.success) {
            dispatch({type: OPEN_RESET_PAGE})
            history.replace({pathname: '/reset-password'})
          }
        })
        .catch(() => {
          setFormError('Что-то пошло не так')
        })
    }
  }

  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <h3 className="text text_type_main-medium">Восстановление пароля</h3>
      <span className="text text_type_main-small">{formError}</span>
      <fieldset className={styles.fieldset}>
        <Input error={emailValue.error} errorText="Введите почту" placeholder="E-mail" type='email' name="email" value={emailValue.value} onChange={onEmailChange}/>
      </fieldset>
      <Button type="primary" size="medium" htmlType="submit">Восстановить</Button>
    </form>
  )
}

export default ForgotPasswordForm;