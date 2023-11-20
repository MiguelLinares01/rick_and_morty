import {regexEmail} from './constants.js';
import {regexPassword} from './constants.js';

export default function validation(input){
    const errors = {};

    if(!input.email.length) errors.email = 'Ingrese su email';
    else {
        if(!regexEmail.test(input.email)) errors.email = 'Debe de ingresar un email válido';
        if(input.email.length >35 ) errors.email = 'Input no menor a 35 caracteres';
    }

    if(!input.password.length) errors.password = 'Ingrese su password';
    else{
        if(!regexPassword.test(input.password)) errors.password = 'Debe de tener al menos un número';
        if(input.password.length < 6) errors.password = 'Debe de tener al menos 6 caracteres';
        if(input.password.length > 10) errors.password = 'Ha alcanzado el máximo de 10 caracteres';
    }

    return errors;
}