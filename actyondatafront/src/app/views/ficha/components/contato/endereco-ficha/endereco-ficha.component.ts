import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EnderecoService } from 'src/app/shared/services/ficha/dados-pessoais/endereco.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cepModel } from 'src/app/shared/models/cep-modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';

@Component({
  selector: 'app-endereco-ficha',
  templateUrl: './endereco-ficha.component.html',
  styleUrls: ['./endereco-ficha.component.scss']
})
export class EnderecoFichaComponent implements OnInit {
  private dadosLS = JSON.parse(localStorage.getItem('dados'));
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  public listaEnderecos;
  public title: string;
  public colorModal: string;
  public campos_invalidos: boolean = false;
  public editar: boolean = false;
  public cep = new cepModel();
  public formEndereco: FormGroup;
  public retornoMensagem;
  public endereco;
  public dadosEndereco;
  public endereco_exclusao;
  public moduleLoading: boolean;

  cepMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private enderecoService: EnderecoService,
    private modalService:    NgbModal,
    private fb:              FormBuilder,
    private toastr:          ToastrService,
    private retornoCep:      ConsultaCepService,
  ) { }

  ngOnInit() {
    this.getEnderecos();
    this.validarFormCliente();
    this.dtOptions = {
      "ordering": true,
      "order": [[4, "desc"]],  //Se quiser ordenar basta descomentar esse campo 
      "paging": false,
      "searching": false
    };
    this.dtTrigger.next();
  }

  private validarFormCliente() {
    this.formEndereco = this.fb.group({
      ENDERECO_ID: [''],
      CEP:         ['', [Validators.required, Validators.minLength(8)]],
      ENDERECO:    ['', [Validators.required]],
      NUMERO:      ['', [Validators.required]],
      COMPLEMENTO: ['', [Validators.maxLength(20)]],
      BAIRRO:      ['', [Validators.required]],
      CIDADE:      ['', [Validators.required]],
      UF:          ['', [Validators.required]]
    });
  }

  public getEnderecos(): void {
    this.enderecoService.listarEnderecos(this.dadosLS[0].devedor_id).subscribe(res => {
      this.listaEnderecos = res;
    });
  }

  public openModalCadastrar(content) {
    this.validarFormCliente();
    this.title            = 'Cadastrar';
    this.colorModal       = '#27ae60';
    this.campos_invalidos = false;
    this.editar           = false;
    this.cep.endereco     = null;
    this.cep.bairro       = null;
    this.cep.cidade       = null;
    this.cep.complemento  = null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
  }

  public selecionarLinha(dados): void {
    this.dadosEndereco = dados;
    this.endereco = dados.ENDERECO_ID;
  }

  public salvarEndereco(): void {
    this.moduleLoading = true;
    this.enderecoService.gravarEndereco(this.formEndereco.value, this.dadosLS[0].devedor_id).subscribe(res => {
      if (res.Success === true) {
        
        this.moduleLoading    = false;
        this.campos_invalidos = false;
        this.getEnderecos();
        this.validarFormCliente();

        if (this.editar === true) {
          this.modalService.dismissAll();
          this.toastr.success("Endereço editado com sucesso.", "Sucesso!", { progressBar: true });
        } else {
          this.toastr.success("Endereço cadastrado com sucesso.", "Sucesso!", { progressBar: true });
        }

      } else {
        this.campos_invalidos = true;
        this.moduleLoading    = false;
        this.retornoMensagem  = res.Data;
      }
    });
  }

  public modalEditar(content) {
    if (this.dadosEndereco) {
      this.editar = true;
      this.title = 'Editar';
      this.colorModal = '#466eb0';

      this.cep.endereco    = this.dadosEndereco.ENDERECO;
      this.cep.complemento =  this.dadosEndereco.COMPLEMENTO;
      this.cep.bairro      =  this.dadosEndereco.BAIRRO;
      this.cep.cidade      =  this.dadosEndereco.CIDADE;
      this.cep.uf          =  this.dadosEndereco.UF;

      this.formEndereco.patchValue({
        ENDERECO_ID:  this.dadosEndereco.ENDERECO_ID,
        CEP:          this.dadosEndereco.CEP,
        // ENDERECO:     this.dadosEndereco.ENDERECO,
        NUMERO:       this.dadosEndereco.NUMERO,
        // COMPLEMENTO:  this.dadosEndereco.COMPLEMENTO,
        // BAIRRO:       this.dadosEndereco.BAIRRO,
        // CIDADE:       this.dadosEndereco.CIDADE,
        // UF:           this.dadosEndereco.UF
      });

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg',  backdrop: 'static' });
    } else {
        this.toastr.warning("Nenhum Endereço selecionado!", "Info!", { progressBar: true });
    }
  }

  public moodalExcluirEndereco(content): void {
    if (this.dadosEndereco) {
      this.endereco_exclusao = this.dadosEndereco.ENDERECO;
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title",  backdrop: 'static' }).result.then(
        result => {
          this.enderecoService.excluirEndereco(this.dadosLS[0].devedor_id, this.dadosEndereco.ENDERECO_ID).subscribe(res => {
            this.dadosEndereco = null;
            this.getEnderecos();
            this.toastr.success("Endereço excluso com sucesso.", "Sucesso!", { progressBar: true });
          });
        },
        reason => {
          console.log(`Dismissed with: ${reason}`);
        }
      );
    } else {
      this.toastr.warning("Nenhum Endereço selecionado!", "Info!", { progressBar: true });
    }
  }

  public preencherEndereco(cep) {
    this.retornoCep.consultarCep(cep).then(
      (cep: cepModel) => {
        this.cep = cep;
      }
    );
  }

}
