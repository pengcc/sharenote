import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import NoteApp from './containers/NoteApp'
import notesReducer from './reducers/notes'
import './index.css'

const store = createStore(notesReducer)

ReactDOM.render(
  <Provider store={store}>
    <NoteApp />
  </Provider>,
  document.getElementById('root')
);
