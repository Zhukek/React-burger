import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./_form.module.css";
import { login } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hooks";


const LoginForm: FC = () => {
  const dispatch = useDispatch();

  const {hasLoginError, errorType} = useSelector(store => store.user);
  const [formError, setFormError] = useState('');
  const [emailValue, setEmailValue] = useState({
    value: '',
    error: false
  });
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    if(hasLoginError) {
      errorType?.error === 401 ? setFormError('Введен неправильный логин или пароль') : setFormError('что-то пошло не так')
    } else {
      setFormError('')
    }
  },[hasLoginError])

  const onEmailChange = (e: SyntheticEvent) => {
    setEmailValue({
      value: (e.target as HTMLInputElement).value,
      error: false
    });
    setFormError('');
  }
  const onPasswordChange = (e: SyntheticEvent) => {
    setPasswordValue((e.target as HTMLInputElement).value);
    setFormError('');
  }

  const onSubmit = (e: SyntheticEvent, email: string, password: string) => {
    e.preventDefault();
    let error = false
    if (emailValue.value === "") {
      setEmailValue({
        value: '',
        error: true
      })
      error = true
    }
    if (passwordValue.length < 6) {
      setFormError('Введите корректный пароль')
      error = true
    }

    if (!error) {
      dispatch(login(email, password))
    }
  }

  return (
    <form className={styles.root} onSubmit={(e) => {onSubmit(e, emailValue.value, passwordValue)}}>
      <h3 className="text text_type_main-medium">Вход</h3>
      <span className="text text_type_main-small">{formError}</span>
      <fieldset className={styles.fieldset}>
        <Input error={emailValue.error} errorText="Введите почту" placeholder="E-mail" type='email' name="email" value={emailValue.value} onChange={onEmailChange}/>
        <PasswordInput onChange={onPasswordChange} value={passwordValue} name={'password'}/>
      </fieldset>
      <Button htmlType="submit" type="primary" size="medium">Войти</Button>
    </form>
  )
}

export default LoginForm;