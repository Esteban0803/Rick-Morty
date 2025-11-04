import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharactersPage from './CharactersPage';
import CharacterInfo from './CharacterInfo';

export function App() {
  return (
    <div className='App'>
      <h1>Bienvenido a la Pagina de Ricardo y Moricio</h1>
      <h2>Deleitese con todos y cada uno de los... ¡¿826 personajes?!</h2>
      <h3>¡¿En que momento dibujaron tanto?!</h3>
     
      <Routes>
        <Route path='/' element={<CharactersPage page={1} />} />
        <Route path='/character/:id' element={<CharacterInfo />} />
      </Routes>
    </div>
  );
}

export default App;