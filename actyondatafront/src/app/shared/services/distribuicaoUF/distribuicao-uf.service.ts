import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { TaxaConversaoModel } from '../../models/distribuicaoUF/retornoTaxaConvesao';

@Injectable({
  providedIn: 'root'
})
export class DistribuicaoUFService {

  public filtro = JSON.parse(localStorage.getItem('contratanteId'));

  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Accept', 'application/json')
    .append('Authorization', 'bearer ' + this.token);

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  public getUFxCPF() {

    // console.log(this.filtro, 'TESTE');

    return this.http.get<[]>(
      this.host + 'DistribuicaoUF/uf/CPF/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getValor() {
    return this.http.get<[]>(this.host + 'DistribuicaoUF/uf/Valor/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getTicket() {
    return this.http.get<[]>(this.host + 'DistribuicaoUF/uf/Ticket/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }


  public getConversao() {
    return this.http.get<[]>(this.host + 'DistribuicaoUF/uf/Conversao/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getValorRegiao() {
    return this.http.get<[]>(this.host + 'DistribuicaoUF/uf/ValorRegiao/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getTicketRegiao() {
    return this.http.get<[]>(this.host + 'DistribuicaoUF/uf/TicketRegiao/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

}
