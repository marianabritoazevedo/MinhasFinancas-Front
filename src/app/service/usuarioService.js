import ApiService from "../apiService";
import ErroValidacao from "./exception/erroValidacao";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        return this.post('/', usuario)
    }

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('O campo nome é obrigatório')
        }
        if(!usuario.email){
            erros.push('O campo e-mail é obrigatório')
        //Expressão regular: verificar se uma string está dentro de um padrão
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um e-mail válido')
        }
        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha duas vezes')
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas não são iguais')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }

}

export default UsuarioService