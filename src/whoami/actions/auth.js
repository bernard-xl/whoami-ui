import request from 'superagent';

const loginPath = '/auth/login';
const logoutPath = '/auth/logout';

export const openLoginModal = {
  type: 'AUTH_OPEN_MODAL',
};

export const closeLoginModal = {
  type: 'AUTH_CLOSE_MODAL',
};

export const logout = (dispatch) => {
  request
    .post(logoutPath)
    .end(() => dispatch({ type: 'AUTH_LOGOUT' }));
};

export const editCredential = (field, value) => ({
  type: 'AUTH_EDIT',
  field,
  value,
});

const loginFailed = err => ({
  type: 'AUTH_FAILED',
  err,
});

const loginDone = user => ({
  type: 'AUTH_LOGIN',
  user,
});

export const login = (dispatch, getState) => {
  const { username, password } = getState().auth;
  request
    .post(loginPath)
    .type('form')
    .send({ username, password })
    .end((err, res) => {
      if (err) {
        if (err.status === 401) {
          dispatch(loginFailed('Incorrect username or password'));
        } else {
          dispatch(loginFailed(err.status));
        }
      } else {
        dispatch(loginDone(res.body.user));
      }
    });
};
