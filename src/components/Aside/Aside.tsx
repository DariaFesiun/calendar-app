import React from 'react';
import styles from './Aside.module.scss';

const Aside = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>IMPEKABLE</h2>
      <nav>
        <ul className={styles.menu}>
          <li className={`${styles.menuItem}`}>
            <img src="/icons/home.svg" alt="home" />
            <span>Home</span>
          </li>
          <li className={styles.menuItem}>
            <img src="/icons/dashboard.svg" alt="dashboard" />
            <span>Dashboard</span>
          </li>
          <li className={styles.menuItem}>
            <img src="/icons/inbox.svg" alt="inbox" />
            <span>Inbox</span>
          </li>
          <li className={styles.menuItem}>
            <img src="/icons/products.svg" alt="products" />
            <span>Products</span>
          </li>
          <li className={styles.menuItem}>
            <img src="/icons/invoices.svg" alt="invoices" />
            <span>Invoices</span>
          </li>
          <li className={styles.menuItem}>
            <img src="/icons/customers.svg" alt="customers" />
            <span>Customers</span>
          </li>
          <li className={styles.menuItem}>
            <img src="/icons/chat.svg" alt="chat room" />
            <span>Chat Room</span>
          </li>
          <li className={`${styles.menuItem} ${styles.active}`}>
            <img src="/icons/calendar.svg" alt="calendar" />
            <span>Calendar</span>
          </li>
          <li className={styles.menuItem}>
            <img src="/icons/help.svg" alt="help center" />
            <span>Help Center</span>
          </li>
          <li className={styles.menuItem}>
            <img src="/icons/settings.svg" alt="settings" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
