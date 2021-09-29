import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group';

class Login extends React.Component{

    state = {
        email: '',
        senha: ''
    }
    
    entrar = () => {
        console.log("Email: ", this.state.email)
        console.log("Senha: ", this.state.senha)
    }

    render(){
        return(
        <div className="container">
            <div className="row">
                <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                    <div className="bs-doc-section">
                        <Card title="Login">
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
                                            <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                            <button className="btn btn-danger">Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
        )
        
    }
}

export default Login;