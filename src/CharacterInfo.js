import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

function CharacterInfo() {
  const { id } = useParams();
  const [character, setCharacter] = useState();

  useEffect(() => {
    async function fetchCharacter() {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
      setCharacter(data);
    }

    fetchCharacter();
  }, [id]);

  if (!character) return <div className="loading">Cargando personaje...</div>;

  return (
    <div className="character-info">
      <div className="character-card-large">
        <img src={character.image} alt={character.name} className="character-image-large" />
        <div className="character-details">
          <h2>{character.name}</h2>
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Género:</strong> {character.gender}</p>
          <p><strong>Estado:</strong> {character.status}</p>
          <p><strong>Origen:</strong> {character.origin?.name}</p>
          <p><strong>Ubicación actual:</strong> {character.location?.name}</p>
          <p><strong>Episodios en los que aparece:</strong> {character.episode.length}</p>
        </div>
      </div>

      <Link to="/" className="back-button">
        ← Volver a la lista
      </Link>
    </div>
  );
}

export default CharacterInfo;
