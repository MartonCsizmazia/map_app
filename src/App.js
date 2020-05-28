import React from 'react';
import logo from './logo.svg';
import './App.css';

const api = {
    key : "730d0ef18b49b5ed854bdb39626c5d51",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {



  return (
    <div className="app warm">
        <main>
          <div className="search-box">
              <input
                  type="text"
                  className="search-bar"
                  placeholder="Search..."
              />
          </div>
          <div className="location-box">
              <div className="location">New York City, US</div>
              <div className="date">{dateBuilder(new Date())}</div>
          </div>
        </main>
    </div>
  );
}

export default App;
