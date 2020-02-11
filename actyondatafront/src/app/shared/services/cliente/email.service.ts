import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RetornoEmailModel } from '../../models/retorno/retorno-email.model';
import { environment } from 'src/environments/environment.prod';
import { EmailModel } from '../../models/cliente/Email-Model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = "http://192.168.2.154:3232/api";
  private token = localStorage.getItem("token").replace(/["|']/g, "");
  private host: string;

  private headers = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Accept", "application/json")
    .append("Authorization", "bearer " + this.token);

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  public salvarEmail(dados, devedor_id) {
    let cliente_id = localStorage.getItem('devedor_id');

    let form = {
        EMAIL_ID: dados.EMAIL_ID,
        DEVEDOR_ID: devedor_id,
        EMAIL: dados.EMAIL,
        TIPO: dados.TIPO,
        SITUACAO: dados.SITUACAO,
        ORIGEM: "Cadastro",
        USUARIO_INCLUSAO: localStorage.getItem('usuario_logado'),
        USUARIO_ALTERACAO: localStorage.getItem('usuario_logado')
    }
    // OBS: No banco de dados não tem o usuario_alteracao, somente o inclusão
    if(dados.EMAIL_ID) {
      return this.http.put<RetornoEmailModel>(this.host+'Email/v1/email/'+dados.EMAIL_ID, form, {headers: this.headers});
    } else {
      return this.http.post<RetornoEmailModel>(this.host+'Email/v1/email/'+devedor_id, form, {headers: this.headers});
    }

  }

  public excluirEmail(devedor_id: string, email_id: number) {
    return this.http.delete(this.host+'/Email/v1/email/?id='+devedor_id+'&emailId='+email_id, {headers: this.headers});
  }

  public listarEmail(devedor_id) {
    return this.http.get<EmailModel>(this.host+'Email/v1/email/'+devedor_id, {headers: this.headers});
  }

}
