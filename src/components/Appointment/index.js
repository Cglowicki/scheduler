import React from 'react';
import axios from 'axios';

import './styles.scss';

import useVisualMode from 'hooks/useVisualMode';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';

export default function Appointment(props) {

  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'Are you sure you would like to delete?';
  const DELETING = 'DELETING';

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      });
  };

  function destroy(id) {
    transition(DELETING)
    props.cancelInterview(id)
    .then (() => (transition(EMPTY)))
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <Status message={SAVING} />}

      {mode === CONFIRM && (
        <Confirm
          message={CONFIRM}
          onCancel={() => back()}
          onConfirm={() => {destroy(props.id)}}
        />
      )}

      {mode === DELETING && <Status message={DELETING} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          id={props.id}
          onDelete={() => (transition(CONFIRM))}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />)}
    </article>
  );
};