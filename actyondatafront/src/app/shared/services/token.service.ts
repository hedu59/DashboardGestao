import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private host: string;
  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  getToken(Nome: String, Senha: String) {
    return this.http.post(this.host, { Nome, Senha }).subscribe(
      res => {
        return res.toString()
      },
      err => {
        return err.error.Message;
      });
  }

}
