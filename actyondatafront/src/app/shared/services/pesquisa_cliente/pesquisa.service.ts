import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContratanteModel } from '../../models/contratante-model';
import { CommandResult } from '../../models/pesquisa-cliente/clienteCommandResultModel';
import { TitulosClienteModel } from '../../models/pesquisa-cliente/titulos-cliente-model';
import { FoneModel } from '../../models/cliente/fone-model';
import { EmailModel } from '../../models/cliente/Email-Model';
import { RetornoAcionamento } from '../../models/retorno/pesquisa/retorno-acionamento-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Accept', 'application/json')
  .append('Authorization', 'bearer ' + this.token);

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  public getContratante() {
    return this.http.get<ContratanteModel>(this.host+'Contratante/v1/contratantes', {headers: this.headers});
  }
  
  public pesquisaCliente(valores) {

    if(valores.dividaAtiva == '') {
      valores.dividaAtiva = false;
    }
  
    return this.http.get<CommandResult>(this.host+'Devedor/v1/devedores/?ContId='+valores.contratante+'&Tipo='+valores.tipoPesquisa+'&Valor='+valores.dadosPesquisa+'&Ativo='+valores.dividaAtiva ,  {headers: this.headers});
  }

  public listagemTitulos(DevedorId: number, ContId: number) {
    return this.http.get<TitulosClienteModel>(this.host+'Titulo/v1/titulo/?DevedorId='+DevedorId+'&ContId='+ContId,  {headers: this.headers});
  }

  public listagemFones(DevedorId) {
    return this.http.get<FoneModel>(this.host+'Fone/v1/fone/'+DevedorId, {headers: this.headers});
  }

  public listagemEmail(DevedorId) {
    return this.http.get<EmailModel>(this.host+'Email/v1/email/'+DevedorId, {headers: this.headers});
  }

  public dadosPessooais(DevedorId, ContId) {
    return this.http.get<CommandResult>(this.host+'Devedor/v1/devedores/?ContId='+ContId+'&Tipo=2&Valor='+DevedorId+'&Ativo=false' ,  {headers: this.headers});
  }

  public acionamentos(DevedorId: Number) {
    return this.http.get<RetornoAcionamento>(this.host+'DevedorAcionamento/v1/acionamento?id='+DevedorId+'&top=10', {headers: this.headers});
  }  

}