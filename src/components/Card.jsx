import {Link} from 'react-router-dom';
export default function Card(props){
   return (
      <div>
         
         <button onClick={() => props.onClose(props.id)}>X</button>
         <h2>id:{props.id}</h2>
         <h2>name:{props.name}</h2>
         <h2>status: {props.status}</h2>
         <h2>species: {props.species}</h2>
         <h2>Género: {props.gender}</h2>
         <h2>origin: {props.origin}</h2>
         <Link to={`/detail/${props.id}`}>
            <img src={props.image} alt='' /> 
         </Link>
      </div>
   );
}
