import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {}
      )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-Data">
          {items.data}
        </div>
      </header>
    </div>
  );
}

export default App;
