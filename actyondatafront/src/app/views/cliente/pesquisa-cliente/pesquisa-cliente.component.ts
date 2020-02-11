import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { PesquisaService } from 'src/app/shared/services/pesquisa_cliente/pesquisa.service';
import { ContratanteModel } from 'src/app/shared/models/contratante-model';
import { ListDevedor } from 'src/app/shared/models/pesquisa-cliente/clienteCommandResultModel';
import { ListTitulo, TitulosClienteModel } from 'src/app/shared/models/pesquisa-cliente/titulos-cliente-model';
import { FoneModel } from 'src/app/shared/models/cliente/fone-model';
import { EmailModel } from 'src/app/shared/models/cliente/Email-Model';
import { DadosPessoaisModel } from 'src/app/shared/models/pesquisa-cliente/dados-pessoais-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa-cliente',
  templateUrl: './pesquisa-cliente.component.html',
  styleUrls: ['./pesquisa-cliente.component.scss']
})

export class PesquisaClienteComponent implements OnInit {
  public formPesquisa: FormGroup;
  public contratantes: ContratanteModel;
  public mostrarTabelas: Boolean = false;
  // dtOptions: DataTables.Settings = {};
  public dtOptions: any = {};
  public dtOptionsTitulos: any = {};
  public dtTrigger: Subject<any> = new Subject();
  public dtTriggerFone: Subject<any> = new Subject();
  public dtTriggerAcionamentos: Subject<any> = new Subject();
  public dtTriggerEmail: Subject<any> = new Subject();
  public dtTriggerDadosPessoais: Subject<any> = new Subject();
  // dtOptionsTitulos: DataTables.Settings = {};
  public retornoPesquisa: ListDevedor;
  public titulosCliente;
  public titulosAux;
  public titulosClienteFiltro: Array<TitulosClienteModel[]> = [];
  public fonesCliente: FoneModel;
  public emailsCliente: EmailModel;
  public dadosPessoais: DadosPessoaisModel
  public acionamentos;
  public tamanho: number = 55;
  public linha: number;
  public loading: boolean;
  public loadingText: string;

  constructor(
    private fb: FormBuilder,
    private pesquisaService: PesquisaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  validarFormularioPesquisa(): void {
    this.formPesquisa = this.fb.group({
      contratante: [''],
      tipoPesquisa: ['3'],
      dadosPesquisa: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      dividaAtiva: ['true']
    })
  }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 3,
      "ordering": false,
    };

    this.dtOptionsTitulos = {
      pageLength: 3,
      "ordering": true,
    };
    this.validarFormularioPesquisa();
    this.getContratantes();

    let dadosLS = JSON.parse(localStorage.getItem('dadosPesquisa'));

    this.formPesquisa.patchValue({
      contratante: dadosLS[0].contratante,
      tipoPesquisa: dadosLS[0].tipoPesquisa,
      dadosPesquisa: dadosLS[0].dadosPesquisa,
      dividaAtiva: dadosLS[0].dividaAtiva
    });
    this.pesquisar();
  }

  getContratantes() {
    this.pesquisaService.getContratante().subscribe(data => {
      this.contratantes = data
    });
  }

  pesquisar(id_progressbar?) {
    if (this.formPesquisa.value.dadosPesquisa) {

      // id_progressbar.start();
      this.mostrarTabelas = false; // QUANDO CLICADO PARA FILTRAR É OCULTADO AS TABELAS
      this.loadingText = 'Pesquisando... ';
      this.loading = true;
      localStorage.setItem('abaAtiva', '0');

      // const dados = this.formPesquisa.value;
      const dados = [{
        'contratante': this.formPesquisa.value.contratante,
        'tipoPesquisa': this.formPesquisa.value.tipoPesquisa,
        'dadosPesquisa': this.formPesquisa.value.dadosPesquisa,
        'dividaAtiva': this.formPesquisa.value.dividaAtiva
      }];
      localStorage.setItem('dadosPesquisa', JSON.stringify(dados));

      this.pesquisaService.pesquisaCliente(this.formPesquisa.value).subscribe(res => {
        // id_progressbar.complete();
        this.retornoPesquisa = res.Data.ListDevedor;
        if (this.retornoPesquisa) {
          this.clienteSelecionado(this.retornoPesquisa[0].DEVEDOR_ID, this.retornoPesquisa[0].CONT_ID);
          this.mostrarTabelas = true;
          this.loading = false;
        } else {
          this.warningBar();
          this.loading = false;
          // id_progressbar.complete();
        }
      }, err => {
        this.loading = false;
      });
    }
  }

  public clienteSelecionado(DevedorId, ContId) {
    this.linha = DevedorId;
    let aba = localStorage.getItem('abaAtiva');
    $("#filtrarValor").prop("checked", false);
    localStorage.setItem('cliente_id', DevedorId.toString());
    localStorage.setItem('cont_id', ContId.toString());

    switch (aba) {
      case '0': {
        this.titulosCliente = null;
        this.listarTitulos(DevedorId, ContId);
        break;
      }
      case '1': {
        this.fonesCliente = null;
        this.listarFones(DevedorId);
        break;
      }
      case '2': {
        this.listarAcionamentos(DevedorId);
        break;
      }
      case '3': {
        this.fonesCliente = null;
        this.listarEmail(DevedorId);
        break;
      }
      case '4': {
        this.fonesCliente = null;
        this.listarDadosPessoais(DevedorId, ContId);
        break;
      }
    }

  }

  public editarCliente(DevedorId) {
    this.router.navigate(['cliente/editar', DevedorId]);
  }

  private listarTitulos(DevedorId: number, ContId: number) {

    let table = $('#dt').DataTable();
    table.destroy();

    $("#aaa > tbody > tr").on("click", function (e) {
      $('tr').removeClass("selected")
      $(this).addClass("add selected");
    });

    this.pesquisaService.listagemTitulos(DevedorId, ContId).subscribe(res => {
      this.titulosCliente = res.Data.ListTitulo;
      this.titulosAux = res.Data.ListTitulo;
      this.dtTrigger.next();
    });
  }


  private listarFones(DevedorId) {
    let table = $('#tabelaFone').DataTable();
    table.clear();
    table.destroy();
    this.pesquisaService.listagemFones(DevedorId).subscribe(fones => {
      this.fonesCliente = fones;
      this.dtTriggerFone.next();
    })
  }

  private listarAcionamentos(DevedorId) {
    let table = $('#tableAcionamentos').DataTable();
    table.clear();
    table.destroy();
    this.pesquisaService.acionamentos(DevedorId).subscribe(res => {
      this.acionamentos = res.Data;
      this.dtTriggerAcionamentos.next();
    })

  }

  private listarEmail(DevedorId) {
    let table = $('#tabelaEmail').DataTable();
    table.destroy();

    this.pesquisaService.listagemEmail(DevedorId).subscribe(emails => {
      this.emailsCliente = emails
      this.dtTriggerEmail.next();
    })
  }

  private listarDadosPessoais(DevedorId, ContId) {
    let table = $('#tableDadosPessoais').DataTable();
    table.destroy();
    this.pesquisaService.dadosPessooais(DevedorId, ContId).subscribe(dados => {
      this.dadosPessoais = null;
      this.dadosPessoais = dados.Data.ListDevedor;
      this.dtTriggerDadosPessoais.next();
    })
  }

  abaSelecionada() {
    let devedor_id = localStorage.getItem('cliente_id');
    this.clienteSelecionado(devedor_id, '');
  }

  warningBar() {
    this.toastr.warning('Nenhum cliente encontrado com os filtros escolhidos..', 'Dados invalidos!', { timeOut: 5000, closeButton: true, progressBar: true });
  }

  getColor(valor) {
    if (valor <= 0) {
      return '#da0000'
    }
  }

  cnvertTipo(valor) {
    if (valor === true || valor === 1) {
      return 'Sim'
    } else {
      return 'Não'
    }
  }

  // METODO PARA FILTRAR TITULOS NA TABELA COM VALOR MAIOS QUE 0 
  public filtrarValor() {
    this.titulosClienteFiltro = [];
    if ($("#filtrarValor").is(":checked") == true) {
      for (let i = 0; i < this.titulosCliente.length; i++) {
        if (this.titulosCliente[i].VALOR > 0) {
          this.titulosClienteFiltro.push(this.titulosCliente[i])
        }
      }
      this.carregarTitulosFiltrados();
    } else {
      this.titulosClienteFiltro = this.titulosAux;
      this.carregarTitulosFiltrados();
    }
  }

  // RECARREGA A TABELA DE TITULOS DE ACORDO COM A OPÇÃO SELECIONADA 
  carregarTitulosFiltrados() {
    let table = $('#dt').DataTable();
    table.destroy();

    this.titulosCliente = this.titulosClienteFiltro;
    this.dtTrigger.next();
  }

  // METODO PARA QUE O INPUT ACEITE SOMENTE NÚMEROS
  public somenteNumeros(e) {
    if (this.formPesquisa.value.tipoPesquisa != 3) {
      var charCode = e.charCode ? e.charCode : e.keyCode;
      if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
          return false;
        }
      }
    }
  }

  // CASO MUDE A OPÇÃO NO OPTION, O CAMPO DADOS DE PESQUISA É LIMPO
  public limpaCampos(valor) {
    this.formPesquisa.patchValue({
      dadosPesquisa: ['']
    });

    switch (valor) {
      case '1':
        // CPF
        this.tamanho = 14;
        break;
      case '2':
        // CODIGO DO CLIENTE
        this.tamanho = 8;
        break;
      case '3':
        // NOME DO CLIENTE
        this.tamanho = 55;
        break;
      case '4':
        // IDENTIFICADOR_ID
        this.tamanho = 17;
    }

  }

  public abrirFicha(devedor_id, cont_id) {
    localStorage.setItem('nome_fila', '');
    this.router.navigate(['ficha/fichaCobranca', devedor_id, cont_id]);
    localStorage.setItem('pesquisaFicha', 'sim');
  }


}
