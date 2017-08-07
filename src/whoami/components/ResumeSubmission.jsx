import React from 'react';
import { connect } from 'react-redux';

import Alert from 'elemental/lib/components/Alert';
import Button from 'elemental/lib/components/Button';
import Spinner from 'elemental/lib/components/Spinner';
import Form from 'elemental/lib/components/Form';
import FormField from 'elemental/lib/components/FormField';
import FormInput from 'elemental/lib/components/FormInput';

import 'elemental/less/elemental.less';

import { submissionEdit, submit } from '../actions/submission';

const SubmissionAlert = ({ busy, id, err }) => {
  if (busy) {
    return (
      <Alert type="info">
      Submitting your résumé, will be done in a moment.
      </Alert>
    );
  }
  if (id) {
    return (
      <Alert type="success">
        <strong>Success: </strong>Thank you for your submission, your reference ID is: {id}
      </Alert>
    );
  }
  if (err) {
    return (
      <Alert type="danger">
        <strong>Error: </strong>{err.toString()}
      </Alert>
    );
  }

  return null;
};

const ResumeSubmissionView = (
  { name, title, company, description, busy, id, err, onInput, onSubmit },
) => (
  <div>
    <SubmissionAlert busy={busy} id={id} err={err} />
    <Form>
      <FormField label="Name" htmlFor="name">
        <FormInput
          autoFocus
          type="text"
          name="name"
          value={name}
          onInput={onInput}
        />
      </FormField>
      <FormField label="Current Job Title" htmlFor="title">
        <FormInput
          type="text"
          name="title"
          value={title}
          onInput={onInput}
        />
      </FormField>
      <FormField label="Current Job Company" htmlFor="company">
        <FormInput
          type="text"
          name="company"
          value={company}
          onInput={onInput}
        />
      </FormField>
      <FormField label="Current Job Description" htmlFor="description" >
        <FormInput
          multiline
          name="description"
          value={description}
          onInput={onInput}
        />
      </FormField>
      <Button type="primary" onClick={onSubmit}>
        {busy ? <Spinner type="inverted" /> : 'Submit'}
      </Button>
    </Form>
  </div>
);

const mapStateToProps = ({ submission }) => ({
  name: submission.name,
  title: submission.title,
  company: submission.company,
  description: submission.description,
  id: submission.id,
  busy: submission.busy,
  err: submission.err,
});

const mapDispatchToProps = dispatch => ({
  onInput: e => dispatch(submissionEdit(e.target.name, e.target.value)),
  onSubmit: () => dispatch(submit),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeSubmissionView);
