import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav className={appHeaderStyles.navigation}>
        <ul className={appHeaderStyles.menu}>
          <li className={`${appHeaderStyles.menuItem} pt-4 pb-4 pr-5 pl-5`}>
            <BurgerIcon type="primary" className={appHeaderStyles.icon} />
            <span className={`text text_type_main-default`}>Конструктор</span>
          </li>
          <li className={`pt-4 pb-4 pr-5 pl-5 ${appHeaderStyles.menuItem}`}>
            <ListIcon type="secondary" className={appHeaderStyles.icon} />
            <span className={`text text_type_main-default text_color_inactive`}>Лента заказов</span>
          </li>
        </ul>
        <Logo />
        <ul className={appHeaderStyles.menu}>
          <li className={`pt-4 pb-4 pr-5 pl-5 ${appHeaderStyles.profile}`}>
            <ProfileIcon type="secondary" className={appHeaderStyles.icon} />
            <span className={`text text_type_main-default text_color_inactive`}>Личный кабинет</span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;