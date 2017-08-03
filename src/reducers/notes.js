// action types
const INIT_NOTES = 'INIT_NOTES'
const ADD_NOTE = 'ADD_NOTE'
const SAVE_NOTE = 'SAVE_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'

// reducer
export default function (state, action) {
  if (!state) {
    state = { notes: [] }
  }
  switch (action.type) {
    case INIT_NOTES:
      // init
      return { notes: action.notes }
    case ADD_NOTE:
      // add note
      return {
        notes: [...state.notes, action.note]
      }
    case SAVE_NOTE:
      // save not
      return {
        notes: [...action.notes]
      }
    case UPDATE_NOTE:
      // update note
      return {...state, updateNoteIndex: action.noteIndex}
    case DELETE_NOTE:
      // delete note
      return {
        notes: [
          ...state.notes.slice(0, action.noteIndex),
          ...state.notes.slice(action.noteIndex + 1)
        ]
      }
    default:
      return state
  }
}

// action creators
export const initNotes = (notes) => {
  return { type: INIT_NOTES, notes }
}

export const saveNotes = (notes) => {
  return { type: SAVE_NOTE, notes }
}
export const addNote = (note) => {
  return { type: ADD_NOTE, note }
}

export const updateNote = (noteIndex) => {
  return { type: UPDATE_NOTE, noteIndex }
}
export const deleteNote = (noteIndex) => {
  return { type: DELETE_NOTE, noteIndex }
}
