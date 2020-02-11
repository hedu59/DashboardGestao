import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { PermissaoModel } from 'src/app/shared/models/seguranca/permissao/permissao-model';




@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Accept', 'application/json')
  .append('Authorization', 'bearer ' + this.token);

  constructor(
    private http: HttpClient) {
    this.host = environment.host;
  }

  public getPermissao(IdPerfil: number) {
    return this.http.get<PermissaoModel[]>(this.host+'Permissao/v1/PermissoesPorTela?IdPerfil='+IdPerfil+'&IdTela=0',//alterar na API para nao receber tela
    {headers: this.headers});
  }

  public getPermissaoTela(IdPerfil: number, IdTela: number) {
    return this.http.get<PermissaoModel[]>(this.host+'Permissao/v1/PermissoesPorTela?IdPerfil='+IdPerfil+'&IdTela='+IdTela,
    {headers: this.headers});
  }

  public alterarPermissao(dados){

    if(dados.STATUS === true)
    {
      dados.STATUS = false;
    }
    else{
      dados.STATUS = true;
    }

    let body ={
      IdPerfil: dados.ID_PERFIL,
      IdTela: dados.ID_TELA,
      Botao: dados.BOTAO,
      Status: dados.STATUS

    }

    return this.http.put<PermissaoModel[]>(this.host + 'Permissao/v1/PermissaoAlterar',body,{headers:this.headers})
  }

  // public getComponente(IdPerfil: number) {
  //   return this.http.get<PermissaoModel[]>(this.host+'Permissao/v1/PermissoesPorTela?IdPerfil='+IdPerfil+'&IdTela=4',
  //   {headers: this.headers});
  // }

  // public permissaoService(IdPerfil: number, IdTela: number){
  //   console.log("TESTE");

  //   let permissao: PermissaoModel[];
  //   this.http.get<PermissaoModel[]>(this.host+'Permissao/v1/PermissoesPorTela?IdPerfil='+1+'&IdTela='+IdTela,
  //   {headers: this.headers}).subscribe(res=>{permissao});

    
  //   //this.permissaoComponent.getPermissaoTela(IdPerfil,IdTela);
    
  // }
}
