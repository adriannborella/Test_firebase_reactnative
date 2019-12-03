import React from 'react'
import { StyleSheet,Alert, View, Text, Button, Modal, FlatList, ScrollView, TouchableHighlight } from 'react-native'

import { ClienteOptions, ClienteStruct } from '../forms/clienteForm'
import t from 'tcomb-form-native'
const Form = t.form.Form

import { saveCliente, deleteCliente, getClientes } from '../data/UserData'

export default class FormularioCliente extends React.Component {
    constructor(){
        super()

        this.state= {
            dataForm : {
                nombre:'juan',
                telefono:'1'
            },
            key:'',
            modo:'',
            datos: [],
            cargando:true,
            showModal : false
        }
    }

    componentDidMount(){
        this.consultar_datos()
    }

    async consultar_datos(){
        datos = await getClientes()
        await this.setState({ datos, cargando:false })
    }

    async guardar() {
        var validate = this.refs.formCliente.getValue();
        if(validate != null) {   
            saveCliente(this.state.dataForm, this.state.modo, this.state.key)
            await this.setState({ showModal: false, dataForm:{ nombre:'', telefono:'' } })
            this.consultar_datos()
        }
    }

    update_form(dataForm) {
        this.setState({dataForm})
    }

    editar_elemento(item){
        this.setState({key:item.key, modo:'m', dataForm: item, showModal: true})
    }

    eliminar_item(){
        Alert.alert("Desea eliminar el Registro", "Eliminando Registro", [
            {
                text:"SI",
                onPress: () => {
                    deleteCliente(this.state.key)
                    this.consultar_datos(),
                    this.setState({showModal: false})
                }
            }
        ],
        {cancelable: false},)
    }

    render_modal() {
        
        return(
            <View>
                <Form 
                    ref='formCliente'
                    type={ClienteStruct}
                    options={ClienteOptions}
                    value={this.state.dataForm} 
                    onChange={(value) => this.update_form(value)}       
                />

                <Button title="Guardar" onPress={this.guardar.bind(this)}/>
                <Button title="Eliminar" style={{marginTop: 20 }} onPress={() => this.eliminar_item()}/>
                
            </View>
        )
    }

    render_item(item) {
        return (
            <TouchableHighlight key={item.key} onPress={() => this.editar_elemento(item)}>
                <View style={{margin:10, borderWidth:0, padding: 20, borderRadius: 8}} elevation={6}>                        
                        <Text>Nombre {item.full_name}</Text>
                        <Text>Cumpleaños {item.date_of_birth}</Text>                        
                </View>
            </TouchableHighlight>
        )
    }

    render(){
        if(this.state.cargando){
            return( <View><Text>Cargando</Text></View>)
        }
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => {
                        this.setState({showModal:false});
                    }}>                    
                    {this.render_modal()}
                </Modal>
                <View style={{ margin:20 }}>
                    <Button title='Agregar' onPress={() => this.setState({showModal: true, modo: 'a', dataForm: { full_name : '', date_of_birth: '' }})}></Button>                    
                    
                    
                    <ScrollView>
                        {this.state.datos.map(item => this.render_item(item))}
                    </ScrollView>
                </View>
            </View>
        )
    }
}