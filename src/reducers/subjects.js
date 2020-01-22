export default (state = null, action) =>
  action.type === "CHANGE_SUBJECTS" ? action.payload : state;
