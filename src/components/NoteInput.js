import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard'

export default class NoteInput extends Component {
  static propTypes = {
    username: PropTypes.any,
    onSubmit: PropTypes.func,
    onUserNameInputBlur: PropTypes.func
  }

  static defaultProps = {
    username: '',
    filename: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      editor_input_class: 'note-editor__input'
    }
  }

  componentWillReceiveProps(next_props) {
    // on edit show the note content to the textarea
    let index_edit = next_props.index_edit;
    let notes = this.props.notes;
    let content = index_edit !== undefined && index_edit !== null ? notes[index_edit].content: '';
    this.setState({content});
  }

  componentDidMount () {
    this.textarea.focus()
  }

  handleUsernameInputBlur (event) {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(event.target.value)
    }
  }

  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }

  handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }

  handleAddNote () {
    this.setState({editor_input_class: 'note-editor__input show'})
  }

  handleSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content
      })
    }
    this.setState({ content: '' })
  }

  render () {
    let ShareButton = this.props.filename.length > 0 ? (
      <div className='note-editor--share'>
        <CopyToClipboard text={`${window.location.host}/view?file=${this.props.filename}`}>
          <button>Share Note</button>
        </CopyToClipboard>
      </div>
    ): ''
    return (
      <div className='note-editor'>
        {ShareButton}
        <div className="note-editor--add">
          <button
            onClick={this.handleAddNote.bind(this)}>Add note</button>
        </div>
        <div className={this.state.editor_input_class}>
          <div className='note-field'>
            <span className='note-field__label'>Name:</span>
            <div className='note-field__input'>
              <input
                value={this.state.username}
                onBlur={this.handleUsernameInputBlur.bind(this)}
                onChange={this.handleUsernameChange.bind(this)} />
            </div>
          </div>
          <div className='note-field'>
            <span className='note-field__label'>Content: </span>
            <div className='note-field__input'>
              <textarea
                ref={(textarea) => this.textarea = textarea}
                value={this.state.content}
                onChange={this.handleContentChange.bind(this)} />
            </div>
          </div>
          <div className='note-editor--save'>
            <button
              onClick={this.handleSubmit.bind(this)}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}
