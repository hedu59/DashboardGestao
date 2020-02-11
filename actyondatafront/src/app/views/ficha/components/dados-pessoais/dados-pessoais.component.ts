import { Component, OnInit } from '@angular/core';
import { FichaModel } from 'src/app/shared/models/ficha/ficha-model';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {
  public dadosCliente: FichaModel;

  constructor() { }

  ngOnInit() {
  }

  public preencherDados(dados) {
    this.dadosCliente = dados;
  }

}
