export default (state = {}, action) => {
  switch (action.type) {
    case 'SUBMISSION_START':
      return { ...state, busy: true };
    case 'SUBMISSION_EDIT':
      return { ...state, [action.field]: action.value };
    case 'SUBMISSION_RECEIVED':
      return { busy: false, id: action.id };
    case 'SUBMISSION_FAILED':
      return { ...state, busy: false, err: action.err };
    default:
      return state;
  }
};
