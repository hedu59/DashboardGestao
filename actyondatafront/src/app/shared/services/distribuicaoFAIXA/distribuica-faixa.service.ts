import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DistribuicaFaixaService {

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

  public getFaixaCPF() {

    // console.log(this.filtro, 'TESTE');

    return this.http.get<[]>(
      this.host + 'DistribuicaoFaixa/faixa/CPF/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getFaixaValor() {
    return this.http.get<[]>(this.host + 'DistribuicaoFaixa/faixa/Valor/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getFaixaTicket() {
    return this.http.get<[]>(this.host + 'DistribuicaoFaixa/faixa/Ticket/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }


  public getConversao() {
    return this.http.get<[]>(this.host + 'DistribuicaoFaixa/faixa/Conversao/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getFaixaCPC() {
    return this.http.get<[]>(this.host + 'DistribuicaoFaixa/faixa/CPC/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getFaixaCPCA() {
    return this.http.get<[]>(this.host + 'DistribuicaoFaixa/faixa/CPCA/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getDetalhe(faixaNome:string) {
    return this.http.get<[]>(this.host + 'DistribuicaoFaixa/faixa/Detalhe/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal + '&faixaNome='
      + faixaNome
      + { headers: this.headers });
  }

}
