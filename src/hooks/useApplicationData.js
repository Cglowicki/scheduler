import { useState, useEffect } from "react";
import { updateSpots } from '../Helpers/selectors.js';
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

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        setState(prev => {
          const newState = {...prev, appointments}
          let updatedDays = updateSpots(newState)
          newState.days = updatedDays
          return newState
        })
      })
    };

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        return setState(prev => {
          return { ...prev, appointments }
        })
      })
      .then(() => {
        return axios.get("http://localhost:8001/api/days")
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