import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NoteInput from '../components/NoteInput'
import { saveNotes } from '../reducers/notes'
import { fetchCreateJson, fetchSaveJson } from '../utils/httpHelper'

class NoteInputContainer extends Component {
  static propTypes = {
    notes: PropTypes.array,
    filename: PropTypes.string,
    username: PropTypes.string,
    index_edit: PropTypes.number,
    is_edit:PropTypes.bool,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    filename: ''
  }

  _saveNotesAfterAdding(data) {
    let host = "http://localhost:5050";
    let notes = data.notes;
    let request_data = { notes };
    // filename does exist. save the the new notes
    let is_request_save = this.props.filename.length > 0;
    if (is_request_save) {
      let filename = this.props.filename;
      request_data.filename = filename;
      fetchSaveJson(host, 'save', request_data, (res) => {
        if (this.props.onSubmit) {
          let submit_data = {notes: notes, username: data.username, filename}
          this.props.onSubmit(submit_data)
        }
      })
    } else {
      fetchCreateJson(host, 'create', request_data, (res) => {
          let filename = res.filename;
          if (this.props.onSubmit) {
            let submit_data = {notes: notes, username: data.username, filename}
            this.props.onSubmit(submit_data)
          }
      });
    }
  }

  _saveNotesAfterEditing (data) {
    let host = "http://localhost:5050";
    let notes = data.notes;
    let request_data = { notes };
    let filename = this.props.filename;
    request_data.filename = filename;
    fetchSaveJson(host, 'save', request_data, (res) => {
      if (this.props.onSubmit) {
        let submit_data = {notes: notes, username: data.username, filename}
        this.props.onSubmit(submit_data)
      }
    })
  }

  checkUsernameExist (name) {
    if (name.trim().length > 0  && name !== this.props.username && !this.props.is_edit ) {
      let notes = this.props.notes;
      for (let i=0, len = notes.length; i < len; i++) {
        let note = notes[i];
        if (note.username === name) {
          return true;
        }
      }
    }
  }
  handleUserNameInputBlur(username) {
    if (this.checkUsernameExist(username)) {
      alert(`${username} exists already! Please use another name!`);
    }
  }

  handleSubmitNote (note) {
    if (!note) return
    if (!note.username) {
      return alert('Please type the user name!');
    }
    if (!note.content) {
      return alert('Please type the content!');
    }

    let username = note.username;
    if (this.checkUsernameExist(username)) {
      return  alert(`${username} exists already! Please use another name!`);
    }
    let notes = this.props.notes;
    if (!this.props.is_edit) {
      let old_notes_len = notes.length;
      let new_notes= [];
      if (username === this.props.username) {
        // not click the edit button, direct update the current user's content
        new_notes = [...notes.slice(0, old_notes_len-1), note];
      } else {
        new_notes = [...notes, note];
      }
      this._saveNotesAfterAdding({notes: new_notes, username: username});
    } else {
      let edited_notes = [...notes];
      let index_edit = this.props.index_edit;
      edited_notes[index_edit].content = note.content;
      this._saveNotesAfterEditing({notes: edited_notes, username: username});
    }

  }

  render () {
    return (
      <NoteInput
        notes={this.props.notes}
        username={this.props.username}
        index_edit={this.props.index_edit}
        filename={this.props.filename}
        onUserNameInputBlur={this.handleUserNameInputBlur.bind(this)}
        onSubmit={this.handleSubmitNote.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  let index_edit = state.hasOwnProperty('index_edit') ? state.index_edit : null;
  let is_edit = state.hasOwnProperty('is_edit') ? state.is_edit : false;
  return {notes: state.notes, username: state.username, filename: state.filename, index_edit, is_edit}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(saveNotes(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteInputContainer)
