import React, { useEffect } from 'react';
import {Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';

import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, FeedPage } from '../../pages';
import AppHeader from '../app-header/app-header';
import IngridientDetails from '../ingridient-details/ingridient-details';
import AppStyles from './app.module.css';
import { CHANGE_PAGE, refreshToken } from '../../services/actions/user';
import { loadIngridients } from '../../services/actions';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import AboutOrderCommon from '../about-order/about-order-common';
import AboutOrderPrivate from '../about-order/about-order-private';

import { titleIngridients } from '../../services/constants';

const App = () => {
  interface ILocation {
    background?: {
      hash: string;
      key: string;
      pathname: string;
      search: string;
      state: any
    }
  }

  const dispatch = useDispatch();
  const {authorization} = useSelector(store => store.user);
  const location = useLocation<ILocation>();
  const history = useHistory();

  const background = location.state?.background;
  const path = location.pathname;

  const closeModal = () => {
    history.goBack();
  }

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
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          <IngridientDetails />
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
        <ProtectedRoute requires={authorization} path="/profile/orders/:id" exact={true}>
          <AboutOrderPrivate />
        </ProtectedRoute>
        <ProtectedRoute requires={authorization} path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <AboutOrderCommon />
        </Route>
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
      {background &&
        <Switch>
          <Route path="/ingredients/:id" exact={true}>
            <Modal close={closeModal} title={titleIngridients}>
              <IngridientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id" exact={true}>
            <Modal close={closeModal}>
              <AboutOrderCommon background={background} />
            </Modal>
          </Route>
          <Route path="/profile/orders/:id" exact={true}>
            <Modal close={closeModal}>
              <AboutOrderPrivate background={background} />
            </Modal>
          </Route>
        </Switch>
      }      
    </div>
  )
}

export default App;