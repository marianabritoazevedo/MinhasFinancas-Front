import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import {withRouter} from 'react-router-dom'

//import axios from 'axios'

import UsuarioService from '../app/service/usuarioService'
//import LocalStorageService from '../app/service/localStorageService'
import {mensagemErro} from '../components/toastr'
import { AuthContext } from '../main/provedorDeAutenticacao'

class Login extends React.Component{

    state = {
        email: '',
        senha: '',
        //mensagemErro: null
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }
    
    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            //console.log(response)
            //LocalStorageService.addItem('_usuario_logado', response.data)
            //localStorage.setItem('_usuario_logado', JSON.stringify(response.data))
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch(erro => {
            //console.log(erro.response)
            //this.setState({mensagemErro: erro.response.data})
            mensagemErro(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        //Permitir navegação com botões
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return(
        <div className="row">
            <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                <div className="bs-doc-section">
                    <Card title="Login">
                        <div className="row">
                            <span>{this.state.mensagemErro}</span>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="ExampleInputEmail1">
                                            <input type="email" 
                                            value={this.state.email}
                                            className="form-control mb-4" 
                                            id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Digite o e-mail"
                                            onChange={e => this.setState({email: e.target.value})}
                                            />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="ExampleInputPassword1">
                                            <input type="password"
                                            value={this.state.senha} 
                                            className="form-control mb-4" 
                                            id="exampleInputPassword1" 
                                            placeholder="Digite a senha"
                                            onChange={e => this.setState({senha: e.target.value})}
                                            />
                                        </FormGroup>
                                        <button onClick={this.entrar} className="btn btn-success"> <i className="pi pi-sign-in"></i> Entrar</button>
                                        <button onClick={this.prepareCadastrar} className="btn btn-danger"> <i className="pi pi-plus"></i> Cadastrar</button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
        )
        
    }
}

Login.contextType = AuthContext

export default withRouter (Login);