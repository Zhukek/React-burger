import React from "react";
import { useSelector } from "react-redux";

import styles from './styles.module.css';

const AllOrdersInfo = () => {
  const {orders, total, today} = useSelector(store => store.socket)
  if(orders.length === 0) {
    return null
  }

  return (
    <div className={styles.main}>
      <div className={styles.orders}>
        <div className={styles.status}>
          <span className="text text_type_main-medium">Готовы:</span>
          <ul className={styles.ordersList}>
            {orders.map((order) => {
              if (order.status === 'done') {
              return <li className={`text text_type_digits-default ${styles.orderReady}`} key={order._id}>{order.number}</li>
            }})}
          </ul>
        </div>
        <div className={styles.status}>
          <span className="text text_type_main-medium">В работе:</span>
          <ul className={styles.ordersList}>
          {orders.map((order) => {
              if (order.status === 'pending') {
              return <li className='text text_type_digits-default' key={order._id}>{order.number}</li>
            }})}
          </ul>
        </div>
      </div>
      <div className={styles.stats}>
        <span className="text text_type_main-medium">Выполнено за все время:</span>
        <span className="text text_type_digits-large">{total}</span>
      </div>
      <div className={styles.stats}>
        <span className="text text_type_main-medium">Выполнено за сегодня:</span>
        <span className="text text_type_digits-large">{today}</span>
      </div>
    </div>
  )
}

export default AllOrdersInfo