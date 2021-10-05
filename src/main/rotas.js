import React from "react";

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import Login from '../views/login'
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import consultaLancamentos from "../views/Lancamentos/consultaLancamentos";
import cadastroLancamentos from "../views/Lancamentos/cadastro-lancamentos";
//import AuthService from "../app/service/authService";
import {AuthConsumer} from '../main/provedorDeAutenticacao'

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }){
    return (
        <Route {...props} render={(componenteProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componenteProps} /> 
                )
            }else{
                return(
                    <Redirect to={{pathname: '/login', state: {from: componenteProps.location} }} />
                )
            }
        }} />
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}></RotaAutenticada>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={consultaLancamentos}></RotaAutenticada>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={cadastroLancamentos}></RotaAutenticada>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
);