import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RetornoAcionamento } from 'src/app/shared/models/retorno/pesquisa/retorno-acionamento-model';
import { AcaoCobranca } from 'src/app/shared/models/ficha/dados-ficha/acao-cobranca-modal';
import { ConfigAcaoCobrancaModel } from 'src/app/shared/models/retorno/ficha/acionamento/config-acao-cobranca-model';
import { RetornoInclusaoAcionamentoModel } from 'src/app/shared/models/retorno/ficha/acionamento/Inclusao-Acionamento';

@Injectable({
  providedIn: 'root'
})
export class AcionamentoService {
  private token = localStorage.getItem('token').replace(/["|']/g, "");
  private host: string;
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Accept', 'application/json')
  .append('Authorization', 'bearer ' + this.token);

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  public acionamentos(DevedorId: Number) {
    return this.http.get<RetornoAcionamento>(this.host+'DevedorAcionamento/v1/acionamento?id='+DevedorId+'&top=15', {headers: this.headers})
  } 

  public getAcaoCobranca(cont_id: number) {
    return this.http.get<AcaoCobranca>(this.host+'AcaoCobranca/v1/listaAcao/'+cont_id, {headers: this.headers} );
  }

  public gravarAcionamento(valores) {
    let dadosLS = JSON.parse(localStorage.getItem('dados'));
    let fila_id = localStorage.getItem('fila_id');
    let pesquisaFicha = localStorage.getItem('pesquisaFicha');
    let form = {
      DATA: new Date(),
      ACAO_ID: valores.ACAO_ID,
      MENSAGEM: valores.DESCRICAO,
      COBRADOR_ID: 0,
      DEVEDOR_ID: dadosLS[0].devedor_id,
      FONE: localStorage.getItem('fone_selecionado'),
      DATA_PREVISAO: valores.DATA,
      DISCADOR: "",
      USUARIO_INCLUSAO: localStorage.getItem('usuario_logado'),
      CONT_ID: dadosLS[0].cont_id,
      FILA_ID: pesquisaFicha === 'sim' ? '1' : fila_id ,
      // ORIGEM: 
    }
    
    return this.http.post<RetornoInclusaoAcionamentoModel>(
      this.host+'/DevedorAcionamento/v1/acionamento/'+dadosLS[0].devedor_id, 
      form, 
      {headers: this.headers}
    );
    
  }

  public configAcaoCobranca(acao_id: number, cont_id: number) {
    return this.http.get<ConfigAcaoCobrancaModel>(this.host+'AcaoCobranca/v1/acao?contId='+cont_id+'&acaoId='+acao_id, {headers: this.headers});
  }
  
}
