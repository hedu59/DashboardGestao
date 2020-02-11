import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TipoTituloModel } from '../../models/titulos/tipo-titulo-mode';
import { getDate } from 'date-fns';
import { RetornoTituloModal } from '../../models/retorno/retorno-titulo-modal';
import { TitulosClienteModel } from '../../models/pesquisa-cliente/titulos-cliente-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TituloService {
  private token = localStorage.getItem("token").replace(/["|']/g, "");

  private headers = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Accept", "application/json")
    .append("Authorization", "bearer " + this.token);

    private host: string;

    constructor(private http: HttpClient) {
      this.host = environment.host;
    }

    public getTipoTitulo() 
    {
      return this.http.get<TipoTituloModel>(this.host+'Titulo/v1/tipoTitulo', {headers: this.headers});
    }

    public inserirTitulo(dados) 
    {
      let devedor_id = localStorage.getItem("devedor_id");
      let cont_id = localStorage.getItem("cont_id");

      let form = {
        TITULO_ID: dados.titulo_id,
        TIPO_TITULO_ID: dados.tipo_titulo,
        DEVEDOR_ID: devedor_id,
        NUMERO_CONTRATO: dados.numero_contrato,
        NUMERO_DOCUMENTO: this.convertValorVazio(dados.numero_documento),
        NUMERO_PRESTACAO: this.convertParcelaPlano(dados.parcela),
        QTDE_PRESTACAO: this.convertParcelaPlano(dados.plano),
        VALOR: dados.valor,
        DATA_VENCIMENTO: this.convetDate(dados.vencimento),
        OBSE: this.convertValorVazio(dados.observacao),
        USUARIO_INCLUSAO: localStorage.getItem('usuario_logado'),
        USUARIO_ALTERACAO: localStorage.getItem('usuario_logado'),
        DATA_INCLUSAO: getDate,
        NOME_ALUNO: dados.terceiro,
        VALOR_ADICIONAL1: this.convertValorVazio(dados.valor_adicional_1),
        VALOR_ADICIONAL2: this.convertValorVazio(dados.valor_adicional_2),
        CONT_ID: cont_id
      }

      if (dados.titulo_id) {
        return this.http.put<RetornoTituloModal>(this.host+'Titulo/v1/titulo/'+dados.titulo_id, form, {headers: this.headers});
      } else {
        return this.http.post<RetornoTituloModal>(this.host+'Titulo/v1/titulo', form, {headers: this.headers});
      }
    }

    public listagemTitulos() 
    {
      let devedor_id = localStorage.getItem("devedor_id");
      let cont_id = localStorage.getItem("cont_id");
      return this.http.get<TitulosClienteModel>(this.host+'Titulo/v1/titulo/?DevedorId='+devedor_id+'&ContId='+cont_id,  {headers: this.headers});
    }

    private convetDate(data) 
    {
      if (data == '' || data == undefined) {
        return '';
      } else {
        let dia = data.split("/")[0];
        let mes = data.split("/")[1];
        let ano = data.split("/")[2];
        return ano + '-' + mes + '-' + dia;
      }
    }

    private convertValorVazio(valor) 
    {
      if (valor == '' || valor == null || valor == undefined) {
        return "";
      } else {
        return valor;
      }
    }

    public excluirEmail(titulo_id) 
    {
      return this.http.delete(this.host+'Titulo/v1/titulo/'+titulo_id, {headers: this.headers});
    }

    private convertParcelaPlano(valor) 
    {
      if (valor == '' || valor == undefined || valor == null) {
        return 1;
      } else {
        return valor;
      }
    }

    // converValor(valor) {  
    //   let novoValor = valor.replace('.', '');
    //   let valor2 = novoValor.replace(',', '.');
    //   console.log(valor2);
    //   return valor2;
    // }

}
