import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeaderLink from '../app-header-link/app-header-link';

const AppHeader: FC = () => {
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
      case '/profile/orders':
        setActiveTab({
          constructor: false,
          feed: false,
          profile: true
        })
      break;
      case '/profile':
        setActiveTab({
          constructor: false,
          feed: false,
          profile: true
        })
      break;
      case '/feed':
        setActiveTab({
          constructor: false,
          feed: true,
          profile: false
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
            <AppHeaderLink text='Конструктор' active={activeTab.constructor} to='/'>
              <BurgerIcon type={activeTab.constructor ? 'primary' : 'secondary'}/>
            </AppHeaderLink>
          </li>
          <li className={appHeaderStyles.menuItem}>
            <AppHeaderLink text='Лента заказов' to='/feed' active={activeTab.feed}>
              <ListIcon type={activeTab.feed ? 'primary' : 'secondary'}/>
            </AppHeaderLink>
          </li>
        </ul>
        <Link to='/' className={appHeaderStyles.logoLink}>
          <Logo />
        </Link>
        <ul className={appHeaderStyles.menu}>
          <li className={`pt-4 pb-4 pr-5 pl-5 ${appHeaderStyles.profile}`}>
            <AppHeaderLink text='Личный кабинет' to='/profile' active={activeTab.profile}>
              <ProfileIcon type={activeTab.profile ? 'primary' : 'secondary'}/>
            </AppHeaderLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;