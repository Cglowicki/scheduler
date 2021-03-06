export const getAppointmentsForDay = (state, day) => {

  let results = [];

  for (const obj of state.days) {
    if (obj.name === day) {
      for (const dayAppt of obj.appointments) {
        for (const appt of Object.values(state.appointments)) {
          if (dayAppt === appt.id) {
            results.push(appt);
          }
        }
      }
    }
  }
  
  return results;
};

export const getInterview = (state, interview) => {

  if (!interview) {
    return null;
  };

  const interviewerId = interview.interviewer;

  const interviewer = state.interviewers[interviewerId];

  const result = { ...interview, interviewer };

  return result;

};

export const getInterviewersForDay = (state, day) => {

  let results = [];

  for (const obj of state.days) {
    if (obj.name === day) {
      for (const intID of obj.interviewers) {
        for (const int of Object.values(state.interviewers)) {
          if (intID === int.id) {
            results.push(int);
          }
        }
      }
    }
  }
  
  return results;
};

export const updateSpots = (state) => {
  const updatedDays = [];
  for(const day of state.days) {
    let updatedSpots = 0;
    day.appointments.forEach((apptID) => {
      if (state.appointments[apptID].interview === null) {
        updatedSpots++;
      }
    })
    let updatedDay = {...day, spots: updatedSpots};
    updatedDays.push(updatedDay);
  }
  return updatedDays;
}
