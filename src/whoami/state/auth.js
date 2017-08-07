export default (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_OPEN_MODAL':
      return { ...state, password: '', isModalOpen: true };
    case 'AUTH_CLOSE_MODAL':
      return { ...state, password: '', isModalOpen: false };
    case 'AUTH_EDIT':
      return { ...state, [action.field]: action.value };
    case 'AUTH_LOGIN':
      return { user: action.user, isModalOpen: false };
    case 'AUTH_LOGOUT':
      return {};
    case 'AUTH_FAILED':
      return { ...state, password: '', err: action.err };
    default:
      return state;
  }
};
