const stripped = window.location.pathname !== "/" ? window.location.pathname.replace(/\b\w/g, l => l.toUpperCase()).substr(1) : "Home";
export default (state = stripped.split("/")[0], action) => action.type === "CHANGE_PAGE_TITLE" ? action.payload : state;
