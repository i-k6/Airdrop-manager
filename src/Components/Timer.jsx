import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TiTick } from 'react-icons/ti';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { collection, addDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

function DailyCheckInButton({ date, onCheckIn }) {
  const handleCheckIn = () => {
    onCheckIn(date);
  };

  return (
    <div
      onClick={handleCheckIn}
      style={{
        cursor: 'pointer',
        marginRight: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        backgroundColor: 'green'
      }}
    >
      <TiTick style={{ color: 'white' }} />
    </div>
  );
}

function CalendarWithCheckIn() {
  const [date, setDate] = useState(new Date());
  const [checkedDates, setCheckedDates] = useState([]);
  const [showCheckInAlert, setShowCheckInAlert] = useState(false);

  useEffect(() => {
    fetchCheckedDates();
  }, []);

  const fetchCheckedDates = async () => {
    try {
      const checkInCollection = collection(db, 'checkins');
      const querySnapshot = await getDocs(checkInCollection);
      const checkedDatesData = querySnapshot.docs.map(doc => new Date(doc.id));
      setCheckedDates(checkedDatesData);
    } catch (error) {
      console.error('Error fetching checked dates:', error);
    }
  };

  const handleCheckIn = async (date) => {
    try {
      const dateString = date.toISOString();
      await addDoc(collection(db, 'checkins'), { [dateString]: true });
      fetchCheckedDates();
      setShowCheckInAlert(true);
      setTimeout(() => setShowCheckInAlert(false), 2000);
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleDeleteCheckIn = async (date) => {
    try {
      const dateString = date instanceof Date ? date.toISOString() : null;
      if (dateString) {
        await deleteDoc(doc(db, 'checkins', dateString));
        fetchCheckedDates();
      } else {
        console.error('Invalid date for deletion:', date);
      }
    } catch (error) {
      console.error('Error deleting check-in:', error);
    }
  };
  

  const isDateCheckedIn = (date) => {
    const dateString = date.toDateString();
    return checkedDates.some(d => d.toDateString() === dateString);
  };

  const getNumDaysCheckedIn = () => {
    return checkedDates.length;
  };

  const customTileContent = ({ date, view }) => {
    if (view === 'month') {
      const isCheckedIn = isDateCheckedIn(date);
      return isCheckedIn ? <span style={{ color: 'green' }}>✔️</span> : null;
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '50px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IoIosArrowBack style={{ cursor: 'pointer' }} onClick={() => setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)))} />
              <IoIosArrowForward style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + 1)))} />
              <div style={{ marginLeft: '10px' }}>Days Checked In: {getNumDaysCheckedIn()}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DailyCheckInButton date={date} onCheckIn={handleCheckIn} />
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '10px',
              marginTop: '10px',
              padding: '5px',
              textAlign: 'center',
              display: showCheckInAlert ? 'block' : 'none'
            }}
          >
            Checked in for {date.toDateString()}
          </div>
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={customTileContent}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarWithCheckIn;
