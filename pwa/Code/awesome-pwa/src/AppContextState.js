import React from "react";
import uuidv1 from "uuid/v1";
import {
  loadNotes as loadNotesApi,
  addNote as addNoteApi,
  loadLabels as loadLabelsApi,
  addLabel as addLabelApi,
  updateLabel as updateLabelApi,
  deleteLabel as deleteLabelApi
} from "./services/firebase";
import DB from "./services/db";
import { registerBackgroundSync } from "./utils";

const LOAD_NOTES_REQUEST = "LOAD_NOTES_REQUEST";
const LOAD_NOTES_SUCCESS = "LOAD_NOTES_SUCCESS";
const LOAD_NOTES_FAILURE = "LOAD_NOTES_FAILURE";

const ADD_NEW_NOTE = "ADD_NEW_NOTE";
const ADD_NOTE_REQUEST = "ADD_NOTE_REQUEST";
const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS";
const ADD_NOTE_FAILURE = "ADD_NOTE_FAILURE";

const LOAD_LABELS_REQUEST = "LOAD_LABELS_REQUEST";
const LOAD_LABELS_SUCCESS = "LOAD_LABELS_SUCCESS";
const LOAD_LABELS_FAILURE = "LOAD_LABELS_FAILURE";

const ADD_LABEL_REQUEST = "ADD_LABEL_REQUEST";
const ADD_LOCAL_LABEL = "ADD_LOCAL_LABEL";
const ADD_LABEL_SUCCESS = "ADD_LABEL_SUCCESS";
const ADD_LABEL_FAILURE = "ADD_LABEL_FAILURE";
const REMOVE_LOCAL_LABEL = "REMOVE_LOCAL_LABEL";

const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

const SHOW_LABELS_MODAL = "SHOW_LABELS_MODAL";
const HIDE_LABELS_MODAL = "HIDE_LABELS_MODAL";

const SET_APP_DEFER_PROMPT = "SET_APP_DEFER_PROMPT";

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

export async function loadNotes(dispatch, isOnline) {
  dispatch({ type: LOAD_NOTES_REQUEST });
  try {
    let notes = [];
    if (isOnline) {
      notes = await loadNotesApi();
      dispatch({ type: LOAD_NOTES_SUCCESS, data: notes });
      // save to local
      DB.saveAllNotes(notes).then(() => {
        console.log("Saved all notes to local db");
      });
    } else {
      notes = await DB.getAllNotes();
      dispatch({ type: LOAD_NOTES_SUCCESS, data: notes });
    }
  } catch (error) {
    dispatch({ type: LOAD_NOTES_FAILURE, error });
    const notes = await DB.getAllNotes();
    dispatch({ type: LOAD_NOTES_SUCCESS, data: notes });
  }
}

export async function addNewNote(dispatch, note) {
  dispatch({ type: ADD_NEW_NOTE, note });
}

export async function saveNote(dispatch, note, isOnline) {
  dispatch({ type: ADD_NOTE_REQUEST, note });
  try {
    let savedNote;
    if (isOnline) {
      savedNote = await addNoteApi(note);
    } else {
      savedNote = { id: uuidv1(), ...note };
      DB.saveNote(savedNote);
      // register sync
      registerBackgroundSync("SYNC-NOTES");
    }
    dispatch({ type: ADD_NOTE_SUCCESS, payload: savedNote });
  } catch (error) {
    console.log("add note failed", error);
    dispatch({ type: ADD_NOTE_FAILURE, error });

    const savedNote = { id: uuidv1(), ...note };
    DB.saveNote(savedNote);
    registerBackgroundSync("SYNC-NOTES");
    dispatch({ type: ADD_NOTE_SUCCESS, payload: savedNote });
  }
}

export async function loadLabels(dispatch) {
  dispatch({ type: LOAD_LABELS_REQUEST });
  try {
    const labels = await loadLabelsApi();
    dispatch({ type: LOAD_LABELS_SUCCESS, data: labels });
  } catch (error) {
    dispatch({ type: LOAD_LABELS_FAILURE, error });
  }
}

export async function saveLabel(dispatch, label) {
  dispatch({ type: ADD_LABEL_REQUEST });
  try {
    const { id, name } = label;
    if (!id) {
      dispatch({ type: ADD_LOCAL_LABEL, payload: { id: uuidv1(), name } });
      const addedLabel = await addLabelApi({ name });
      dispatch({ type: ADD_LABEL_SUCCESS, data: addedLabel });
    } else {
      dispatch({ type: ADD_LOCAL_LABEL, payload: { name, id } });
      await updateLabelApi({ id, name });
    }
  } catch (error) {
    dispatch({ type: ADD_LABEL_FAILURE, error });
  }
}

export async function deleteLabel(dispatch, label) {
  try {
    dispatch({ type: REMOVE_LOCAL_LABEL, payload: label });
    await deleteLabelApi(label.id);
    loadLabels(dispatch);
  } catch (error) {}
}

export const showNotification = (severity = "success", message) => ({
  type: SHOW_NOTIFICATION,
  message,
  severity
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});

export const showLabelsModal = () => ({
  type: SHOW_LABELS_MODAL
});

export const hideLabelsModal = () => ({
  type: HIDE_LABELS_MODAL
});

export const setAppDeferPrompt = e => ({
  type: SET_APP_DEFER_PROMPT,
  payload: e
});

const appInitState = {
  notes: {
    data: [],
    loading: false,
    error: null
  },
  labels: {
    data: [],
    loading: false,
    error: null
  },
  hasNewNote: false,
  alert: {
    severity: "",
    open: false,
    message: ""
  },
  labelsModal: {
    open: false
  },
  loading: false,
  appPrompt: null
};

function combineReducers(reducerDict) {
  const _initialState = getInitialState(reducerDict);
  return function(state = _initialState, action) {
    return Object.keys(reducerDict).reduce((acc, curr) => {
      let slice = reducerDict[curr](state[curr], action);
      return { ...acc, [curr]: slice };
    }, state);
  };
}

// Helpers
function getInitialState(reducerDict) {
  return Object.keys(reducerDict).reduce((acc, curr) => {
    const slice = reducerDict[curr](undefined, { type: undefined });
    return { ...acc, [curr]: slice };
  }, {});
}

function notesReducer(state, action) {
  switch (action.type) {
    case LOAD_NOTES_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case LOAD_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data
      };
    }
    case LOAD_NOTES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case ADD_NEW_NOTE: {
      return {
        ...state,
        data: [...[action.note], ...state.data]
      };
    }
    case ADD_NOTE_SUCCESS: {
      return {
        ...state,
        data: [...[action.payload], ...state.data]
      };
    }
    default:
      return state;
  }
}

function labelsReducer(state, action) {
  switch (action.type) {
    case LOAD_LABELS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case LOAD_LABELS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data
      };
    }
    case LOAD_LABELS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case ADD_LOCAL_LABEL: {
      return {
        ...state,
        data: [...[action.payload], ...state.data]
      };
    }
    case REMOVE_LOCAL_LABEL: {
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload.id)
      };
    }
    default:
      return state;
  }
}

function notificationsReducer(state, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      return {
        ...state,
        open: true,
        severity: action.severity,
        message: action.message
      };
    }
    case HIDE_NOTIFICATION: {
      return {
        ...state,
        severity: "",
        open: false,
        message: ""
      };
    }
    default:
      return state;
  }
}

function labelsModalReducer(state, action) {
  switch (action.type) {
    case SHOW_LABELS_MODAL: {
      return {
        ...state,
        open: true
      };
    }
    case HIDE_LABELS_MODAL: {
      return {
        ...state,
        open: false
      };
    }
    default:
      return state;
  }
}

function loadingReducer(state, action) {
  switch (action.type) {
    case ADD_NOTE_REQUEST: {
      return true;
    }
    case ADD_NOTE_SUCCESS:
    case ADD_NOTE_FAILURE: {
      return false;
    }
    default:
      return state;
  }
}

function appPromptReducer(state, action) {
  switch (action.type) {
    case SET_APP_DEFER_PROMPT: {
      return action.payload;
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  notes: notesReducer,
  labels: labelsReducer,
  alert: notificationsReducer,
  labelsModal: labelsModalReducer,
  loading: loadingReducer,
  appPrompt: appPromptReducer
});

function AppProvider({ children }) {
  const initialState =
    appInitState || rootReducer(undefined, { type: undefined });
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return context;
}
function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }
  return context;
}

function useApp() {
  return [useAppState(), useAppDispatch()];
}

const AppStateConsumer = AppStateContext.Consumer;
const AppDispatchConsumer = AppDispatchContext.Consumer;

export {
  AppProvider,
  useAppState,
  useAppDispatch,
  useApp,
  AppStateConsumer,
  AppDispatchConsumer
};
