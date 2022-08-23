import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import PopUp from './components/popup-menu';

import MintSite from './websites/mint/App';
import DexSite from './websites/dex/App';

function App() {
  return (
    <Router>
      <div className="G-App">
        <PopUp />
        <Routes>
          <Route path='/' element={<MintSite />} />
          <Route path='mint' element={<MintSite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
