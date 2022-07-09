import React, { useEffect } from 'react';
import {Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPageModal } from '../../pages';
import AppHeader from '../app-header/app-header';
import IngridientDetails from '../ingridient-details/ingridient-details';
import AppStyles from './app.module.css';
import { CHANGE_PAGE, refreshToken } from '../../services/actions/user';
import { loadIngridients } from '../../services/actions';
import ProtectedRoute from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const {authorization} = useSelector(store => store.user);
  const location = useLocation();

  const background = location.state?.background;
  const path = location.pathname;

  useEffect(() => {
    if (path !== '/login') {
      dispatch({type: CHANGE_PAGE})
    }
  },[path])

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(loadIngridients());
  },[])

  return (
    <div className={AppStyles.app}>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          {background ? 
          <IngredientPageModal /> :
          <IngridientDetails />}
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute requires={authorization} path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <h1>Ooooops</h1>
        </Route>
      </Switch>   
    </div>
  )
}

export default App;