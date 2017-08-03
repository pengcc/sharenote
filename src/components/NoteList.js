import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Note from './Note'

export default class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.array,
    onDeleteNote: PropTypes.func,
    onUpdateNote: PropTypes.func
  }

  static defaultProps = {
    notes: []
  }

  handleDeleteNote (index) {
    if (this.props.onDeleteNote) {
      this.props.onDeleteNote(index)
    }
  }

  handleUpdateNote (index) {
    if (this.props.onUpdateNote) {
      this.props.onUpdateNote(index)
    }
  }

  render() {
    let currentUser = this.props.currentUser;
    return (
      <div>
        {this.props.notes.map((note, i) =>
          <Note
            note={note}
            key={i}
            index={i}
            isEditable={note.username === currentUser}
            onUpdateNote={this.handleUpdateNote.bind(this)}
            onDeleteNote={this.handleDeleteNote.bind(this)} />
        )}
      </div>
    )
  }
}
