import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import GameSettings from "pages/GameSettings";
import GameScreen from "pages/GameScreen";
import ViewRecordedGames from "pages/ViewRecordedGames";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setting" element={<GameSettings />} />
            <Route path="/game" element={<GameScreen />} />
            <Route path="/record" element={<ViewRecordedGames />} />
          </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
