import './App.css';
import React from 'react';
import TreeViewer from './TreeViewer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TreeViewer />
        <button className='FormButton' onClick={() => console.log('open pop-up')}>Edit Tree</button>
      </div>
    );
  }
}

export default App;
