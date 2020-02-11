import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { BaixaOriginalModel } from 'src/app/shared/models/ficha/dados-ficha/baixa.model';

@Injectable({
  providedIn: 'root'
})

export class BaixaService {
  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Accept', 'application/json')
    .append('Authorization', 'bearer ' + this.token);

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  public getBaixasOriginais(devedor_id) {
    return this.http.get<BaixaOriginalModel>(this.host+'TituloPago/v1/tituloBaixado?id='+devedor_id+'&tipo=', {headers: this.headers});
  }

  public getBaixasAcordo(devedor_id) {
    return this.http.get<BaixaOriginalModel>(this.host+'TituloPago/v1/tituloBaixado?id='+devedor_id+'&tipo=0', {headers: this.headers});
  }

}
