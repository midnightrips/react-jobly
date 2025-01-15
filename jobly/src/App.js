import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from './NavBar';
import RoutesList from './RoutesList';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <RoutesList />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
