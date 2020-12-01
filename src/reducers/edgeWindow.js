export const defaultEdgeWindowReducerState = {
  data: undefined,
  open: false,
};

const edgeWindowReducer = (state, action) => {
  switch (action.type) {
    case 'CANCEL':
      return {
        data: undefined,
        open: false,
      };
    case 'CLOSE':
      return {
        data: state.data,
        open: false,
      };
    case 'OPEN':
      return {
        data: undefined,
        open: true,
      };
    case 'SET_DATA':
      return {
        data: action.data,
        open: state.open,
      };
    default:
      return state;
  }
};

export default edgeWindowReducer;
