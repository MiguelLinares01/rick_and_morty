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
   const dispatch = useDispatch();

   async function onSearch(id) {

      try {
         const characterId = characters.filter(
            char => char.id === Number(id)
         )
         if(characterId.length){
            return alert(`El personaje ${characterId[0].name} ya existe!`);
         }
         
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
         if (data.name) {
            setCharacters([...characters, data]);
            navigate("/home");
         } else {
            alert('¡El ID deve de ser un número entre 1 y 826!');
         }
      } catch (error) {
         alert('¡El ID deve de ser un número entre 1 y 826!');
      }
      
   }
   
   

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

   async function login(userData) {
      try {
         const { email, password } = userData;   
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const { data } = await axios (URL + `?email=${email}&password=${password}`);

         if(data.access){
            setAccess(data.access);
            navigate('/home');
         }
         else{
            alert("Credenciales incorrectas");
         }

      } catch (error) {
         alert(error.message)
      }
   }

   function logout(){
      setAccess(false);
   }

   useEffect(() => {
      //!Logueo automático !access && navigate('/home');
      !access && navigate('/');
   }, [access]);

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
