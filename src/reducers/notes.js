// action types
const INIT_NOTES = 'INIT_NOTES'
const ADD_NOTE = 'ADD_NOTE'
const SAVE_NOTE = 'SAVE_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'
const EDIT_NOTE = 'EDIT_NOTE'

// reducer
export default function (state, action) {
  if (!state) {
    state = { notes: [], filename: '', username: '' }
  }
  switch (action.type) {
    case INIT_NOTES:
      // init
      return {
        notes: action.notes,
        filename: action.filename,
        username: action.username
      }
    case ADD_NOTE:
      // add note
      return {
        notes: [...state.notes, action.note],
        filename: action.filename,
        username: action.username
      }
    case SAVE_NOTE:
      // save note
      return {
        notes: [...action.notes],
        filename: action.filename,
        username: action.username
      }
    case EDIT_NOTE:
      // update note
      return {
        notes: [...state.notes],
        index_edit: action.index_edit,
        is_edit: true,
        filename: action.filename || state.filename,
        username: action.username || state.filename
      }
    case DELETE_NOTE:
      // delete note
      return {
        notes: [...action.notes],
        filename: action.filename || state.filename,
        username: action.username || state.username
      }
    default:
      return state
  }
}

// action creators
export const initNotes = (data) => {
  let { notes, filename, username } = data
  return { type: INIT_NOTES, notes, filename, username }
}

export const saveNotes = (data) => {
  let { notes, filename, username } = data
  return { type: SAVE_NOTE, notes, filename, username }
}
export const addNote = (data) => {
  let { note, filename, username } = data
  return { type: ADD_NOTE, note, filename, username }
}

export const editNote = (data) => {
  let { index_edit } = data
  return { type: EDIT_NOTE, index_edit, is_edit: true }
}

export const deleteNote = (data) => {
  let { notes, filename, username } = data
  return { type: DELETE_NOTE, notes, filename, username }
}
