import React, {useState} from "react";
import banner from '../assets/rick_and_morty_banner.png'
import validation from "../validation";

export default function Form(props){

    const [userData, setUserData] = useState({email:'', password:''});

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target
        setUserData({
            ...userData, [name]:value
        })
        setErrors(validation({
            ...userData, [name]:value
        }))
    }

    const handleSubmit = event =>{
        event.preventDefault();
        props.login(userData);
    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <img
                src={banner}
                alt="lepepe"
                style={{width:"425px", height:"500px"}}
            />
            <br />

            <label>Email: </label>
            <input
                type="text"
                name="email"
                value={userData.email}
                placeholder="Ingrese su email"
                key='email'
                onChange={handleChange}
            />
            <p style={{color:'coral'}}>{errors.email ? errors.email : null}</p>
            <br />
            <label>Password: </label>
            <input
                type="password"
                name="password"
                value={userData.password}
                placeholder="Ingrese su password"
                key='password'
                onChange={handleChange}
            />
            <p style={{color:'coral'}}>{errors.password ? errors.password : null}</p>
            <br /><hr /><br />
            <button disabled={errors.email || errors.password} type="submit">Enviar</button>
        </form>
        </div>
    );
}