import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoTituloModel } from 'src/app/shared/models/titulos/tipo-titulo-mode';
import { TituloService } from 'src/app/shared/services/cliente/titulo.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { TituloModel } from 'src/app/shared/models/titulos/titulo-modal';
import * as moment from 'moment';
import 'moment/min/locales';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.scss']
})

export class TitulosComponent implements OnInit {
  public tipoTitulo: TipoTituloModel;
  private formTitulo: FormGroup;
  public dtTituloOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public titulosCliente;
  public colorModal: string
  public title: string;
  public retornoMensagem;
  public campos_invalidos: boolean = false;
  private idModal;
  public titulo_exclusao; valor_exclusao; vencimento_exclusao;
  public titulosClienteFiltro;
  titulosAux;
  public tituloModel = new TituloModel();

  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private fb: FormBuilder,
    private tituloService: TituloService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {

    this.dtTituloOptions = {
      pageLength: 6,
      "order": [[1, "asc"], [4, "asc"]]  //Se quiser ordenar basta descomentar esse campo
    };
    this.validaFormTitulo();
    this.getTipoTitulo();

  }

  private validaFormTitulo() {
    this.formTitulo = this.fb.group({
      titulo_id: '',
      tipo_titulo: [0],
      numero_contrato: ['', [Validators.required]],
      numero_documento: [''],
      parcela: [''],
      plano: [''],
      vencimento: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      terceiro: '',
      valor_adicional_1: '',
      valor_adicional_2: '',
      observacao: ''
    });
  }

  private getTipoTitulo() {
    this.tituloService.getTipoTitulo().subscribe(res => {
      this.tipoTitulo = res;
    })
  }

  public gravarTitulo(id_progressbar) {
    /*VERIFICA SE É UMA DATA VALIDA*/
    const dataValida = moment(this.formTitulo.value.vencimento, "DD/MM/YYYY", false).isValid();
    if (dataValida == false) {
      this.toastr.error('A data inserida não é valida.', 'Data invalida!', { progressBar: true });
      return;
    }

    id_progressbar.start();
    this.tituloService.inserirTitulo(this.formTitulo.value).subscribe(
      res => {
        if (res.Success === true) {
          this.titulosClienteFiltro = []; // => Limpa a variavel que armazena o valor filtrado
          this.formTitulo.reset();
          this.validaFormTitulo();
          this.listagemTitulos();
          this.campos_invalidos = false;
          moment.locale('pt-BR');

          if (this.idModal) {
            this.modalService.dismissAll();
            this.toastr.success("Titulo alterado com sucesso.", "Sucesso!", { progressBar: true });
          } else {
            this.toastr.success('Titulo incluso com sucesso.', 'Sucesso!', { progressBar: true });
          }
          id_progressbar.complete();
          this.campos_invalidos = false;
        } else {
          id_progressbar.complete();
          this.campos_invalidos = true;
          this.retornoMensagem = res.Data;
          if (this.idModal) {
            this.toastr.error('Titulo não alterado, verifique os erros.', 'Erro!', { progressBar: true });
          } else {
            this.toastr.error('Titulo não cadastrado, verifique os erros.', 'Erro!', { progressBar: true });
          }
        }
      }, err =>  {
        console.log(err.error);
      });
  }

  public listagemTitulos() {
    let table = $('#tableTitulos').DataTable();
    table.destroy();
    this.tituloService.listagemTitulos().subscribe(res => {

      this.titulosCliente = res.Data.ListTitulo;
      this.titulosAux = res.Data.ListTitulo;

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

      // this.dtTrigger.next();
    });
  }

  open(content) {
    this.colorModal = '#27ae60';
    this.title = "Cadastrar";
    this.idModal = '';
    this.formTitulo.reset();
    this.validaFormTitulo();
    this.campos_invalidos = false;
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg", backdrop: 'static' });

  }

  public editarTitulo(content, dados) {
    const index = this.titulosCliente.indexOf(dados);
    const tituloSelecionado = this.titulosCliente[index];

    if (tituloSelecionado.VALOR <= 0) {
      this.toastr.warning("Titulo já baixado, não é possivel realizar a edição.", "TITULO BAIXADO!", { progressBar: true });
    } else {
      this.colorModal = '#466eb0';
      this.title = 'Editar';
      this.idModal = content;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });

      var data = tituloSelecionado.DATA_VENCIMENTO.split('-');
      data = data[2].substr(0, 2) + '/' + data[1] + '/' + data[0];

      this.formTitulo.patchValue({
        titulo_id: tituloSelecionado.TITULO_ID,
        tipo_titulo: tituloSelecionado.TIPO_TITULO_ID,
        numero_contrato: tituloSelecionado.NUMERO_CONTRATO,
        numero_documento: tituloSelecionado.NUMERO_DOCUMENTO,
        parcela: tituloSelecionado.NUMERO_PRESTACAO,
        plano: tituloSelecionado.QTDE_PRESTACAO,
        vencimento: data,
        valor: tituloSelecionado.VALOR,
        terceiro: tituloSelecionado.NOME_ALUNO,
        valor_adicional_1: tituloSelecionado.VALOR_ADICIONAL1,
        valor_adicional_2: tituloSelecionado.VALOR_ADICIONAL2,
        observacao: tituloSelecionado.OBSE
      });
    }

  }

  public excluirTitulo(content, titulo_id, valor, vencimento) {
    this.titulo_exclusao = titulo_id;
    this.valor_exclusao = valor;
    this.vencimento_exclusao = vencimento;

    if (valor <= 0) {
      this.toastr.warning("Titulo já baixado, não é possivel realizar a exclusão.", "TITULO BAIXADO!", { progressBar: true });
      return;
    }

    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", backdrop: 'static' }).result.then(result => {
      this.tituloService.excluirEmail(titulo_id).subscribe(res => {
        this.listagemTitulos();
        this.toastr.success("Titulo excluido com sucesso.", "Sucesso!", { progressBar: true });
      });
    },
      reason => {
        console.log(`Dismissed with: ${reason}`);
      }
    );
  }

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

  carregarTitulosFiltrados() {
    let table = $('#tableTitulos').DataTable();
    table.destroy();

    this.titulosCliente = this.titulosClienteFiltro;
    this.dtTrigger.next();
  }

  public getColor(valor) {
    if (valor <= 0) {
      return '#da0000'
    }
  }

}
