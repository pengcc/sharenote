import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NoteList from '../components/NoteList'
import { initNotes, deleteNote, editNote } from '../reducers/notes'
import { fetchReadJson, fetchSaveJson } from '../utils/httpHelper'

class NoteListContainer extends Component {
  static propTypes = {
    notes: PropTypes.array,
    filename: PropTypes.string,
    username: PropTypes.string,
    initNotes: PropTypes.func,
    onEditNote: PropTypes.func,
    onDeleteNote: PropTypes.func
  }

  constructor () {
    super()
    this.state = { notes: [], username: '', filename: '' }
  }

  componentWillMount () {
    this.handleInitNotes()
    this._loadUsernameLocal()
  }

  _loadUsernameLocal () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  handleInitNotes() {
    let host = "http://localhost:5050";
    let initNotes = (initData) => {
      let notes = initData && initData.hasOwnProperty('notes') ? initData.notes : []
      let filename = initData && initData.hasOwnProperty('filename') ? initData.filename: ''
      this.setState({ notes })
      let data = { notes, filename }
      if (this.props.initNotes) {
        this.props.initNotes(data);
      }
    }
    fetchReadJson(host, initNotes);
  }

  _saveNotesAfterDeleting(request_data) {
    let host = "http://localhost:5050"
    fetchSaveJson(host, 'save', request_data);
  }

  handleEditNote (index) {
    if (this.props.onEditNote) {
      this.props.onEditNote({index_edit: index});
    }
  }
  handleDeleteNote (index) {
    const { notes } = this.props
    const new_notes = [
      ...notes.slice(0, index),
      ...notes.slice(index + 1)
    ]
    let filename = this.props.filename
    this._saveNotesAfterDeleting({"notes": new_notes, filename: filename});
    if (this.props.onDeleteNote) {
      this.props.onDeleteNote({"notes": new_notes, filename: filename, username: this.props.username})
    }
  }

  render () {
    return (
      <NoteList
        notes={this.props.notes}
        filename={this.props.filename}
        username={this.props.username}
        onEditNote={this.handleEditNote.bind(this)}
        onDeleteNote={this.handleDeleteNote.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  // get the porperties from state
  return { notes: state.notes, filename: state.filename, username: state.username }
}

const mapDispatchToProps = (dispatch) => {
  // update state
  return {
    initNotes: (data) => {
      dispatch(initNotes(data))
    },
    onDeleteNote: (data) => {
      dispatch(deleteNote(data))
    },
    onEditNote: (data) => {
      dispatch(editNote(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteListContainer)
