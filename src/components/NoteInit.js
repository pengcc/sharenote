import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NoteInit extends Component {
  handleCreateNote () {

  }
  render () {
    return(
      <div>
        <h1>创建便签</h1>
        <div className="note-title">
          <label>标题</label>
          <input />
        </div>
        <div className="note-description">
          <label>描述</label>
          <input />
        </div>
      <div className="note--create">
        <button
          onClick={this.handleCreateNote.bind(this)}>创建</button>
      </div>
    </div>
    )
  }
}
