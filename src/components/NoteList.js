import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Note from './Note'

export default class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.array,
    onDeleteNote: PropTypes.func,
    onEditNote: PropTypes.func
  }

  static defaultProps = {
    notes: []
  }

  handleDeleteNote (index) {
    if (this.props.onDeleteNote) {
      this.props.onDeleteNote(index)
    }
  }

  handleEditNote (index) {
    if (this.props.onEditNote) {
      this.props.onEditNote(index)
    }
  }

  render() {
    let current_username = this.props.username;
    return (
      <div>
        {this.props.notes.map((note, i) =>
          <Note
            note={note}
            key={i}
            index={i}
            is_editable={note.username === current_username}
            onEditNote={this.handleEditNote.bind(this)}
            onDeleteNote={this.handleDeleteNote.bind(this)} />
        )}
      </div>
    )
  }
}
