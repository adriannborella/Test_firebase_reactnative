import * as firebase from 'firebase';

const tabla = 'clientes'

export function saveCliente(registro, mode, key) {    
    if(mode == 'm'){
        firebase.database().ref(tabla + '/' + key).set(registro)
    }

    if(mode == 'a'){
        firebase.database().ref(tabla).push(registro)
    }
}

export function deleteCliente(key) {
    elimina = firebase.database().ref(tabla + '/' + key)
    elimina.remove()
}

export function updateCliente(registro) {
    firebase.database().ref(tabla + '/' + registro.key).set(registro)
}

export async function getClientes() {
    datos = await firebase.database().ref(tabla).once('value')
    result = to_array(datos)
    return result
}

function to_array(datos) {
    result =[]

    datos.forEach(element => {
        aux = element.val()
        aux['key'] = element.key
        result.push(aux)
    });

    return result
}