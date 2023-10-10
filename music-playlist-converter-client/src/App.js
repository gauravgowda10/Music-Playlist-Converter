import React from 'react';

import Home from './pages/Home';
import Playlist from './pages/Playlists/Playlist';
import Result from './pages/Results/Result'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <main>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </Router>
      </main>)
  }
}

export default App;
