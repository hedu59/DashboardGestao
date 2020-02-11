import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { DividaAtualizadaModel } from 'src/app/shared/models/retorno/ficha/divida-atualizada-model';

@Injectable({
  providedIn: 'root'
})
export class DividaService {
  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Accept', 'application/json')
    .append('Authorization', 'bearer ' + this.token);

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  public dividaAtualizada(data, dados) {
    return this.http.get<DividaAtualizadaModel>(
      this.host + 'Titulo/v1/titulosAtualizados?Id=' + dados[0].devedor_id + '&ContId=' + dados[0].cont_id + '&Data=' + data,
      { headers: this.headers }
    );
  }

}
