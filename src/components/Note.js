import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Note extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onDeleteNote: PropTypes.func,
    onEditNote: PropTypes.func,
    index: PropTypes.number
  }

  _getProcessedContent (content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  handleDeleteNote () {
    if (this.props.onDeleteNote) {
      this.props.onDeleteNote(this.props.index)
    }
  }

  handleEditNote () {
    if (this.props.onEditNote) {
      this.props.onEditNote(this.props.index)
    }
  }

  render () {
    const note = this.props.note
    const EditBlock = this.props.is_editable ? (
      <div>
        <span
          onClick={this.handleEditNote.bind(this)}
          className="note-edit">
          Edit
        </span>
        <span
          onClick={this.handleDeleteNote.bind(this)}
          className="note-delete">
          Delete
        </span>
      </div>
    ) : '';
    return (
      <div className='note'>
        <div className='note-user'>
          <span className='note-username'>
            {note.username}
          </span>：
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(note.content)
        }} />
        {EditBlock}
      </div>
    )
  }
}
