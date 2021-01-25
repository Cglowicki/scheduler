import { useState, useEffect } from "react";
import axios from 'axios';

export default function useAppFunctions() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments
        });
      });
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`);
  };

  return { state, setState, setDay, bookInterview, cancelInterview };
};