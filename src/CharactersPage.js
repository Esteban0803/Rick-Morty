import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import './App.css';

function CharactersPage(props) {
  const [info, setInfo] = useState();
  const [page, setPage] = useState(props.page || 1);
  const [input, setInput] = useState(page);
  

  useEffect(() => {
    async function getPageInfo() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      if (!response.ok) {
        console.error('Response not ok', response);
        return;
      }

      const responseJson = await response.json();
      setInfo(responseJson);
    }

    getPageInfo();
  }, [page]);

  if (!info) {
    return <>Loading...</>;
  }
  
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < info.info.pages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      {info && (
        <h2>
          Página {page} de {info.info.pages}
        </h2>
      )}

      <div>
        <button onClick={handlePrevious}>
          Anterior
        </button>

        <input
          className='input'
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              let newPage = input;
              if (newPage < 1) newPage = 1;
              if (newPage > info.info.pages) newPage = info.info.pages;
              setPage(newPage);
            }
          }}
        />

        <button onClick={handleNext}>
          Siguiente
        </button>
      </div>

      <div className="grid">
        {info.results.map((character) => (
          <CharacterCard key={character.id} id={character.id} />
        ))}
      </div>
    </div>
  );
}

export default CharactersPage;