import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group';

import {withRouter} from 'react-router-dom'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

import UsuarioService from '../app/service/usuarioService';

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    cadastrar = () => {

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            senhaRepeticao: this.state.senhaRepeticao
        }

        try{
            this.service.validar(usuario)
        }catch(erro){
            const msgs = erro.mensagens
            msgs.forEach(msg => mensagemErro(msg))
            return false
        }

        this.service.salvar(usuario)
        .then(response =>{
            mensagemSucesso('Usuário cadastrado com sucesso, faça o login para acessar o sistema!')
            this.props.history.push('/login')
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
        <Card title="Cadastro de Usuário"> 
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text" 
                            id="inputNome" 
                            name="nome"
                            onChange={e => this.setState({nome: e.target.value})}
                            className="form-control mb-4"/>
                        </FormGroup>
                        <FormGroup label="E-mail: *" htmlFor="inputEmail">
                            <input type="email" 
                            id="inputEmail" 
                            name="email"
                            onChange={e => this.setState({email: e.target.value})}
                            className="form-control mb-4"/>
                        </FormGroup>
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input type="password" 
                            id="inputSenha" 
                            name="senha"
                            onChange={e => this.setState({senha: e.target.value})}
                            className="form-control mb-4"/>
                        </FormGroup>
                        <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                            <input type="password" 
                            id="inputRepitaSenha" 
                            name="senha"
                            onChange={e => this.setState({senhaRepeticao: e.target.value})}
                            className="form-control mb-4"/>
                        </FormGroup>
                        <button type="button" className="btn btn-success" onClick={this.cadastrar}> <i className="pi pi-save"></i> Salvar</button>
                        <button type="button" className="btn btn-danger" onClick={this.cancelar}> <i className="pi pi-times"></i> Cancelar</button>
                    </div>
                </div>
            </div>
        </Card>
            
        )
    }
}



export default withRouter (CadastroUsuario);
