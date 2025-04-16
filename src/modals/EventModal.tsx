import React, { useEffect, useState } from 'react';
import styles from './EventModal.module.scss';

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onSave: (title: string, color: string, date: string, time: string) => void;
  initialTitle?: string;
  initialColor?: string;
  initialDate?: string;
  initialTime?: string;
  isEditing?: boolean;
  modalPosition?: { x: number; y: number } | null;
};

const colors = ['#F87171', '#60A5FA', '#34D399', '#FBBF24', '#A78BFA'];

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialTitle = '',
  initialColor = colors[0],
  initialDate = '',
  initialTime = '',
  isEditing = false,
  modalPosition
}) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setSelectedColor(initialColor);
      setDate(initialDate);
      setTime(initialTime);
      setError('');
    }
  }, [isOpen, initialTitle, initialColor, initialDate, initialTime]);

  const handleSave = () => {
    if (!title || !date || !time) {
      setError('All fields are required');
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (selectedDateTime < now) {
      setError('Cannot select a past date/time');
      return;
    }

    setError('');
    onSave(title.trim(), selectedColor, date, time);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div
        className={styles.modal}
        style={
          modalPosition
            ? { position: 'absolute', top: modalPosition.y + 10, left: modalPosition.x +10 }
            : {}
        }>
          <div className={styles.modalArrow} />
        <div className={styles.header}>
          {/* <h3>{isEditing ? 'Edit Event' : 'New Event'}</h3> */}
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <input
          type="text"
          placeholder="event name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          placeholder="event date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          placeholder="event time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          type="text"
          placeholder="notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles.colors}>
          {colors.map((color) => (
            <span
              key={color}
              className={`${styles.colorCircle} ${color === selectedColor ? styles.selected : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          {isEditing && onDelete && (
            <button className={styles.delete} onClick={onDelete}>
              Delete event
            </button>
          )}

          <button onClick={onClose} className={styles.cancel}>Cancel</button>
          <button onClick={handleSave} className={styles.save}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
