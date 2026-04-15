import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AlumnoList from './components/Alumnos/AlumnoList';
import MateriaList from './components/Materias/MateriaList';
import NotaForm from './components/Notas/NotaForm';
import NotaList from './components/Notas/NotaList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <h1>Sistema de Notas</h1>
          <div className="nav-links">
            <Link to="/alumnos">Alumnos</Link>
            <Link to="/materias">Materias</Link>
            <Link to="/notas/registrar">Registrar Nota</Link>
            <Link to="/notas">Ver Notas</Link>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/alumnos" element={<AlumnoList />} />
            <Route path="/materias" element={<MateriaList />} />
            <Route path="/notas/registrar" element={<NotaForm />} />
            <Route path="/notas" element={<NotaList />} />
            <Route path="/" element={<AlumnoList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;