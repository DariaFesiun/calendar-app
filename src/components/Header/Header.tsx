import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.topbar}>
      <div className={styles.searchBlock}>
        <img src="/icons/search.svg" alt="search" />
        <input type="text" placeholder="Search transactions, invoices or help" />
      </div>

      <div className={styles.topbarRight}>
        <div className={styles.iconGroup}>
          <img className={styles.globeIcon} src="/icons/help.svg" alt="Help" />
          <img className={styles.chatIcon} src="/icons/chat.svg" alt="Chat" />
          <div className={styles.iconWrapper}>
            <img className={styles.bellIcon} src="/icons/bell.svg" alt="Notifications" />
            <span className={styles.notificationDot}></span>
          </div>
        </div>
        <div className={styles.divider} />

        <span className={styles.username}>John Doe</span>
        <img className={styles.dropdownIcon} src="/icons/arrow-down.svg" alt="Arrow down" />
        <img className={styles.avatar} src="https://i.pravatar.cc/32" alt="User Avatar" />
      </div>
    </header>
  );
};

export default Header;
