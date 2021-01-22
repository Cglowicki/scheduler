export function getAppointmentsForDay(state, day) {
  
  //console.log("ACCESS THIS INFO ", state.days)
  //console.log(day);
  const dayOfAppt = state.days.find(dayOfWeek => dayOfWeek.name === day);

  //console.log("CHECKOUT ", dayOfAppt);

  if (state.days.length < 1) {
    return [];
  };

  if (dayOfAppt === undefined) {
    return [];
  };

  const result = dayOfAppt.appointments.map((id) => state.appointments[id]);

  //console.log(result);

  return result;
}