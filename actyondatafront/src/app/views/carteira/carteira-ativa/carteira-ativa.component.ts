import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets/canvasjs.min';
import { CarteiraAtivaService } from 'src/app/shared/services/carteiraAtiva/carteira-ativa.service';
import { carteiraModel } from 'src/app/shared/models/carteira/carteira-detalhe-model';

@Component({
  selector: 'app-carteira-ativa',
  templateUrl: './carteira-ativa.component.html',
  styleUrls: ['./carteira-ativa.component.scss']
})
export class CarteiraAtivaComponent implements OnInit {

  constructor(private carteiraService: CarteiraAtivaService) { }

  public CarteiraAtiva: [];
  public CarteiraUnique: [];
  public AtivaEsforco: [];
  public UniqueEsforco: [];
  public carteira: carteiraModel;

  public AloUnique: number;
  public CpcUnique: number;
  public CpcaUnique: number;
  public DiscagemUnique: number;

  public AloAtivo: number;
  public CpcAtivo: number;
  public CpcaAtiva: number;
  public DiscagemAtiva: number;

  public Spin: number;
  public QuantidadeCpf: number;

  ngOnInit() {

    this.getCarteiraDetalhes();
    this.chartCarteiraAtiva();
    this.chartCarteiraUnique();
    this.chartEsforcoAtivo();
    this.chartEsforcoUnique();

  }


  public getCarteiraDetalhes() {

    this.carteiraService.getDetalhesCarteira().subscribe(
      res => {
        this.carteira = res;

        this.AloUnique = res.ALO_UNIQUE;
        this.CpcUnique = res.CPCA_UNIQUE;
        this.CpcaUnique = res.CPCA_UNIQUE;
        this.DiscagemUnique = res.DISCAGEM_UNIQUE;

        this.AloAtivo = res.ALO_ATIVO;
        this.CpcAtivo = res.CPC_ATIVO;
        this.CpcaAtiva = res.CPCA_ATIVO;
        this.DiscagemAtiva = res.DISCAGEM_ATIVA;

        this.Spin = res.SPIN;
        this.QuantidadeCpf = res.QUANTIDADE_CPF; 

      })
  }

  public chartCarteiraAtiva() {

    CanvasJS.addColorSet("blue",
      [//colorSet Array
        "#00b4d7",
        "#00c1e4",
        "#00cef1",
        "#14dbff",
        "#38e8ff",
        "#4ef6ff",
        "#62ffff"
      ]);

    this.carteiraService.getCarteiraAtiva().subscribe(
      res => {
        this.CarteiraAtiva = res;
        console.log(res);
        let chart = new CanvasJS.Chart("chartContainer", {
          colorSet: "blue",
          zoomEnabled: true,
          animationEnabled: true,
          axisX: {
            valueFormatString: "#,###,,.##M", //try properties here
            interval: 1
          },
          axisY: {

          },

          // exportEnabled: true,
          data: [{
            type: "funnel",
            dataPoints: this.CarteiraAtiva,

            indexLabel: "{label}-{y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "{label}-{y}"
          }]
        });
        chart.render();
      })
  }

  public chartCarteiraUnique() {

    CanvasJS.addColorSet("blue",
      [//colorSet Array
        "#00b4d7",
        "#00c1e4",
        "#00cef1",
        "#14dbff",
        "#38e8ff",
        "#4ef6ff",
        "#62ffff"
      ]);

    this.carteiraService.getCarteiraUnique().subscribe(
      res => {
        this.CarteiraUnique = res;
        console.log(res);
        let chart = new CanvasJS.Chart("chartContainer2", {
          colorSet: "blue",
          zoomEnabled: true,
          animationEnabled: true,
          axisX: {
            valueFormatString: "#,###,,.##M", //try properties here
            interval: 1,
            labelFontSize: 40,
          },
          axisY: {
            labelFontSize: 40,
          },

          // exportEnabled: true,
          data: [{
            type: "funnel",
            dataPoints: this.CarteiraUnique,

            indexLabel: "{label}-{y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "{label}-{y}"
          }]
        });
        chart.render();
      })
  }

  public chartEsforcoAtivo() {

    CanvasJS.addColorSet("blue",
      [//colorSet Array
        "#00b4d7",
        "#00c1e4",
        "#00cef1",
        "#14dbff",
        "#38e8ff",
        "#4ef6ff",
        "#62ffff"
      ]);

    this.carteiraService.getEsforcoAtivo().subscribe(
      res => {
        this.AtivaEsforco = res;
        console.log(res);
        let chart = new CanvasJS.Chart("chartContainer3", {
          colorSet: "blue",
          zoomEnabled: true,
          animationEnabled: true,
          axisX: {
            valueFormatString: "#,###,,.##M", //try properties here
            interval: 1,
            labelFontSize: 12,
          },
          axisY: {
            labelFontSize: 20,
          },

          // exportEnabled: true,
          data: [{
            type: "column",
            dataPoints: this.AtivaEsforco,

            indexLabel: "{y}%",
            indexLabelOrientation: "horizontal",
            toolTipContent: "{y}%"
          }]
        });
        chart.render();
      })
  }

  public chartEsforcoUnique() {

    CanvasJS.addColorSet("blue",
      [//colorSet Array
        "#00b4d7",
        "#00c1e4",
        "#00cef1",
        "#14dbff",
        "#38e8ff",
        "#4ef6ff",
        "#62ffff"
      ]);

    this.carteiraService.getEsforcoUnique().subscribe(
      res => {
        this.UniqueEsforco = res;
        console.log(res);
        let chart = new CanvasJS.Chart("chartContainer4", {
          colorSet: "blue",
          zoomEnabled: true,
          animationEnabled: true,
          axisX: {
            valueFormatString: "#,###,,.##M", //try properties here
            interval: 1,
            labelFontSize: 12,
          },
          axisY: {
            labelFontSize: 20,
          },

          // exportEnabled: true,
          data: [{
            type: "column",
            dataPoints: this.UniqueEsforco,

            indexLabel: "{y}%",
            indexLabelOrientation: "horizontal",
            toolTipContent: "{y}%"
          }]
        });
        chart.render();
      })
  }

  public getDadosFunil(){

    

  }

}


