import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Perfil } from 'src/app/shared/models/seguranca/perfil/perfil-model';
import { RetornoPerfilModel } from 'src/app/shared/models/retorno/perfil/retorno-perfil-model';
import { TelaModel } from 'src/app/shared/models/seguranca/tela/tela-model';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Accept', 'application/json')
  .append('Authorization', 'bearer ' + this.token);

  constructor(
    private http: HttpClient
    ) {
    this.host = environment.host;
  }

  public getPerfis() {
    return this.http.get<Perfil[]>(this.host+'/Perfil/v1/ListaPerfis?ativo=false',
    {headers: this.headers});
  }

  public getTelas(number) {
    return this.http.get<Perfil[]>(this.host+'/Perfil/v1/ListaPerfis?ativo=false',
    {headers: this.headers});
  }
  
  public salvarPerfil(dados) {

    if(dados.STATUS ==='ATIVO')
    {
      dados.STATUS = true;
    }
    else
    {
      dados.STATUS= false;
    }

    let form ={
      idPerfil: dados.ID_PERFIL,
      Nome: dados.DESCRICAO,
      Status: dados.STATUS
    }

    let descricao = { DESCRICAO: dados.DESCRICAO} ;

    if(form.idPerfil == undefined || form.idPerfil == '')
    {
      return this.http.post<RetornoPerfilModel>(this.host+'Perfil/v1/CriarPerfil',descricao, {headers: this.headers});
    }
    else
    {
      return this.http.put<RetornoPerfilModel>(this.host+'Perfil/v1/AlterarPerfil',form, {headers: this.headers});     
    }
  }

    // SERVICE TELA
  public getTelasService() {
    return this.http.get<TelaModel[]>(this.host+'Perfil/v1/ListaTelaPerfis',{headers: this.headers});
  }

  public getTelasServiceComId(idPerfil: number) {
    return this.http.get<TelaModel[]>(this.host+'Perfil/v1/ListaTelaPerfis/?id='+idPerfil,{headers: this.headers});
  }

  public clonarPerfil(dados){

    let form ={
      ID_PERFIL: dados.ID_PERFIL_ORIGINAL,
      ID_PERFIL_CLONE: dados.ID_PERFIL_CLONE, 
    }

      return this.http.post<RetornoPerfilModel>(this.host+'Perfil/v1/ClonarPerfil',form, {headers: this.headers});       
  }

 }
