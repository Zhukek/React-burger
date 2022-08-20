import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";

import styles from './feed-page.module.css';
import Feed from "../components/feed/feed";
import AllOrdersInfo from "../components/all-orders/all-orders";

import { WS_SOCKET_OPEN, WS_SOCKET_CLOSE } from "../services/actions/wsSocket";

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const {error, wsConnected} = useSelector(store => store.socket);
  
  useEffect(() => {
    if(!wsConnected) {
      dispatch({type: WS_SOCKET_OPEN})
    }
  },[wsConnected])
  useEffect(() => {
    return() => {dispatch({type: WS_SOCKET_CLOSE})}
  },[])

  return (
    <section className={styles.main}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Лента заказов</h2>
      {!error && wsConnected && (
        <>
          <Feed />
          <AllOrdersInfo />
        </>
      )}
    </section>
  )
}