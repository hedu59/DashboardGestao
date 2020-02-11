import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets/canvasjs.min';
import { DistribuicaoUFService } from 'src/app/shared/services/distribuicaoUF/distribuicao-uf.service';
import { TaxaConversaoModel } from 'src/app/shared/models/distribuicaoUF/retornoTaxaConvesao';

@Component({
  selector: 'app-distribuicao-uf',
  templateUrl: './distribuicao-uf.component.html',
  styleUrls: ['./distribuicao-uf.component.scss']
})
export class DistribuicaoUFComponent implements OnInit {

  constructor(private distribuicaoUFService: DistribuicaoUFService) { }

  public UFCPF: [];
  public UFVALOR: [];
  public UFTICKET: [];
  public UFVALORREGIAO: [];
  public UFTICKETREGIAO: [];
  public UFTAXA: [];
  public TaxaModel: TaxaConversaoModel[];
  public visibilidade: boolean = true;
  public tituloChartUm: string = "UF x CPF";

  ngOnInit() {

    this.validarFiltros();
    this.chartOne();
    this.chartTwo();
    this.chartTaxaConversao();
    this.chartValorRegiao();
    this.chartTicketRegiao();

  }

  public validarFiltros(){

    let filtros = JSON.parse(localStorage.getItem('contratanteId'));
      
  }

  public chartOne() {

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

    this.distribuicaoUFService.getUFxCPF().subscribe(
      res => {
        this.UFCPF = res;

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
            type: "bar",
            dataPoints: this.UFCPF,

            indexLabel: "{y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "UF: {label} - Quantidade: {y} <hr/> Carteira: {W}"
          }]
        });
        chart.render();
      })
  }

  public chartTwo() {

    this.distribuicaoUFService.getValor().subscribe(
      res => {
        this.UFVALOR = res;

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

        let chart = new CanvasJS.Chart("chartContainer2", {
          colorSet: "blue",
          axisY: {
            valueFormatString: "R$ ##,###,###.#00", //try properties here
            
            stripLines: [{
              value: 3366500,
              label: "Average"
            }],
          },
          axisX: {
          
            interval: 1
          },

         
          animationEnabled: true,
          zoomEnabled: true,
          data:
            [
              {
               // showInLegend: true,
                name: "Carteira",
                type: "splineArea",
                indexLabel: "R$ {y}",
                dataPoints: this.UFVALOR,
                toolTipContent: "{label} - Valor: R$ {y} "
              }
            ]

        });

        chart.render();

      })
  }

  public chartTicketMedio() {

    this.distribuicaoUFService.getTicket().subscribe(
      ret => {
        this.UFTICKET = ret;
        console.log(this.UFVALOR);
        console.log(this.UFTICKET);

        this.distribuicaoUFService.getConversao().subscribe(res => {

          this.UFTAXA = res;
          console.log(this.UFTAXA);

          let chart = new CanvasJS.Chart("chartContainer10", {
            animationEnabled: true,
            colorSet: "red",
            // exportEnabled: true,
            data: [{
              type: "line",
              zoomEnabled: true,
              dataPoints: this.UFTICKET,
              indexLabel: "R$ {y}",
              color:"red",
              toolTipContent: "{label} - Valor: R$ {y} "
            }]
          });
          chart.render();
        })

      })

  }

  public chartTaxaConversao() {

    this.distribuicaoUFService.getConversao().subscribe(res => {

      this.UFTAXA = res;
      console.log(this.UFTAXA);

      let chart = new CanvasJS.Chart("chartContainer6", {
        animationEnabled: true,
        colorSet: "blue",
        // exportEnabled: true,
        data: [{
          type: "funnel",
          zoomEnabled: true,
          dataPoints: this.UFTAXA.reverse(),
          indexLabel: "{label}-{y}%",
          toolTipContent: "{label} - Taxa: {y}%"
        }]
      });
      chart.render();
    })

  }

  public chartValorRegiao() {
    this.distribuicaoUFService.getValorRegiao().subscribe(res => {
      
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

      this.UFVALORREGIAO = res;
      console.log(this.UFVALORREGIAO);

      let chart = new CanvasJS.Chart("chartContainer3", {
        colorSet:"blue",
        animationEnabled: true,
        title: {
          text: "Valor Região",
          fontStyle: "normal",
          fontFamily: "Montserrat",
        },
        // exportEnabled: true,
        data: [{
          type: "doughnut",
          zoomEnabled: true,
          dataPoints: this.UFVALORREGIAO,
          indexLabel: "{label}-R${y}"
          // toolTipContent: "UF: {label} - Valor: {y} <hr/> Carteira: {W}"
        }]
      });
      chart.render();
    })

  }

  public chartTicketRegiao() {
    this.distribuicaoUFService.getTicketRegiao().subscribe(res => {

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


      this.UFTICKETREGIAO = res;
      console.log(this.UFTICKETREGIAO);

      let chart = new CanvasJS.Chart("chartContainer4", {
        colorSet:"blue",
        animationEnabled: true,
        title: {
          text: "Ticket Região",
          fontFamily: "Montserrat",
        },

        // exportEnabled: true,
        data: [{
          type: "doughnut",
          zoomEnabled: true,
          dataPoints: this.UFTICKETREGIAO,
          indexLabel: "{label}-R${y}"
          // toolTipContent: "UF: {label} - Valor: {y} <hr/> Carteira: {W}"
        }]
      });
      chart.render();
    })

  }

  public TaxaDeConversao() {

    if (this.tituloChartUm === 'UF x CPF') {
      this.chartTaxaConversao()
      return this.tituloChartUm = "Taxa de Conversão - %"

    }
    else {
      this.chartOne()
      return this.tituloChartUm = "UF x CPF"
    }
  }

  public ticketMedioXValor() {

    if (this.visibilidade == true) {
      this.visibilidade = false;
      this.chartTicketMedio()
     
    }
    else {
      this.visibilidade = true;
      this.chartTwo();
    }

  }


}