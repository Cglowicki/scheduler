import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {

  //key can also = day.id
  let days = props.days.map((day, i) => {
    return (
      <DayListItem
        key = {i}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay} 
      />
    )
  });

  return (
    <ul>
      {days}
    </ul>
  );
}