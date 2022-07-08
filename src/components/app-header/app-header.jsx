import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  const location = useLocation().pathname;
  const [activeTab, setActiveTab] = useState({
    constructor: true,
    feed: false,
    profile: false
  })

  useEffect(() => {
    switch (location) {
      case '/':
        setActiveTab({
          constructor: true,
          feed: false,
          profile: false
        })
      break;
      case '/profile':
        setActiveTab({
          constructor: false,
          feed: false,
          profile: true
        })
      break;
      default:
        setActiveTab({
          constructor: false,
          feed: false,
          profile: false
        })
    }
  },[location])

  return (
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav className={appHeaderStyles.navigation}>
        <ul className={appHeaderStyles.menu}>
          <li className={`${appHeaderStyles.menuItem} pt-4 pb-4 pr-5 pl-5`}>
            <Link className={appHeaderStyles.menuLink} to="/">
              <BurgerIcon type={activeTab.constructor ? 'primary' : 'secondary'} className={appHeaderStyles.icon} />
              <span className={`text text_type_main-default ${activeTab.constructor ? '' : 'text_color_inactive'}`}>Конструктор</span>
            </Link>
          </li>
          <li className={appHeaderStyles.menuItem}>
            <Link className={`text text_type_main-default text_color_inactive ${appHeaderStyles.menuLink}`} to="/">
              <ListIcon type={activeTab.feed ? 'primary' : 'secondary'} className={appHeaderStyles.icon} />
              <span className={`text text_type_main-default ${activeTab.feed ? '' : 'text_color_inactive'}`}>Лента заказов</span>
            </Link>
          </li>
        </ul>
        <Logo />
        <ul className={appHeaderStyles.menu}>
          <li className={`pt-4 pb-4 pr-5 pl-5 ${appHeaderStyles.profile}`}>
            <Link className={appHeaderStyles.menuLink} to="/profile">
              <ProfileIcon type={activeTab.profile ? 'primary' : 'secondary'} className={appHeaderStyles.icon} />
              <span className={`text text_type_main-default ${activeTab.profile ? '' : 'text_color_inactive'}`}>Личный кабинет</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;