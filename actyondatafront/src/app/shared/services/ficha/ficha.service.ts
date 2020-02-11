import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FichaModel } from '../../models/ficha/ficha-model';
import { CommandResult } from '../../models/pesquisa-cliente/clienteCommandResultModel';
import { environment } from 'src/environments/environment.prod';
import { PesquisaFilaModel } from '../../models/retorno/ficha/fila/Fila-model';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private operador_id = localStorage.getItem('operador_id').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Accept', 'application/json')
  .append('Authorization', 'bearer ' + this.token);

  constructor(private http: HttpClient) { 
    this.host = environment.host;
  }

  public getCliente(devedor_id: number, cont_id: number) {
    return this.http.get<CommandResult>(this.host+'Devedor/v1/devedores/?ContId='+cont_id+'&Tipo=2&Valor='+devedor_id+'&Ativo=false', {headers: this.headers});
  }

  public getFilaAtiva() {
    return this.http.get<PesquisaFilaModel>(this.host+'Fila/v1/filaManual?OperadorId='+this.operador_id, {headers: this.headers});
  }
  
} 