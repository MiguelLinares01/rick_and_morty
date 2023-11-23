import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const URL = "https://rym2.up.railway.app/api/character/";
const API_KEY = "henrystaff"

export default function Detail(props) {
    const {id} = useParams();
    console.log(id);
    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`${URL}${id}?key=${API_KEY}`).then(
           ({ data }) => {
              if (data.name) {
                 setCharacter(data);
              } else {
                 window.alert('No hay personajes con ese ID');
              }
           }
        );
        return setCharacter({});
     }, [id]);
    return(
       <div>
          <h1>Detail</h1>
          <h2>{character.name}</h2>
          <img src={character.image} />
          <h3>{character?.status}</h3>
          <h3>{character?.species}</h3>
          <h3>{character?.gender}</h3>
          <h3>{character?.origin?.name}</h3>
          <h3>{character?.location?.name}</h3>
       </div>
    );
 }
 