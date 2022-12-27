import React from 'react';
import './App.scss';
import Container from "./components/Container";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

function App() {

  return (
    <div className="app">
      <Container>
        <Routes>
          <Route path={'/'} element={<Main />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
