import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "components/DayList";
import Appointment from "components/Appointment"

import useAppFunctions from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'Helpers/selectors';

import "components/Application.scss";

export default function Application(props) {

  const { state, setState, setDay, bookInterview, cancelInterview } = useAppFunctions();

  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setDays(all[0].data);
      setInterviewers(all[2].data);
      setAppointments(all[1].data);
    });
  }, []);

  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  let apptMap = dailyAppointments.map(appointment => {

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  })

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
            days={state.days}
            day={state.day}
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
        {apptMap}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}