import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { carteiraModel } from '../../models/carteira/carteira-detalhe-model';

@Injectable({
  providedIn: 'root'
})
export class CarteiraAtivaService {

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

  public getCarteiraAtiva() {

    return this.http.get<[]>(
      this.host + 'Carteira/v1/CarteiraAtiva/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getCarteiraUnique() {
    return this.http.get<[]>(this.host + 'Carteira/v1/CarteiraUnique/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getEsforcoAtivo() {
    return this.http.get<[]>(this.host + 'Carteira/v1/EsforcoAtiva/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getEsforcoUnique() {
    return this.http.get<[]>(this.host + 'Carteira/v1/EsforcoUnique/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

  public getDetalhesCarteira() {
    return this.http.get<carteiraModel>(this.host + 'Carteira/v1/DetalheCarteira/?contratante='
      + this.filtro.contratanteId + '&dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal, { headers: this.headers });
  }

}
