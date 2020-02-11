import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContratanteService } from 'src/app/shared/services/contratante/contratante.service';
import { ContratanteModel } from 'src/app/shared/models/contratante/contrantates';


@Component({
  selector: 'app-ramal',
  templateUrl: './ramal.component.html',
  styleUrls: ['./ramal.component.scss']
})
export class RamalComponent implements OnInit {

  public listaContratante: ContratanteModel[];
  loading: boolean;
  loadingText: string;
  formFiltro: FormGroup
  idContratante: any;
  fantasia: any;
  dataIni: any;
  dataFim: any;

  constructor(
    private fb2: FormBuilder,
    private router: Router,
    private contratanteService: ContratanteService
  ) { }

 
  ngOnInit() {

    this.formData();
    this.ObterContratantes();
  }

  formData() {
    this.formFiltro = this.fb2.group({
      contratanteId:["",[Validators.required]] ,
      dataInicial: ["",[Validators.required]] ,
      dataFinal: ["",[Validators.required]] ,
    })
  }


  public salvarFiltros() {

    localStorage.setItem('contratanteId', JSON.stringify(this.formFiltro.value)) 
    
    this.idContratante = JSON.parse(localStorage.getItem('contratanteId')).contratanteId;
    this.fantasia = this.listaContratante.find(a => a.CONTRATANTE_ID == this.idContratante).FANTASIA;
    
    this.dataIni = JSON.parse(localStorage.getItem('contratanteId')).dataInicial;
    this.dataFim = JSON.parse(localStorage.getItem('contratanteId')).dataFinal;


    this.router.navigateByUrl('/dashboard/v1');
  }


  public ObterContratantes(){
    this.contratanteService.getContrantes().subscribe(res=>{
      this.listaContratante = res;

      console.log(this.listaContratante);
    })
  }

}
