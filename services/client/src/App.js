import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL)
    fetch(`${process.env.REACT_APP_API_URL}`)
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
          <br />
          {process.env.NODE_ENV}
        </div>
      </header>
    </div>
  );
}

export default App;
