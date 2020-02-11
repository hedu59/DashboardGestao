import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ContratanteModel } from '../../models/contratante/contrantates';

@Injectable({
  providedIn: 'root'
})
export class ContratanteService {

  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Accept', 'application/json')
    .append('Authorization', 'bearer ' + this.token);

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  public getContrantes() {
    return this.http.get<ContratanteModel[]>(this.host+'Contratante/contratantes',{headers: this.headers});
  }
}
