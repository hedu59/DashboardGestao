import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProdutividadeService {

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


  public getProducao() {

    return this.http.get<[]>(
      this.host + '/Producao/v1/Producao/?dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal
      , { headers: this.headers });
  }

  public getValorRecebido(){
    return this.http.get<string>(
      this.host + '/Producao/v1/TotalRecebido/?dataInicial='
      + this.filtro.dataInicial + '&datafinal='
      + this.filtro.dataFinal
      , {headers: this.headers});
  }



}
