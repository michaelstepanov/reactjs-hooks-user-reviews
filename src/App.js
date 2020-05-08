import React from 'react';
import './App.css';
import {DataProvider} from "./context/DataContext";
import Reviews from "./components/Reviews";

function App() {
  return (
    <DataProvider>
      <div>
        <div className="container wrapper">
          <div className="page-header text-center mt-4 mb-4">
            <h1>User Reviews</h1>
          </div>
          <Reviews />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
