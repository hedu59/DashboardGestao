import { Component, OnInit } from '@angular/core';
import { ProdutividadeService } from 'src/app/shared/services/produtividade/produtividade.service';
import * as CanvasJS from '../../../../assets/canvasjs.min';


@Component({
  selector: 'app-producao',
  templateUrl: './producao.component.html',
  styleUrls: ['./producao.component.scss']
})
export class ProducaoComponent implements OnInit {
  private produtividade:[];
  private valorRecebido: string;
  constructor(private producaoService: ProdutividadeService) { }

  ngOnInit() {
    this.ObterProdutividade();
    this.ObterTotalRecebido();
  }

  public ObterProdutividade(){
    
    this.producaoService.getProducao().subscribe(res=>{
      this.produtividade = res;
      console.log(res);
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
            type: "column",
            dataPoints: this.produtividade,

            indexLabel: "{y}",
            indexLabelOrientation: "horizontal",
            toolTipContent: "UF: {label}  <hr/> Quantidade: {y}"
          }]
        });
        chart.render();
      })
 
  }

  public ObterTotalRecebido(){
    this.producaoService.getValorRecebido().subscribe(res=>{
      this.valorRecebido = res;
      console.log(res);
    })
  }
}
