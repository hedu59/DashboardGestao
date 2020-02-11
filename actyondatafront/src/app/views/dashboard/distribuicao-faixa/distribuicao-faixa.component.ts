import { Component, OnInit, ɵConsole } from '@angular/core';
import * as CanvasJS from '../../../../assets/canvasjs.min';
import { DistribuicaFaixaService } from 'src/app/shared/services/distribuicaoFAIXA/distribuica-faixa.service';
import { environment } from 'src/environments/environment.prod';
import { DistribuicaoUFService } from 'src/app/shared/services/distribuicaoUF/distribuicao-uf.service';
import { TaxaConversaoModel } from 'src/app/shared/models/distribuicaoUF/retornoTaxaConvesao';


@Component({
  selector: 'app-distribuicao-faixa',
  templateUrl: './distribuicao-faixa.component.html',
  styleUrls: ['./distribuicao-faixa.component.scss']
})


export class DistribuicaoFaixaComponent implements OnInit {

  constructor(
    private distribuicaoFaixaService: DistribuicaFaixaService,
    private distribuicaoUFService: DistribuicaoUFService) { }

  //#region FAIXA


  public FaixaCPF: [];
  public FaixaValor: [];
  public FaixaTicket: [];
  public FaixaCPC: [];
  public FaixaCPCA: [];
  public TaxaCONVERSAO: [];
  public visibilidade: boolean = true;
  public detalhamento: boolean = false;
  public mobile:boolean;
  public filtro = JSON.parse(localStorage.getItem('contratanteId'));

  //#endregion

  //#region UF

  public UFCPF: [];
  public UFVALOR: [];
  public UFTICKET: [];
  public UFVALORREGIAO: [];
  public UFTICKETREGIAO: [];
  public UFTAXA: [];
  public TaxaModel: TaxaConversaoModel[];
  public visibilidade2: boolean = true;
  public tituloChartUm: string = "UF x CPF";

  //#endregion
  ngOnInit() {

    function name(e) {
      console.log(e);
    }
    // function detalhamento(e) {

  
    //   localStorage.setItem('deta', JSON.stringify(e.dataPoint.label))

    // }
    console.log(window.screen.width)
    if (window.screen.width <= 400) { // 768px portrait

      console.log(window.screen.width +"TESTE2222")
      this.mobile = true;
    }
    this.chartOne();
    this.chartValor();
    this.chartCPC();
    this.chartCPCA();
    this.chartConversao();

    this.chartOneUF();
    this.chartTwoUF();
    this.chartValorRegiaoUF();  
    this.chartTicketMedioUF();

   // this.chartTaxaConversaoUF();
    
    this.TaxaDeConversaoUF();
    this.ticketMedioXValorUF();
  }

  //#region Faixa

  public detalheFaixa(e: string) {
    this.distribuicaoFaixaService.getDetalhe(e).subscribe(res => {

      let teste: [] = res;
      this.chartOne;
     


    })
  }

  public validarFiltros() {
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

   

    this.distribuicaoFaixaService.getFaixaCPF().subscribe(
      res => {
        this.FaixaCPF = res;

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
            click: function (e) {

              localStorage.setItem('deta', JSON.stringify(e.dataPoint.label))
              
              var contratante = JSON.parse(localStorage.getItem('contratanteId')).contratanteId;
              var dataInicial = JSON.parse(localStorage.getItem('contratanteId')).dataInicial;
              var datafinal =  JSON.parse(localStorage.getItem('contratanteId')).dataFinal;
              
              $.get(environment.host + "/DistribuicaoFaixa/faixa/Detalhe/?contratante="+ 
              contratante+"&dataInicial="+
              dataInicial+"&datafinal="+
              datafinal+"&faixaNome="+
              e.dataPoint.label, function (data) {
                
                $("#detalhe").html(


                  '<div class="col-md-12 perfil">'+

                  '<div style="padding-bottom: 2px">'+
                      '<div class="col-md-12">'+
                        '<div class="row">'+
        
                            '<div class="col-md-3" style="text-align: center;padding-top: 20px;"> '+
                                '<div class="card mb-3" style="height: 150px;background-color: #00c1e4; color:white" >'+
                                    '<div class="card-body pb-0">'+
                                      '<div class="card-title negrito">  <h1><strong style="color:white"><i class="icofont-site-map"></i> Faixa</strong> </h1>     </div>'+
                                      '<hr style="color: white">'+
                                      '<div style="padding-bottom: 2px">'+
                                          '<h1><strong style="color:white"> '+data.FASE+'  </strong> </h1> '+
                                      '</div> '+              
                                    '</div>'+
                                  '</div>'+                                                                      
                            '</div>'+
        
                            '<div class="col-md-3 " *ngIf="!mobile" style="text-align: center;padding-top: 20px">'+                  
                                '<div class="card mb-3" style="height: 150px;background-color: #41cf88; " >'+
                                    '<div class="card-body pb-0">'+
                                      '<div class="card-title negrito">  <h1><strong style="color:white"><i class="icofont-dollar"></i>Valor</strong> </h1>     </div>'+
                                      '<hr style="color: white">'+
                                      '<div style="padding-bottom: 2px">'+
                                          '<h1><strong style="color:white"> R$ '+data.VALOR+'  </strong> </h1>'+ 
                                      '</div>'+                    
                                    '</div>'+
                                  '</div>'+                                                         
                            '</div>'+
        
                            '<div class="col-md-3" *ngIf="!mobile" style="text-align: center;padding-top: 20px">'+                  
                                '<div class="card mb-3" style="height: 150px;background-color: #41cf88; color:white" >'+
                                    '<div class="card-body pb-0">'+
                                      '<div class="card-title negrito">  <h1><strong style="color:white"><i class="icofont-handshake-deal"></i> CPCA</strong> </h1>     </div>'+
                                      '<hr style="color: white">'+
                                      '<div style="padding-bottom: 2px">'+
                                          '<h1><strong style="color:white">'+data.CPCA+' </strong> </h1>'+
                                      '</div>'+                    
                                    '</div>'+
                                  '</div>'+                                         
                            '</div>'+
        
                            '<div class="col-md-3" *ngIf="!mobile" style="text-align: center;padding-top: 20px">'+                  
                                '<div class="card mb-3" style="height: 150px;background-color:#00c1e4; color:white" >'+
                                    '<div class="card-body pb-0">'+
                                      '<div class="card-title negrito"> <h1><strong style="color:white"><i class="icofont-users-alt-5"></i> CPFs</strong> </h1>     </div>'+
                                      '<hr style="color: white">'+
                                      '<div style="padding-bottom: 2px">'+
                                          '<h1><strong style="color:white"> '+data.QUANTIDADE+' </strong> </h1>'+
                                      '</div>'+                   
                                    '</div>'+
                                  '</div>'+                                             
                            '</div>'+
        
                        '</div>'+  
        
                      '</div>'+
                  '</div>'+
            '</div>'



                );

              }
              )
            },
            type: "bar",
            dataPoints: this.FaixaCPF.reverse(),
            indexLabel: "{y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "UF: {label}  <hr/> Quantidade: {y}"
          }]
        });

        chart.render();
      })

    let e = JSON.parse(localStorage.getItem('deta'));
    
  }

  public chartValor() {
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

    this.distribuicaoFaixaService.getFaixaValor().subscribe(
      res => {
        this.FaixaValor = res;

        let chart = new CanvasJS.Chart("chartContainer2", {
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
            type: "splineArea",
            dataPoints: this.FaixaValor.reverse(),

            indexLabel: "{y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "UF: {label}  <hr/> Quantidade: {y}"
          }]
        });
        chart.render();
      })
  }

  public chartTicketMedio() {
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

    this.distribuicaoFaixaService.getFaixaTicket().subscribe(
      res => {
        this.FaixaTicket = res;

        let chart = new CanvasJS.Chart("chartContainer3", {
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
            type: "column",
            dataPoints: this.FaixaTicket,

            indexLabel: "R$ {y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "UF: {label}  <hr/> Quantidade: {y}"
          }]
        });
        chart.render();
      })
  }

  public chartCPC() {
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

    this.distribuicaoFaixaService.getFaixaCPC().subscribe(
      res => {
        this.FaixaCPC = res;

        let chart = new CanvasJS.Chart("chartContainer4", {
          title: {
            text: "CPC"

          },
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
            type: "pie",
            startAngle: 0,
            dataPoints: this.FaixaCPC,

            indexLabel: "{label}-{y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "UF: {label}  <hr/> Quantidade: {y}"
          }]
        });
        chart.render();
      })
  }

  public chartCPCA() {
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

    this.distribuicaoFaixaService.getFaixaCPCA().subscribe(
      res => {
        this.FaixaCPCA = res;
 
        let chart = new CanvasJS.Chart("chartContainer5", {
          title: {
            text: "CPCA"

          },
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
            type: "pie",
            startAngle: 0,
            dataPoints: this.FaixaCPCA,

            indexLabel: "{label}-{y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "UF: {label}  <hr/> Quantidade: {y}"
          }]
        });
        chart.render();
      })
  }

  public chartConversao() {
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

    this.distribuicaoFaixaService.getConversao().subscribe(
      res => {
        this.TaxaCONVERSAO = res;
        console.log(this.TaxaCONVERSAO);
        let chart = new CanvasJS.Chart("chartContainer6", {

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
            type: "line",
            startAngle: 0,
            dataPoints: this.TaxaCONVERSAO.reverse(),
            indexLabel: "{y}%",
            indexLabelOrientation: "horizontal",
            toolTipContent: "UF: {label}  <hr/> Quantidade: {y}%"
          }]
        });
        chart.render();
      })
  }

  public ticketMedioXValor() {

    if (this.visibilidade == true) {
      this.visibilidade = false;
      this.chartTicketMedio()

    }
    else {
      this.visibilidade = true;
      this.chartValor();
    }

  }

  //#endregion

  //#region UF

  public chartOneUF() {

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

        let chart = new CanvasJS.Chart("chartContainer11", {
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

  public chartTwoUF() {

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

        let chart = new CanvasJS.Chart("chartContainer12", {
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

  public chartTicketMedioUF() {

    this.distribuicaoUFService.getTicket().subscribe(
      ret => {
        this.UFTICKET = ret;


        this.distribuicaoUFService.getConversao().subscribe(res => {

          this.UFTAXA = res;
    

          let chart = new CanvasJS.Chart("chartContainer13", {
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

  public chartTaxaConversaoUF() {

    this.distribuicaoUFService.getConversao().subscribe(res => {

      this.UFTAXA = res;
      console.log(this.UFTAXA);

      let chart = new CanvasJS.Chart("chartContainer14", {
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

  public chartValorRegiaoUF() {
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


      let chart = new CanvasJS.Chart("chartContainer15", {
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

  public chartTicketRegiaoUF() {
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

      let chart = new CanvasJS.Chart("chartContainer16", {
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

  public TaxaDeConversaoUF() {

    if (this.tituloChartUm === 'UF x CPF') {
      this.chartTaxaConversaoUF()
      return this.tituloChartUm = "Taxa de Conversão - %"

    }
    else {
      this.chartOneUF()
      return this.tituloChartUm = "UF x CPF"
    }
  }

  public ticketMedioXValorUF() {

    if (this.visibilidade2 == true) {
      this.visibilidade2 = false;
      this.chartTicketMedioUF()
     
    }
    else {
      this.visibilidade2 = true;
      this.chartTwoUF();
    }

  }

  //#endregion
}
