import React, { Component } from 'react'
import NoteInput from './NoteInput'
import NoteList from './NoteList'

export default class NoteApp extends Component {
  render() {
    return (
      <div className='wrapper'>
        <NoteInput />
        <NoteList />
      </div>
    )
  }
}
