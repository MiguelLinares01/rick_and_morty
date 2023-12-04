import './App.css';
import Cards from './components/cards/Cards.jsx';
import Nav from './components/nav/Nav.jsx';
import { useEffect, useState } from 'react';
import axios from "axios"
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import About from './components/about/About.jsx';
import Detail from './components/detail/Detail.jsx';
import Nonresults from './components/nonresults/Nonresults.jsx';
import Form from './components/form/Form.jsx';
import Favorites from './components/favorites/Favorites.jsx';
import { useDispatch } from 'react-redux';
import { removeFav } from './redux/actions.js';

const URL = "https://rym2.up.railway.app/api/character/";
const API_KEY = "henrystaff"

function App() {

   const [characters, setCharacters] = useState([]);

   const navigate = useNavigate()
   const location = useLocation()

   function onSearch(id) {
      const characterId = characters.filter(
         char => char.id === Number(id)
      )
      if(characterId.length){
         return alert(`El personaje ${characterId[0].name} ya existe!`);
      }
      //axios(`${URL}${id}?key=${API_KEY}`)
      axios(`http://localhost:3001/rickandmorty/character/${id}`)
         .then(
         ({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         }
      );
      navigate("/home");
   }
   
   const dispatch = useDispatch();

   const onClose = (id) => {
      setCharacters(characters.filter(char => char.id !== Number(id)));    
      dispatch(removeFav(id));
   }

   const [access, setAccess] = useState(false);
   const EMAIL = 'example@hotmail.com';
   const PASSWORD = 'lapa12';

   /*function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      }
      else{
         alert('Credenciales incorrectas');
      }
   }*/

   function login(userData) {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
         const { access } = data;
         if(access) {
            setAccess(data);
            access && navigate('/home');
         }
         else{
            alert("Credenciales incorrectas")
         }
      });
   }

   function logout(){
      setAccess(false);
   }

   useEffect(() => {
      //!Logueo automático !access && navigate('/home');
      !access && navigate('/');
   }, [access]);

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
         {
            location.pathname !== "/" && <Nav onSearch={onSearch} logout={logout} />
         }
         <Routes>
            <Route
               path='/'
               element={<Form login={login}/>}
            />
            <Route
               path='/home'
               element={<Cards characters={characters} onClose={onClose} />}
            />
            <Route
               path='/about'
               element={<About />}
            />
            <Route
               path='/detail/:id'
               element={<Detail />}
            />
            <Route
               path='/favorites'
               element={<Favorites onClose={onClose} />}
            />
            <Route path='*' element={<Nonresults/>} ></Route>
         </Routes>
         
      </div>
   );
}

export default App;
