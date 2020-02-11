import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaixaService } from 'src/app/shared/services/ficha/dados-ficha/baixa.service';
import { BaixaOriginalModel } from 'src/app/shared/models/ficha/dados-ficha/baixa.model';

@Component({
  selector: 'app-baixa',
  templateUrl: './baixa.component.html',
  styleUrls: ['./baixa.component.scss'],
  // encapsulation: ViewEncapsulation.Native
})

export class BaixaComponent implements OnInit {
  private dadosLS = JSON.parse(localStorage.getItem('dados'));
  public listaBaixas: BaixaOriginalModel;
  public listaBaixasAcordo: BaixaOriginalModel;

  constructor(
    private baixaService: BaixaService
  ) { }

  ngOnInit() {
    this.listarBaixasOriginais();
    this.abaBaixaAcordo();
  }

  public listarBaixasOriginais(): void {
    this.baixaService.getBaixasOriginais(this.dadosLS[0].devedor_id).subscribe(res => {
      this.listaBaixas = res;
    });
  }

  abaBaixaAcordo() {
    this.baixaService.getBaixasAcordo(this.dadosLS[0].devedor_id).subscribe(res => {
      this.listaBaixasAcordo = res;
    });
  }

}
