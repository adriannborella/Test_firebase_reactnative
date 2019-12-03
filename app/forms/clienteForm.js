import React from 'react'
import t from "tcomb-form-native"

export const ClienteStruct = t.struct({  
    full_name: t.String,
    date_of_birth: t.String   
});

export const ClienteOptions = {    
    fields: {     
        full_name:{
            placeholder:"Ingrese el nombre",
            error:'Debe escribir un nombre'
        },
        date_of_birth: {
            placeholder:"Ingrese el telefono",
            error:'Debe escribir un telefono'
        }
    }
}