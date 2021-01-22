export const getAppointmentsForDay = (state, day) => {

  let results = [];

  for (const obj of state.days) {
    if(obj.name === day) {
      for (const dayAppt of obj.appointments) {
        for (const appt of Object.values(state.appointments)) {
          if (dayAppt === appt.id) {
            results.push(appt)
          }
        }
      }
    }
  }
  return results;
};

