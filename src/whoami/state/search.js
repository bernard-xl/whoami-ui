export default (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_START':
      return { ...state, busy: true };
    case 'SEARCH_DONE':
      return { ...state, busy: false, err: null, found: action.found };
    case 'SEARCH_FAILED':
      return { ...state, busy: false, err: action.err };
    default:
      return state;
  }
};
