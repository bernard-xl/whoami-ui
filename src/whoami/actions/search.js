import request from 'superagent';

const path = '/api/v1/resume';

const searchStart = {
  type: 'SEARCH_START',
};

const searchDone = found => ({
  type: 'SEARCH_DONE',
  found,
});

const searchFailed = err => ({
  type: 'SEARCH_FAILED',
  err,
});

export default query => (dispatch) => {
  dispatch(searchStart, { method: 'GET', credentials: 'include' });
  request
    .get(path)
    .query({ q: query })
    .end((err, res) => {
      if (err) {
        dispatch(searchFailed(err.status));
      } else {
        dispatch(searchDone(res.body.found));
      }
    });
};
