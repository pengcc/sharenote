import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NoteDisplay from './components/NoteDisplay';
import NoteInput from './components/NoteInput';

class Index extends Component {
  render() {
    return(
        <div>
          <NoteDisplay />
          <NoteInput />
        </div>
      )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
