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
        setState(prev => ({
          ...prev,
          appointments
        }))
        axios.get('/api/days')
          .then((data) => {
            return setState(prev => ({
              ...prev,
              days: data.data
            }))
          })
      })
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        return setState(prev => {
          return { ...prev }
        })
      })
      .then(() => {
        return axios.get('/api/days')
          .then((data) => {
            return setState(prev => ({
              ...prev,
              days: data.data
            }))
          })
      })
  };

  return { state, setState, setDay, bookInterview, cancelInterview };
};