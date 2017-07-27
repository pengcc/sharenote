import React, { Component } from 'react';

export default class NoteDisplay extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    }
  }
  getContent() {
    let loadedContent = "this is test content";
    return loadedContent;
  }
  handleContentChanged(newContent) {
    let content = newContent;
    this.setState({content});
  }
  componentWillMount() {
    let content = this.getContent();
    this.setState({content});
  }
  render () {
    return (
      <div class="content">{this.state.content}</div>
    )
  }
}
