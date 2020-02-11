import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FoneModel } from "../../models/cliente/Fone-Model";
import { TipoFoneModel } from "../../models/TipoFoneModel";
import { RetornoFoneModel } from "../../models/retorno/retorno-fone-modal";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class FoneService {
  private token = localStorage.getItem("token").replace(/["|']/g, "");
  private host: string;

  private headers = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Accept", "application/json")
    .append("Authorization", "bearer " + this.token);


    private hear = new HttpHeaders()
    .set("cache-control", "no-cache")
    // .set("Connection", "keep-alive")
    .set("accept-encoding", "gzip, deflate")
    .set("Host", "portal.mkmservice.com")
    .set("Cache-Control", "no-cache")
    .set("Accept", "*/*")

    private hear2 = ({
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Accept": "*/*"
    });

  constructor(
    private http: HttpClient) {
    this.host = environment.host;
  }

  public salvarFone(dados: FoneModel, devedor_id) {
    let clienteId = localStorage.getItem("devedor_id");

    let form = {
      DEVEDOR_ID: devedor_id,
      FONE: dados.FONE,
      TIPO: dados.TIPO,
      STATUS: dados.STATUS,
      OBSE: dados.OBSE,
      ORIGEM: "Cadastro",
      PRIORITARIO: dados.PRIORITARIO,
      SE_WHATSAPP: dados.SE_WHATSAPP,
      USUARIO_INCLUSAO: localStorage.getItem('usuario_logado'),
      USUARIO_ALTERACAO: localStorage.getItem('usuario_logado'),
      FONE_AUXILIAR: dados.FONE_AUXILIAR,
      PERCENTUAL_LOCALIZACAO: dados.LOCALIZACAO
    };
    
    if (dados.FONE_AUXILIAR) {
      return this.http.put<RetornoFoneModel>(this.host + "Fone/v1/fone/" + devedor_id, form, { headers: this.headers });
    } else {
      return this.http.post<RetornoFoneModel>(this.host + "Fone/v1/fone/" + devedor_id, form, { headers: this.headers });
    }

  }

  public listarFones(devedor_id: number) {
    return this.http.get<FoneModel>(
      this.host + "Fone/v1/fone/" + devedor_id,
      { headers: this.headers }
    );
  }

  public excluirFone(fone, devedor_id) {
    return this.http.delete(
      this.host + "Fone/v1/fone?id=" + devedor_id + "&fone=" + fone,
      { headers: this.headers }
    );
  }

  public getTipFone() {
   return this.http.get<TipoFoneModel>(this.host+'Fone/v1/tipoFone', {headers: this.headers});
  }

  public enviarSMS() {
    var usuario = 'VALENCAADV';
    var senha = 'mkm@@2019';
    var empresa = 'VALENCAADV';
    var fone = '85987002585';
    var mensagem = 'mensagem_actyon_web';

    this.http.get(
      "https://portal.mkmservice.com/api/?modo=envio&empresa=" + empresa + "&usuario=" + usuario + "&senha=" + senha + "&telefone=" + fone + "&mensagem=" + mensagem + "&centro_custo=CENTRO%20DE%20CUSTO%20LONG%20CODE",
      {headers: this.hear2}
    ).subscribe(res => {
      console.log(res);
    });

  }

}