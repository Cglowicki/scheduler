import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "components/DayList";
import Appointment from "components/Appointment"

import "components/Application.scss";

/* const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
]; */

const appointments = [
  {
    id: 1,
    time: "12pm",
  },

  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 2,
    time: "2pm",
  },

  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Patricia Flowers",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },

  {
    id: 3,
    time: "4pm",
  },

  {
    id: 4,
    time: "5pm",
    interview: {
      student: "Leroy Jenkins",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },

  {
    id: 4,
    time: "6pm",
  },

  {
    id: 5,
    time: "7pm",
    interview: {
      student: "Sally Withers",
      interviewer: {
        id: 2,
        name: "Tori Malcom",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState(["Monday"]);
  const [days, setDays] = useState([]);
  const URL = 'http://localhost:8001/api/days'
  useEffect(() => {
    axios.get(URL).then(response => {
      setDays([...response.data])
    });
  }, [])
  

  let appointment = appointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="8pm" />
      </section>
    </main>
  );
}

