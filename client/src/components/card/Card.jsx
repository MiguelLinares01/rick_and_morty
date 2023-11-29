import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { addFav, removeFav } from '../../redux/actions';
import { useEffect, useState } from 'react';

export default function Card(props){

   const dispatch = useDispatch()
   const [isFav, setIsFav] = useState(false)
   const handleFavorite = () => {
      if(isFav){
         setIsFav(false)
         dispatch(removeFav(props.id))
      }
      else{
         setIsFav(true)
         dispatch(addFav(props))
      }
   }

   const myFavorites = useSelector(state =>state.myFavorites)
   useEffect(()=>{
      myFavorites.forEach((fav) => {
         if(fav.id === props.id ) setIsFav(true)
      });
   }, [myFavorites])

   return (
      <div style={{
         background:"grey",
         color:'darkblue',
         margin:"20px",
         padding:"20px",
         borderRadius:"15px"
      }}>

      {
         isFav ? (
            <button onClick={handleFavorite}>❤️</button>
         ) : (
            <button onClick={handleFavorite}>🤍</button>
         )
      }
         
         <button onClick={() => props.onClose(props.id)}>X</button>
         <h3>id:{props.id}</h3>
         <h2>name:{props.name}</h2>
         <h4>status: {props.status}</h4>
         <h4>species: {props.species}</h4>
         <h4>Género: {props.gender}</h4>
         <h4>origin: {props.origin}</h4>
         <Link to={`/detail/${props.id}`}>
            <img src={props.image} alt='' /> 
         </Link>
      </div>
   );
}
