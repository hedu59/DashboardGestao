import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { clienteModel } from '../../models/cliente-model';
import { RetornoClienteModel } from '../../models/retorno/retorno-cliente-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Accept', 'application/json')
    .append('Authorization', 'bearer ' + this.token)

  constructor(private http: HttpClient) { 
    this.host = environment.host;
  }

  public cadastrarCliente(dados: clienteModel) {
    let form = {
      NOME: dados.NOME,
      ENDERECO: dados.ENDERECO,
      NUMERO: dados.NUMERO,
      COMPLEMENTO: dados.COMPLEMENTO,
      BAIRRO: dados.BAIRRO,
      CIDADE: dados.CIDADE,
      UF: dados.UF,
      SEXO: dados.SEXO,
      ESTADO_CIVIL: this.getEstadoCivil(dados.NOME_CONJUGUE),
      NOME_PAI: dados.NOME_MAE,
      NOME_MAE: dados.NOME_PAI,
      NOME_CONJUGUE: dados.NOME_CONJUGUE,
      CPF: dados.CPF,
      IDENTIFICADOR_ID: dados.IDENTIFICADOR_ID,
      CEP: dados.CEP,
      CONT_ID: dados.CONT_ID,
      RG: dados.RG,
      RG_COMPLEMENTO: "SSP",
      DATA_NASCIMENTO: this.convetDate(dados.DATA_NASCIMENTO),
      USUARIO_INCLUSAO: localStorage.getItem('usuario_logado')
    }
    return this.http.post<RetornoClienteModel>(this.host + 'Devedor/v1/devedor', form, { headers: this.headers });
  }

  public editarCliente(clienteId, dados) {

    let form = {
      DEVEDOR_ID: clienteId,
      NOME: dados.NOME,
      ENDERECO: dados.ENDERECO,
      NUMERO: dados.NUMERO,
      COMPLEMENTO: this.convertValorVazio(dados.COMPLEMENTO),
      BAIRRO: dados.BAIRRO,
      CIDADE: dados.CIDADE,
      UF: dados.UF,
      SEXO: dados.SEXO,
      ESTADO_CIVIL: this.getEstadoCivil(dados.NOME_CONJUGUE),
      NOME_PAI: dados.NOME_MAE,
      NOME_MAE: dados.NOME_PAI,
      NOME_CONJUGUE: this.getEstadoCivil(dados.NOME_CONJUGUE),
      CPF: dados.CPF,
      IDENTIFICADOR_ID: dados.IDENTIFICADOR_ID,
      CEP: dados.CEP,
      CONT_ID: dados.CONT_ID,
      RG: dados.RG,
      RG_COMPLEMENTO: "SSP",
      DATA_NASCIMENTO: this.convetDate(dados.DATA_NASCIMENTO),
      USUARIO_ALTERACAO: localStorage.getItem('usuario_logado')
    }
    return this.http.put<RetornoClienteModel>(this.host + '/Devedor/v1/devedor/' + clienteId, JSON.stringify(form), { headers: this.headers });
  }

  public verificaCpf(cpf: number, cont_id: number) {
    return this.http.get(this.host+'Devedor/v1/existeDevedor?cpf='+cpf+'&contId='+cont_id, {headers: this.headers});
  }

  private convetDate(data) {
    if (data == '' || data == undefined) {
      return '';
    } else {
      let dia = data.split("/")[0];
      let mes = data.split("/")[1];
      let ano = data.split("/")[2];
      return ano + '-' + mes + '-' + dia;
    }
  }

  private getEstadoCivil(conjuge) {
    return conjuge === '' || conjuge === undefined  ? 'S' : 'C';
  }

  private convertValorVazio(valor) 
  {
    if (valor == '' || valor == null || valor == undefined) {
      return "";
    } else {
      return valor;
    }
  }


}
