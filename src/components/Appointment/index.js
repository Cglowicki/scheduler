import React from 'react';

import './styles.scss';

import useVisualMode from 'hooks/useVisualMode';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

export default function Appointment(props) {

  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'Are you sure you would like to delete?';
  const DELETING = 'DELETING';
  const EDIT = 'EDITING';
  const ERROR_SAVE = 'Our apologies, your interview cannot be booked at this time...';
  const ERROR_DELETE = 'Our apologies, your interview cannot be canceled at this time...';


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  function destroy(id) {
    transition(DELETING, true)
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  const edit = () => { transition(EDIT) }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log("PROPS INTERVIEW", props.interview)



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
          onConfirm={() => { destroy(props.id) }}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === DELETING && <Status message={DELETING} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={ 
            props.interview.interviewer
              ? props.interview.interviewer.name
              : ""
          }
          id={props.id}
          onDelete={() => (transition(CONFIRM))}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message={ERROR_SAVE}
          onClose={() => back()}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={ERROR_DELETE}
          onClose={() => back()}
        />
      )}
    </article>
  );
};