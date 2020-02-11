import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { clienteModel } from 'src/app/shared/models/cliente-model';
import { cepModel } from 'src/app/shared/models/cep-modal';
import { WizardComponent } from '../../../shared/components/form-wizard/wizard/wizard.component';
import { PesquisaService } from 'src/app/shared/services/pesquisa_cliente/pesquisa.service';
import { ClienteService } from 'src/app/shared/services/cliente/cliente.service';
import { ContratanteModel } from 'src/app/shared/models/contratante-model';
import { FoneComponent } from '../fone/fone.component';
import { EmailComponent } from '../email/email.component';
import { DadosProfissionaisComponent } from '../dados-profissionais/dados-profissionais.component';
import { TitulosComponent } from '../titulos/titulos.component';
import { ListDevedor } from 'src/app/shared/models/pesquisa-cliente/clienteCommandResultModel';
import * as moment from 'moment';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})


export class CadastrarComponent implements OnInit {
  // VIEW CHILD PARA TER ACESSO AOS METODOS DO WIZARD COMPONENT
  @ViewChild(WizardComponent) w: WizardComponent;
  @ViewChild(FoneComponent) foneComp: FoneComponent;
  @ViewChild(EmailComponent) emailComp: EmailComponent;
  @ViewChild(DadosProfissionaisComponent) dadosProf: DadosProfissionaisComponent;
  @ViewChild(TitulosComponent) titulosComp: TitulosComponent;

  public listagemContratantes: ContratanteModel;
  public formCliente: FormGroup;
  public cliente = new clienteModel();
  public cep = new cepModel();
  public nome: string = '';
  public devedor_id: any = '';
  public carregarDivTitulo: Boolean = false;
  public errosForm;

  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  cepMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private retornoCep: ConsultaCepService,
    private fb: FormBuilder,
    private pesquisa: PesquisaService,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.validarFormCliente();
    this.getContratante();
    this.deleteDevedorLS();
    this.atualizarForm();
  }

  /*
    SE TIVER O DEVEDOR_ID NA URL É REALIZADO A BUSCA DOS DADOS E PREENCHIDO O FORM
    O DEVEDOR_ID QUE ESTÁ NA URL É O QUE VEM DA TELA DE PESQUISA AO CLICAR NO BOTÃO DE EDITAR
  */
  private atualizarForm() {
    this.router.params.subscribe((params: any) => {
      const id = params['id'];

      if (params['id']) {
        let valores = {
          contratante: '',
          tipoPesquisa: 2,
          dadosPesquisa: id,
          dividaAtiva: false
        }

        this.pesquisa.pesquisaCliente(valores).subscribe(res => {
          let devedor: ListDevedor = res.Data.ListDevedor[0];

          this.setDevedorId(devedor.DEVEDOR_ID, devedor.NOME, devedor.CONT_ID);
          this.carregarDivTitulo = true;
          this.showTitulo();
          this.devedor_id = devedor.DEVEDOR_ID;
          this.titulosComp.listagemTitulos();
          this.nome = devedor.NOME;
          this.devedor_id = devedor.DEVEDOR_ID;

          this.formCliente.patchValue({
            cliente_id: devedor.DEVEDOR_ID,
            CONT_ID: devedor.CONT_ID,
            NOME: devedor.NOME,
            CPF: devedor.CPF,
            RG: devedor.RG,
            IDENTIFICADOR_ID: '',
            DATA_NASCIMENTO: this.convertDataBr(devedor.DATA_NASCIMENTO),
            SEXO: devedor.SEXO,
            CEP: devedor.CEP,
            ENDERECO: devedor.ENDERECO,
            NUMERO: devedor.NUMERO,
            COMPLEMENTO: devedor.COMPLEMENTO,
            BAIRRO: devedor.BAIRRO,
            CIDADE: devedor.CIDADE,
            UF: devedor.UF,
            NOME_CONJUGUE: devedor.NOME_CONJUGUE,
            NOME_PAI: devedor.NOME_PAI,
            NOME_MAE: devedor.NOME_MAE
          })
        });

      }
    })
  }

  // CONVERTER DATA PARA O PADRÃO BRASILEIRO DD/MM/AAAA
  convertDataBr(value) {
    if (value) {
      var data = value.split('-');
      return data[2].substr(0, 2) + '/' + data[1] + '/' + data[0];
    } else {
      return value;
    }
  }

  // FECHAR ALERT DE VALIDAÇÃO 
  closeAlertCard(alert) {
    this.errosForm.splice(this.errosForm.indexOf(alert), 1);
  }

  private validarFormCliente() {
    this.formCliente = this.fb.group({
      cliente_id: '',
      CONT_ID: [''],
      NOME: ['', [Validators.required, Validators.minLength(5)]],
      CPF: ['', [Validators.required, Validators.minLength(11)]],
      RG: '',
      IDENTIFICADOR_ID: '',
      DATA_NASCIMENTO: [''],
      SEXO: ['M'],
      CEP: ['', [Validators.required, Validators.minLength(8)]],
      ENDERECO: ['', [Validators.required]],
      NUMERO: ['', [Validators.required]],
      COMPLEMENTO: '',
      BAIRRO: ['', [Validators.required]],
      CIDADE: ['', [Validators.required]],
      UF: ['', [Validators.required]],
      NOME_CONJUGUE: '',
      NOME_PAI: '',
      NOME_MAE: ''
    });
  }

  // PEGAR LISTAGEM DE CONTRATANTES
  public getContratante(): void {
    this.pesquisa.getContratante().subscribe(dados => {
      this.listagemContratantes = dados;
    })
  }

  // METODO PARA PREENCHER O ENDEREÇO APÓS SAIR DO CAMPO CEP
  public preencherEndereco(ceps) {
    this.retornoCep.consultarCep(ceps).then(
      (cep: cepModel) => {
        this.cep = cep
      }
    );
  }

  // METODO PARA LIMPAR TODOS OS CAMPOS PARA UM NOVO CLIENTE
  public novoCliente() {
    this.route.navigate(['cliente/cadastrarCliente']);
    this.deleteDevedorLS()
    this.hideTitulo();
    this.carregarDivTitulo = false;
    this.formCliente.reset()
    this.nome = '';
    this.w.desableTabs();
    this.validarFormCliente()
  }

  public cadastrar(progressBar) {
    /*VERIFICA SE É UMA DATA VALIDA*/
    const dataValida = moment(this.formCliente.value.DATA_NASCIMENTO, "DD/MM/YYYY", false).isValid();
    if (this.formCliente.value.DATA_NASCIMENTO) {
      if (dataValida == false) {
        this.toastr.error('cadastro não realizado, DATA DE NASCIMENTO invalida.', 'Data invalida!', { progressBar: true });
        return;
      }
    }

    progressBar.start();
    this.clienteService.cadastrarCliente(this.formCliente.value).subscribe(
      res => {
        if (res.Success == true) {
          progressBar.complete();
          this.errosForm = null;
          this.setDevedorId(res.Data.Propriety, this.formCliente.value.NOME, this.formCliente.value.CONT_ID);
          this.devedor_id = res.Data.Propriety;
          this.toastr.success('Cliente cadastrado.', 'Sucesso!', { progressBar: true });
          this.nome = this.formCliente.value.NOME;
          this.foneComp.listarFones(res.Data.Propriety);
          this.carregarDivTitulo = true;
          this.showTitulo();
          this.titulosComp.listagemTitulos();
        } else {
          this.toastr.warning('Verifique o formulário de cadastro.', 'Cliente não cadastrado!', { progressBar: true });
          this.errosForm = res.Data;
          progressBar.complete();
        }
      },
      err => {
        progressBar.complete();
        this.errosForm = null;
        this.toastr.error('Ocorreu algum erro interno, entre em contato com o suporte.', 'Cliente não cadastrado!', { progressBar: true });
      }
    )
  }

  // METODO PARA QUE O INPUT ACEITE SOMENTE NÚMEROS
  public somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
      if (charCode < 48 || charCode > 57) {
        return false;
      }
    }
  }

  public editar(progressBar) {
    /*VERIFICA SE É UMA DATA VALIDA*/
    const dataValida = moment(this.formCliente.value.DATA_NASCIMENTO, "DD/MM/YYYY", false).isValid();
    if (this.formCliente.value.DATA_NASCIMENTO) {
      if (dataValida == false) {
        this.toastr.error('Alteração não realizada, DATA DE NASCIMENTO invalida.', 'Data invalida!', { progressBar: true });
        return;
      }
    }

    progressBar.start();
    this.clienteService.editarCliente(localStorage.getItem('devedor_id'), this.formCliente.value).subscribe(
      res => {
        if (res.Success == true) {
          progressBar.complete();
          this.errosForm = null;
          this.setDevedorId(localStorage.getItem('devedor_id'), this.formCliente.value.NOME, this.formCliente.value.CONT_ID);
          this.toastr.success('Alteração realizada.', 'Sucesso!', { progressBar: true });
          this.carregarDivTitulo = true;
          this.showTitulo();
          this.titulosComp.listagemTitulos();
        } else {
          this.toastr.error('Alteração não realizada.', 'Error!', { progressBar: true });
          this.errosForm = res.Data;
        }
      }, err => {
        this.errosForm = null;
        progressBar.complete();
        this.toastr.error('Ocorreu algum erro interno, entre em contato com o suporte.', 'Edição não realizada!', { progressBar: true });
      });
  }

  // METODOS QUE É EXECUTADO COM O CLICK NA PROXIMA ABA OU NO BOTÃO PROXIMO
  public onStep1Next(e, progressBar) {
    if (localStorage.getItem('devedor_id') === null) {
      this.cadastrar(progressBar)
    } else {
      this.editar(progressBar);
    }
    this.foneComp.listarFones(localStorage.getItem('devedor_id'));
  }

  onStep2Next(e) {
    this.emailComp.listarEmail(this.devedor_id);
  }

  onStep3Next(e) {
    this.dadosProf.gatDados(this.devedor_id);
  }

  onStep4Next(e) { }
  onComplete(e) { }

  private setDevedorId(devedor_id, nome, cont_id): void {
    localStorage.setItem('devedor_id', devedor_id);
    localStorage.setItem('nome_cliente', nome);
    localStorage.setItem('cont_id', cont_id);
  }

  private deleteDevedorLS(): void {
    localStorage.removeItem('devedor_id');
    localStorage.removeItem('nome_cliente');
    localStorage.removeItem('cont_id');
  }

  private hideTitulo() {
    $('#hideTitulo').hide();
  }

  private showTitulo() {
    $('#hideTitulo').show();
  }

  public verificaCpfExistente(cpf) {
    if (!this.nome) {
      let tamanho = cpf.length;
      let acpf = cpf;
      if (tamanho > 0) {
        if (tamanho < 14) {
          for (let index = tamanho; index < 14; index++) {
            acpf = '0' + acpf;
            tamanho++;
          }
        }
        this.clienteService.verificaCpf(acpf, this.formCliente.value.CONT_ID).subscribe(res => {
          if (res === true) {
            this.toastr.error('CPF já existe para o contratante selecionado.', 'CPF já cadastrado', { progressBar: true });
          }
        });
      }
    }

  }

  public onStep5Next(e) {

  }

}