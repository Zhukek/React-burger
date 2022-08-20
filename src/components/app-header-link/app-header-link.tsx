import { FC } from "react";
import { Link } from "react-router-dom";

import styles from './styles.module.css';

interface IAppHeaderLink {
  text: string;
  active: boolean;
  to: string
}

const AppHeaderLink: FC<IAppHeaderLink> = ({text, children, active, to}) => {
  return (
    <Link className={styles.menuLink} to={to}>
      <div className={styles.icon}>
        {children}
      </div>
      <span className={`text text_type_main-default ${active ? '' : 'text_color_inactive'}`}>{text}</span>
    </Link>
  )
}

export default AppHeaderLink;