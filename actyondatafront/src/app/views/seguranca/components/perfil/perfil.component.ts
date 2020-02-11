
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { PermissaoComponent } from '../permissao/permissao.component';
import { Perfil } from 'src/app/shared/models/seguranca/perfil/perfil-model';
import { PerfilService } from 'src/app/shared/services/seguranca/perfil/perfil.service';
import { TelaModel } from 'src/app/shared/models/seguranca/tela/tela-model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  @ViewChild(PermissaoComponent) private permissaoComponent: PermissaoComponent;
  

  public perfil: Perfil[];
  public telas: TelaModel[];
  public dadosPerfil: Perfil;
  public perfilSelect: string;
  public title: string;
  public editar: boolean;
  public campos_invalidos: boolean;
  public colorModal: string;
  public formPerfil: FormGroup;
  public formClone: FormGroup;
  public retornoMensagem;

  dtTriggerPerfil: Subject<any> = new Subject();
  dtTriggerTelas:Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  dtOptionsT: DataTables.Settings = {};
  IdPerfil: any;
  public dadosTela: TelaModel;
  public IdTela: number;
  
  

  constructor(
    
    private perfilService: PerfilService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private fbClone: FormBuilder,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.getPerfis();
    this.getTela();
    this.validarForm();
    this.dtOptions = {
      pageLength: 5
      // "order": [[ 3, "desc" ]] Se quiser ordenar basta descomentar esse campo
    };

    this.dtOptionsT = {
      pageLength: 5
      // "order": [[ 3, "desc" ]] Se quiser ordenar basta descomentar esse campo
    };
  }

  validarForm() {
    this.formPerfil = this.fb.group({
      ID_PERFIL: [""],
      DESCRICAO: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      STATUS: [0],
    });
  }

  validarFormClone() {
    this.formClone = this.fbClone.group({
      ID_PERFIL_ORIGINAL: ["", [Validators.required]],
      ID_PERFIL_CLONE: ["", [Validators.required]],
    });
  }

  public getPerfis() {
    const table = $('#tabelaPerfil').DataTable();
    table.clear();
    table.destroy();
    if (1 === 1) {
      this.perfilService.getPerfis().subscribe(
        res => { 
          this.perfil = res;
          this.dtTriggerPerfil.next();
      });
    }
  }

  public getPerfisClone() {
      this.perfilService.getPerfis().subscribe(
      res => { this.perfil = res;});
  }

  public getTela(){

    let table = $('#tabelaTela').DataTable();
    table.clear();
    table.destroy();
    if (1==1) {
      this.perfilService.getTelasService().subscribe(
        res =>{ 
          this.telas = res; 
          this.dtTriggerTelas.next();
      });    
    }  
  }

  public getTelaComId(id: number){

    let table = $('#tabelaTela').DataTable();
    table.clear();
    table.destroy();
    if (1==1) {
      this.perfilService.getTelasServiceComId(id).subscribe(
        res =>{ 
          this.telas = res; 
          this.dtTriggerTelas.next();
      });    
    }  
  }

  public convertTipo(valor) {
    if (valor === true) {
      return 'ATIVO';
    } else {
      return 'INATIVO';
    }
  }

  public selecionarLinha(dados): void {

    this.dadosPerfil = dados;
    this.IdPerfil = dados.ID_PERFIL;
    
    localStorage.setItem('idPerfilSelecionado',dados.ID_PERFIL);
    let perfil= parseInt(localStorage.getItem('idPerfilSelecionado'));
    this.getTelaComId(perfil);
    
    this.permissaoComponent.getPermissao(perfil);
  }

  public selecionarTela(dados) {
  
    this.dadosTela = dados;
    this.IdTela = dados.ID_TELA;
    let perfil= parseInt(localStorage.getItem('idPerfilSelecionado'));
    this.permissaoComponent.getPermissaoTela(perfil,dados.ID_TELA);
    
  }
  
  public clonarPerfil(){
  

    this.perfilService.clonarPerfil(this.formClone.value).subscribe(
      res => {
        if (res.Success === true) {
          
          this.campos_invalidos = false;
          this.formPerfil.reset();
          this.validarFormClone();
          this.modalService.dismissAll();
          this.getPerfis();
          this.getTela();
         // this.permissaoComponent.getPermissao(this.formClone.value.ID_PERFIL_ORIGINAL);
          this.toastr.success("Perfil clonado com sucesso.", "Sucesso!", { progressBar: true });

        } else {
          this.retornoMensagem = res.Data;
          this.campos_invalidos = true;
          this.toastr.error("Impossível clonar perfil", "Erro!", { progressBar: true });
        }
      });
  }
  
  public alterarPerfil(): void {

    this.perfilService.salvarPerfil(this.formPerfil.value).subscribe(
      res => {
        if (res.Success === true) {
          
          this.campos_invalidos = false;
          this.formPerfil.reset();
          this.validarForm();
          this.modalService.dismissAll();
          this.getPerfis();
          this.toastr.success("Perfil editado com sucesso.", "Sucesso!", { progressBar: true });

        } else {
          this.retornoMensagem = res.Data;
          this.campos_invalidos = true;
          this.toastr.error("Dados invalidos.", "Erro!", { progressBar: true });
        }
      });
  }

  // ------------ AREA MODAL

  public modalClonarPerfil(content): void{
    
    this.validarFormClone();
   
    if (content) {

      this.title = 'Clone';
      this.colorModal = '#263db5';
      this.campos_invalidos = false;
      this.editar = true;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });

    } else {
      this.toastr.warning('Não foi possível executar essa tarefa!', 'Info!', { progressBar: true });
    }
      
  }
  
  public modalCadastrar(content): void {
    this.colorModal = '#27ae60';
    this.title = "Cadastrar";
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" });
    this.formPerfil.reset();
    this.editar = false;
    this.validarForm();
  }
  
  public modalEditarPerfil(content, dados): void {

    this.validarForm();

    if (dados) {
      this.title = 'Editar';
      this.colorModal = '#466eb0';
      this.campos_invalidos = false;
      this.editar = true;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  
      let Status;
      if (dados.STATUS === true) {
        Status = 'ATIVO';
      } else {
        Status = 'INATIVO';
      }
  
      let StatusP: string;
      switch (dados.STATUS) {
        case true:
          StatusP = 'ATIVO';
          break;
        case false:
          StatusP = 'INATIVO';
          break;
        default:
          StatusP = 'X';
          break;
      }
      const idPerfil = dados.ID_PERFIL;
  
      this.formPerfil.patchValue({
  
        ID_PERFIL: idPerfil,
        STATUS: StatusP,
        DESCRICAO: dados.DESCRICAO,
  
      });
  
    } else {
      this.toastr.warning('Nenhum perfil selecionado!', 'Info!', { progressBar: true });
    }
  }
}
