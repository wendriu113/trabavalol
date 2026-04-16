import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import ChampionDetail from './pages/ChampionDetail';
import FormChampion from './pages/FormChampion';
import FormAbility from './pages/FormAbility';
import FormGameplay from './pages/FormGameplay';
import Favorites from './pages/Favorites';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <nav className="navbar">
          <Link to="/" className="logo">⚔️ LOL Champions</Link>

          <div className="nav-links">
            <Link to="/">Campeões</Link>
            <Link to="/form-champion">+ Campeão</Link>
            <Link to="/form-ability">+ Habilidade</Link>
            <Link to="/form-gameplay">+ Gameplay</Link>
            <Link to="/favorites">⭐ Favoritos</Link>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/champion/:id" element={<ChampionDetail />} />
            <Route path="/form-champion" element={<FormChampion />} />
            <Route path="/form-champion/:id" element={<FormChampion />} />
            <Route path="/form-ability" element={<FormAbility />} />
            <Route path="/form-ability/:id" element={<FormAbility />} />
            <Route path="/form-gameplay" element={<FormGameplay />} />
            <Route path="/form-gameplay/:id" element={<FormGameplay />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        </div>
        </BrowserRouter>
    );
}

export default App;
