import { Injectable }              from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RetornoEndereolModel }    from 'src/app/shared/models/retorno/ficha/contato/endereo-model';
import { environment }             from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Accept', 'application/json')
    .append('Authorization', 'bearer ' + this.token);

  constructor(private http: HttpClient) { 
    this.host = environment.host;
  }

  public  listarEnderecos(devedor_id) {
    return this.http.get(this.host+'DevedorEndereco/v1/endereco/'+devedor_id, {headers: this.headers});
  }

  public gravarEndereco(dados, devedor_id) {
    const str = dados.CEP;
    let form = {
      ENDERECO_ID: dados.ENDERECO_ID,
      DEVEDOR_ID:  devedor_id,
      ENDERECO:    dados.ENDERECO,
      NUMERO:      dados.NUMERO,
      COMPLEMENTO: this.converteValorVazio(dados.COMPLEMENTO),
      BAIRRO:      dados.BAIRRO,
      CIDADE:      dados.CIDADE,
      UF:          dados.UF,
      CEP:         str.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''),
      ORIGEM:      'cadastro',
      USUARIO_INCLUSAO: localStorage.getItem('usuario_logado')
    }

    if (dados.ENDERECO_ID) {
      return this.http.put<RetornoEndereolModel>(this.host+'DevedorEndereco/v1/endereco/'+devedor_id, form, {headers: this.headers});
    } else {
      return this.http.post<RetornoEndereolModel>(this.host+'DevedorEndereco/v1/endereco/'+devedor_id, form, {headers: this.headers});
    }
  }

  public excluirEndereco(devedor_id, endereco_id) {
    return this.http.delete(this.host+'DevedorEndereco/v1/endereco?id='+devedor_id+'&enderecoId='+endereco_id, {headers: this.headers});
  }

  converteValorVazio( valor ) {
    if (valor === '' || valor === null || valor === undefined) {
      return ' ';
    } else {
      return valor;
    }
  }
  
}