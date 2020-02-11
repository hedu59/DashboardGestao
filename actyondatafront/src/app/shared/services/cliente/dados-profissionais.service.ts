import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DadosProissionaisModel } from '../../models/cliente/Dados-Profissionais-Model';
import { RetornoDadosProfissionais } from '../../models/retorno/retorno-dados-profissionais';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DadosProfissionaisService {
  private token = localStorage.getItem("token").replace(/["|']/g, "");
  private headers = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Accept", "application/json")
    .append("Authorization", "bearer " + this.token);
  private host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  public cadastrarDadosProfissionais(dados: DadosProissionaisModel) {
    let cliente_id = localStorage.getItem('devedor_id');
    let valor: number;

    if (dados.VALOR_RENDA == null || dados.VALOR_RENDA == undefined) {
      valor = 0;
    } else {
      valor = dados.VALOR_RENDA;
    }

    let form = {
      DEVEDOR_ID: cliente_id,
      EMPRESA: dados.EMPRESA,
      CARGO: dados.CARGO,
      VALOR_RENDA: valor,
      CEP_EMPRESA: dados.CEP_EMPRESA,
      ENDERECO_EMPRESA: dados.ENDERECO_EMPRESA,
      NUMERO_EMPRESA: dados.NUMERO_EMPRESA,
      COMPLEMENTO_ENDERECO_EMPRESA: dados.COMPLEMENTO_ENDERECO_EMPRESA,
      BAIRRO_EMPRESA: dados.BAIRRO_EMPRESA,
      CIDADE_EMPRESA: dados.CIDADE_EMPRESA,
      UF_EMPRESA: dados.UF_EMPRESA
    }

    return this.http.put<RetornoDadosProfissionais>(this.host+'Devedor/v1/devedorDadosProfissionais/' + cliente_id, form, { headers: this.headers });

  }

}
