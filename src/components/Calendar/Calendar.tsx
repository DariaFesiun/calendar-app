import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventInput, DateSelectArg } from '@fullcalendar/core';
import styles from './Calendar.module.scss';
import EventModal from '../../modals/EventModal';


const Calendar = () => {
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<EventInput | null>(null);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'agenda'>('dayGridMonth');
  const [currentMonth, setCurrentMonth] = useState('');


  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedInfo(selectInfo);
    setEventToEdit(null);
    if (selectInfo.jsEvent) {
      setModalPosition({
        x: selectInfo.jsEvent.clientX,
        y: selectInfo.jsEvent.clientY,
      });
    }
    setIsModalOpen(true);
  };

  const handleModalSave = (
    title: string,
    color: string,
    date: string,
    time: string
  ) => {
    const start = new Date(`${date}T${time}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    if (eventToEdit) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventToEdit.id
            ? {
              ...e,
              title,
              start,
              end,
              backgroundColor: color,
              borderColor: color,
            }
            : e
        )
      );
    } else {
      const newEvent: EventInput = {
        id: String(Date.now()),
        title,
        start,
        end,
        allDay: false,
        backgroundColor: color,
        borderColor: color,
      };
      setEvents([...events, newEvent]);
    }

    setIsModalOpen(false);
    setSelectedInfo(null);
    setEventToEdit(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInfo(null);
  };

  const handleEventClick = (clickInfo: any) => {
    setEventToEdit({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      allDay: clickInfo.event.allDay,
      backgroundColor: clickInfo.event.backgroundColor,
    });

    if (clickInfo.jsEvent) {
      setModalPosition({
        x: clickInfo.jsEvent.clientX,
        y: clickInfo.jsEvent.clientY,
      });
    };

    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (eventToEdit) {
      setEvents((prev) => prev.filter((e) => e.id !== eventToEdit.id));
      setIsModalOpen(false);
      setEventToEdit(null);
      setSelectedInfo(null);
    }
  };

  const handleEventDrop = (dropInfo: any) => {
    const { id, start, end } = dropInfo.event;

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? {
            ...event,
            start,
            end,
          }
          : event
      )
    );
  };

  const handleEventResize = (resizeInfo: any) => {
    const { id, start, end } = resizeInfo.event;

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? {
            ...event,
            start,
            end,
          }
          : event
      )
    );
  };

  const handleViewChange = (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => {
    setCurrentView(view);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
    }
  };

  const handlePrevClick = () => {
    const api = calendarRef.current?.getApi();
    api?.prev();
    updateMonthTitle(api);
  };


  const handleNextClick = () => {
    const api = calendarRef.current?.getApi();
    api?.next();
    updateMonthTitle(api);
  };

  const handleTodayClick = () => {
    const api = calendarRef.current?.getApi();
    api?.today();
    updateMonthTitle(api);
  };

  const updateMonthTitle = (api: any) => {
    const date = api.getDate();
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
    setCurrentMonth(formatter.format(date));
  };

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      const date = api.getDate();
      const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
      setCurrentMonth(formatter.format(date));
    }
  }, [currentView, events]);




  return (
    <div className={styles.calendarContainer}>
  
      <div className={styles.topbarRow}>
        <h2 className={styles.sectionTitle}>Calendar View</h2>
  
        <div className={styles.viewButtons}>
          <button
            className={`${styles.viewButton} ${currentView === 'dayGridMonth' ? styles.active : ''}`}
            onClick={() => handleViewChange('dayGridMonth')}
          >
            Month
          </button>
          <button
            className={`${styles.viewButton} ${currentView === 'timeGridWeek' ? styles.active : ''}`}
            onClick={() => handleViewChange('timeGridWeek')}
          >
            Week
          </button>
          <button
            className={`${styles.viewButton} ${currentView === 'timeGridDay' ? styles.active : ''}`}
            onClick={() => handleViewChange('timeGridDay')}
          >
            Day
          </button>
          <button
            className={`${styles.viewButton} ${currentView === 'agenda' ? styles.active : ''}`}
            onClick={() => setCurrentView('agenda')}
          >
            Agenda
          </button>
        </div>
      </div>
  
      <div className={styles.toolbarRow}>
        <div className={styles.navButtons}>
          <button className={`${styles.navBtn} ${styles.today}`} onClick={handleTodayClick}>Today</button>
          <button className={styles.navBtn} onClick={handlePrevClick}>Back</button>
          <button className={styles.navBtn} onClick={handleNextClick}>Next</button>
        </div>
  
        <h2 className={styles.calendarTitle}>{currentMonth}</h2>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: '',
          center: '',
          right: ''
        }}
        initialView={currentView}
        editable={true}
        selectable={true}
        selectMirror={true}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResizableFromStart={true}
        eventDurationEditable={true}
        eventResize={handleEventResize}
      />
  
      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        initialTitle={eventToEdit?.title}
        initialColor={eventToEdit?.backgroundColor as string}
        initialDate={
          eventToEdit?.start instanceof Date
            ? eventToEdit.start.toISOString().split('T')[0]
            : ''
        }
        initialTime={
          eventToEdit?.start instanceof Date
            ? eventToEdit.start.toTimeString().slice(0, 5)
            : ''
        }
        isEditing={!!eventToEdit}
        onDelete={handleDelete}
        modalPosition={modalPosition}
      />
    </div>
  );
  
};

export default Calendar;