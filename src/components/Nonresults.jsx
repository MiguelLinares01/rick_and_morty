const error404 = 'https://www.acceseo.com/wp-content/uploads/2020/11/guia-errores-404.png';

export default function Nonresults(){
   return(
      <div>
        <img src={error404} alt="Not found" />
      </div>
   );
}