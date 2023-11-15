import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx';
import { useState } from 'react';
import axios from "axios"

const URL = "https://rym2.up.railway.app/api/character/";
const API_KEY = "henrystaff"

function App() {

   const [characters, setCharacters] = useState([]);
   function onSearch(id) {
      const characterId = characters.filter(
         char => char.id === Number(id)
      )
      if(characterId.length){
         return alert(`El personaje ${characterId[0].name} ya existe!`);
      }
      axios(`${URL}${id}?key=${API_KEY}`).then(
         ({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         }
      );
   }
   
   const onClose = id => {
      setCharacters(characters.filter(char => char.id !== Number(id)))
   }

   const example = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {
         name: 'Earth (C-137)',
         url: 'https://rickandmortyapi.com/api/location/1',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
   };
   

   

   return (
      <div className='App'>
         <Nav onSearch={onSearch} />
         <Cards characters={characters} onClose={onClose} />
      </div>
   );
}

export default App;
