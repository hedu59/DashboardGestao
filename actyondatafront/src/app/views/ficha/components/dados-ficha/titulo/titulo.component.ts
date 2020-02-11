import { Component, OnInit } from '@angular/core';
import { DividaService } from 'src/app/shared/services/ficha/dados-ficha/divida.service';
import { resultTituloVM } from 'src/app/shared/models/retorno/ficha/divida-atualizada-model';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})

export class TituloComponent implements OnInit {
  public titulos: resultTituloVM[];
  public somaOriginal   = 0;
  public somaJuros      = 0;
  public somaMulta      = 0;
  public somaHonorarios = 0;
  public somaTotal      = 0;
  public qtdeTitulos    = 0;
  public faixaAtraso    = 0;
  public qtdVencer      = 0;
  public qtdVencido     = 0;
  public dataAtualizacao;
  public moduleLoadingTitulo: boolean = false;
  private dadosLS = JSON.parse(localStorage.getItem('dados'));
  camposVisualizacao;

  constructor(
    private dividaService: DividaService
  ) { }

  ngOnInit() {
    this.dividaAtualiza(this.dataAtual());
    $('#dataAtualizacao').val(this.dataAtual());
    this.dataAtualizacao = this.convertDateBr(this.dataAtual());
  }

  onDateSelect(data) {
    this.dividaAtualiza(data);
    this.dataAtualizacao = this.convertDateBr(data);
  }

  public dividaAtualiza(data?) {
    this.moduleLoadingTitulo = true;
    this.somaOriginal   = 0;
    this.somaJuros      = 0;
    this.somaMulta      = 0;
    this.somaHonorarios = 0;
    this.qtdeTitulos    = 0;
    this.qtdVencido     = 0;
    this.qtdVencer      = 0;
    this.dividaService.dividaAtualizada(data, this.dadosLS).subscribe(res => {
      this.moduleLoadingTitulo = false;
      
      this.titulos = res.Data.resultTituloVM;
      this.camposVisualizacao = res.Data.listaCampos;
      
      for (let i = 0; i < this.titulos.length; i++) {
        this.qtdeTitulos++;

        if (this.titulos[i].FAIXA > this.faixaAtraso) {
          this.faixaAtraso = this.titulos[i].FAIXA;
        }

        if (this.titulos[i].FAIXA > 0) {
          this.qtdVencido++;
          this.somaOriginal   += this.titulos[i].VALOR_ORIGINAL;
          this.somaJuros      += this.titulos[i].ValorJurosComDesconto;
          this.somaMulta      += this.titulos[i].ValorMultaComDesconto;
          this.somaHonorarios += this.titulos[i].ValorHonorarioComDesconto;
        } else {
          this.qtdVencer++;
        }
      }

      this.somaTotal = this.somaHonorarios + this.somaMulta + this.somaJuros + this.somaOriginal;

    }, err => { 
      this.moduleLoadingTitulo = false;
    });
  }

  public getCampo(titulo: resultTituloVM, campo) {
    return titulo[campo];
  }

  selecionarTitulo(valor, titulo) {
    if (valor.toElement.checked === true) {
      this.somaOriginal   += titulo.VALOR_ORIGINAL;
      this.somaJuros      += titulo.ValorJurosComDesconto;
      this.somaMulta      += titulo.ValorMultaComDesconto;
      this.somaHonorarios += titulo.ValorHonorarioComDesconto;
    } else {
      this.somaOriginal   -= titulo.VALOR_ORIGINAL;
      this.somaJuros      -= titulo.ValorJurosComDesconto;
      this.somaMulta      -= titulo.ValorMultaComDesconto;
      this.somaHonorarios -= titulo.ValorHonorarioComDesconto;
    }
    this.somaTotal = this.somaHonorarios + this.somaMulta + this.somaJuros + this.somaOriginal;
  }

  marcarTodos(valor) {
    if (valor.toElement.checked === true) {
      $('.checkbox').prop("checked", true);
      this.somaOriginal   = 0;
      this.somaJuros      = 0;
      this.somaMulta      = 0;
      this.somaHonorarios = 0;
      for (let i = 0; i < this.titulos.length; i++) {
        this.somaOriginal   += this.titulos[i].VALOR_ORIGINAL;
        this.somaJuros      += this.titulos[i].ValorJurosComDesconto;
        this.somaMulta      += this.titulos[i].ValorMultaComDesconto;
        this.somaHonorarios += this.titulos[i].ValorHonorarioComDesconto;
      }
    } else {
      $('.checkbox').prop("checked", false);
      this.somaOriginal   = 0;
      this.somaJuros      = 0;
      this.somaMulta      = 0;
      this.somaHonorarios = 0;
    }
    this.somaTotal = this.somaHonorarios + this.somaMulta + this.somaJuros + this.somaOriginal;
  }

  private dataAtual() {
    let today = new Date();                        
    let data = today.toISOString().split('T')[0]; 
    return data;
  }

  private convertDateBr(value) {
    var data = value.split('-');
    return data[2].substr(0, 2) + '/' + data[1] + '/' + data[0];
  }

}
