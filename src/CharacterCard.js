import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function CharacterCard(props) {
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCharacterInfo() {
      if (!props.id) return;

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${props.id}`
      );

      if (!response.ok) {
        console.error('Response not ok', response);
        return;
      }

      const responseJson = await response.json();
      setInfo(responseJson);
    }

    getCharacterInfo();
  }, [props.id]);

  if (!props.id) {
    return <>Missing id</>;
  }

  if (!info) {
    return <>Loading...</>;
  }

  return (
    <div
      className="card"
      onClick={() => navigate(`/character/${info.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img src={info.image} alt={info.name} />
      <h3>{info.name}</h3>
    </div>
  );
}

export default CharacterCard;