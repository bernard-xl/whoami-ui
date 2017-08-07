import request from 'superagent';

const path = '/api/v1/resume';

const submissionStart = {
  type: 'SUBMISSION_START',
};

const submissionReceived = id => ({
  type: 'SUBMISSION_RECEIVED',
  id,
});

const submissionFailed = err => ({
  type: 'SUBMISSION_FAILED',
  err,
});

export const submissionEdit = (field, value) => ({
  type: 'SUBMISSION_EDIT',
  field,
  value,
});

export const submit = (dispatch, getState) => {
  dispatch(submissionStart);
  const { name, title, company, description } = getState().submission;
  request
    .post(path)
    .send({ name, title, company, description })
    .end((err, res) => {
      if (err) {
        if (err.status === 400) {
          dispatch(submissionFailed('All fields are mandatory'));
        } else {
          dispatch(submissionFailed(err.status));
        }
      } else {
        dispatch(submissionReceived(res.body.id));
      }
    });
};
