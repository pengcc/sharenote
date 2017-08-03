import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import { initNotes, deleteNote, updateNote } from '../reducers/notes'
import { fetchReadJson, fetchSaveJson } from '../utils/httpHelper'

class NoteListContainer extends Component {
  static propTypes = {
    notes: PropTypes.array,
    currentUser: PropTypes.string,
    initNotes: PropTypes.func,
    onDeleteNote: PropTypes.func
  }

  constructor () {
    super()
    this.state = { username: '' }
  }

  componentWillMount () {
    this._loadNotes()
    this._loadUsernameLocal()
  }

  _loadUsernameLocal () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _loadNotes() {
    let host = "http://localhost:5050";
    let initNotes = (data) => {
      let notes = data && data.hasOwnProperty('notes') ? data.notes : [];
      this.props.initNotes(notes);
    }
    fetchReadJson(host, initNotes);
  }

  _saveNotes(newNotes) {
    let host = "http://localhost:5050";
    fetchSaveJson(host, newNotes);
  }

  handleUpdateNote (index) {
    if (this.props.onUpdateNote) {
      this.props.onUpdateNote(index);
    }
  }
  handleDeleteNote (index) {
    const { notes } = this.props
    const newNotes = [
      ...notes.slice(0, index),
      ...notes.slice(index + 1)
    ]
    this._saveNotes({"notes": newNotes});
    if (this.props.onDeleteNote) {
      this.props.onDeleteNote(index)
    }
  }

  render () {
    return (
      <NoteList
        notes={this.props.notes}
        currentUser={this.state.username}
        onUpdateNote={this.handleUpdateNote.bind(this)}
        onDeleteNote={this.handleDeleteNote.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initNotes: (notes) => {
      dispatch(initNotes(notes))
    },
    onDeleteNote: (noteIndex) => {
      dispatch(deleteNote(noteIndex))
    },
    onUpdateNote: (noteIndex) => {
      dispatch(updateNote(noteIndex))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteListContainer)
