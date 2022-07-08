import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./_form.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/burger-api";
import { RESET_PASSWORD } from "../../services/actions/user";

const ResetPasswordForm = () => {
  const history = useHistory();
  const dispatch = useDispatch(); 

  const [formError, setFormError] = useState('');
  const [codeValue, setCodeValue] = useState({
    value: '',
    error: false
  });
  const [passInput, setPassInput] = useState({
    type: 'password',
    icon: 'ShowIcon',
    value: '',
    error: false
  });

  const onPasswordChange = e => {
    setPassInput({
      ...passInput,
      value: e.target.value,
      error: false
    });
    setFormError('');
  }
  const onCodeChange = e => {
    setCodeValue({
      value: e.target.value,
      error: false
    });
    setFormError('');
  }
  const onIconClick = () => {
    if (passInput.type === 'password') {
      setPassInput({
        ...passInput,
        type: 'text',
        icon: 'HideIcon'
      })
    } else {
      setPassInput({
        ...passInput,
        type: 'password',
        icon: 'ShowIcon'
      })
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    let error = false;
    if (passInput.value.length < 6) {
      error = true;
      setPassInput({
        ...passInput,
        error: true
      })
    }
    if (codeValue.value === "") {
      error = true;
      setCodeValue({
        ...codeValue,
        error: true
      })
    }

    if (!error) {
      resetPassword(passInput.value, codeValue.value)
      .then((res) => {
        if (res.success) {
          history.replace({pathname: '/login'})
          dispatch({
            type: RESET_PASSWORD
          })
        }
      })
      .catch(() => {
        setFormError('Что-то пошло не так')
      })
    }
  }

  return (
    <form aria-disabled={true} className={styles.root} onSubmit={onSubmit}>
      <h3 className="text text_type_main-medium">Восстановление пароля</h3>
      <span className="text text_type_main-small">{formError}</span>
      <fieldset className={styles.fieldset}>
        <Input error={passInput.error} errorText={'Пароль должен быть длиной не меньше 6 символов'} type={passInput.type} placeholder="Введите новый пароль" value={passInput.value} icon={passInput.icon} onChange={onPasswordChange} name={'password'} onIconClick={onIconClick}/>
        <Input error={codeValue.error} errorText={'Заполните поле'} type="text" placeholder="Введите код из письма" value={codeValue.value} onChange={onCodeChange} name={'code'}/>
      </fieldset>
      <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
    </form>
  )
}

export default ResetPasswordForm;