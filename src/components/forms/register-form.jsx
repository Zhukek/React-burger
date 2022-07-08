import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./_form.module.css";
import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { registration } from "../../services/actions/user";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const {hasRegistrationError, errorType} = useSelector(store => store.user);

  const [email, setEmailValue] = useState({
    value: '',
    error: false
  });
  const [password, setPasswordValue] = useState("");
  const [name, setNameValue] = useState({
    value: '',
    error: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if(hasRegistrationError) {
      errorType.error === 403 ? setError('Что-то не так. Возможно, вы уже зарегистрированы') :
      setError('что-то пошло не так')
    } else {
      setError('')
    }
  },[hasRegistrationError])

  const onEmailChange = e => {
    setEmailValue({
      value: e.target.value,
      error: false
    })
    setError('')
  }
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
    setError('')
  }
  const onNameChange = e => {
    setNameValue({
      value: e.target.value,
      error: false
    })
    setError('')
  }

  const onSubmit = e => {
    e.preventDefault();
    let error = false

    if (name.value === "") {
      setNameValue({
        value: '',
        error: true
      })
      error = true
    }
    if (email.value === "") {
      setEmailValue({
        value: '',
        error: true
      })
      error = true
    }
    if (password.length < 6) {
      setError('Придумайте пароль длинной не менее 6 символов')
      error = true
    }
    if (!error) {
      dispatch(registration(email.value, password, name.value))
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.root}>
      <h3 className="text text_type_main-medium">Регистрация</h3>
      <span className="text text_type_main-small">{error}</span>
      <fieldset className={styles.fieldset}>
        <Input errorText="Заполните поле" error={name.error} type="text" placeholder="Имя" value={name.value} onChange={onNameChange}/>
        <Input errorText="Заполните поле" error={email.error} placeholder="E-mail" type='email' name="email" value={email.value} onChange={onEmailChange}/>
        <PasswordInput onChange={onPasswordChange} value={password} name={'password'}/>
      </fieldset>
      <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
    </form>
  )
}

export default RegisterForm;