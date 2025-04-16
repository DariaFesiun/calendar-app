import React from 'react';
import Aside from '../components/Aside/Aside';
import Header from '../components/Header/Header';
import Calendar from '../components/Calendar/Calendar'; 
import styles from './CalendarPage.module.scss';

const CalendarPage = () => {
  return (
    <div className={styles.layout}>
      <Aside />
      <div className={styles.main}>
        <Header />
        <h1 className={styles.pageTitle}>Calendar</h1>
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarPage;