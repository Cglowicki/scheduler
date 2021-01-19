import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const formatSpots = (numOfSpots) => {
    if (numOfSpots === 0) {
      return 'no spots remaining';
    } else if (numOfSpots === 1) {
      return '1 spot remaining';
    } else {
      return `${numOfSpots} spots remaining`;
    }
  };

  const textClass = classNames('text', {
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0

  });

  return (
    <li className = {textClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
