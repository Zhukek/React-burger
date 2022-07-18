import React from "react";

import styles from './styles.module.css';
import FeedOrder from "../feed-order/feed-order";
import { useSelector } from "react-redux";

const Feed = () => {
  const isPrivate = useSelector(store => store.socket.private);
  const privateOrders =  useSelector(store => store.socket.ordersPrivate);
  const commonOrders =  useSelector(store => store.socket.orders);
  const {buns, sauces, main} = useSelector(store => store.loading.ingridients);
  const orders = isPrivate ? privateOrders : commonOrders;

  if (orders.length === 0) {
    return null
  }

  return (
    <ul className={styles.main} style={{flexDirection: isPrivate ? 'column-reverse' : 'column'}}>
      {
        orders.map(order => (
          <FeedOrder key={order._id} order={order} allIngredients={[...buns, ...sauces, ...main]}/>
        ))
      }
    </ul>
  )
}

export default Feed