import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NoteInput from '../components/NoteInput'
import { saveNotes } from '../reducers/notes'
import { fetchSaveJson } from '../utils/httpHelper'

class NoteInputContainer extends Component {
  static propTypes = {
    notes: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor () {
    super()
    this.state = { username: '', filename: '' }
  }

  componentWillMount () {
    this._loadUsernameLocal()
  }

  _loadUsernameLocal () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsernameLocal (username) {
    localStorage.setItem('username', username)
  }

  _saveNotes(newNotes) {
    let host = "http://localhost:5050";
    let data = {newNotes: newNotes, filename: this.state.filename};
    fetchSaveJson(host, data, (res) => {
        let filename = res.filename;
        this.setState({ filename });
    });
  }
  _getNewNotes(note) {
    const { notes } = this.props
    let newNotes = [...notes];
    let isNewUser = true
    let notesLen = newNotes.length
    for (let i=0; i < notesLen; i++) {
      let item = newNotes[i];
      if (item.username === note.username) {
        isNewUser = false;
        newNotes[i].content = note.content;
        break;
      }
    }
    return isNewUser ? [...notes, note] : newNotes;
  }

  handleSubmitNote (note) {
    if (!note) return
    if (!note.username) {
      return alert('Please type the user name!');
    }
    if (!note.content) {
      return alert('Please type the content!');
    }
    this._saveUsernameLocal(note.username);
    const newNotes = this._getNewNotes(note);
    this._saveNotes({"notes": newNotes});
    if (this.props.onSubmit) {
      this.props.onSubmit(newNotes)
    }
  }

  render () {
    return (
      <NoteInput
        username={this.state.username}
        updateNote={this.props.updateNote}
        filename={this.state.filename}
        onUserNameInputBlur={this._saveUsernameLocal.bind(this)}
        onSubmit={this.handleSubmitNote.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  let updateNoteIndex = state.hasOwnProperty('updateNoteIndex') ? state.updateNoteIndex : null;
  let notes = state.notes;
  let updateNote = updateNoteIndex !== null ? notes[updateNoteIndex] : {};
  return {...{notes: notes}, updateNote}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (notes) => {
      dispatch(saveNotes(notes))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteInputContainer)
