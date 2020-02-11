import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clienteModel } from '../models/cliente-model';
import { cepModel } from '../models/cep-modal';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  url = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  consultarCep(cep) {
    cep = cep.replace(/[\(\)\.\s-]+/g,'');
    
    return this.http.get(this.url+cep+'/json').toPromise().then(reponse => {
      return this.preencherCep(reponse)
    });
  }

  preencherCep(cepReposta): cepModel {
    let cep =  new cepModel();
    // cep.cep = cepReposta.cep;
    cep.endereco = cepReposta.logradouro;
    cep.complemento = cepReposta.complemento;
    cep.bairro = cepReposta.bairro;
    cep.cidade = cepReposta.localidade;
    cep.uf = cepReposta.uf;
    cep.complemento = cep.complemento.substring(0, 19);
    return cep;
  }

}
