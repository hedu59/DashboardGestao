import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAcaoCobrancaModel } from 'src/app/shared/models/retorno/ficha/acionamento/config-acao-cobranca-model';
import { AcionamentoService } from 'src/app/shared/services/ficha/dados-ficha/acionamento.service';
import { Subject } from 'rxjs';
import { FichaService } from 'src/app/shared/services/ficha/ficha.service';
import { DevedorEmFila } from 'src/app/shared/models/retorno/ficha/fila/Fila-model';
import { Router } from '@angular/router';
import { FoneFichaComponent } from '../../contato/fone-ficha/fone-ficha.component';
import { DataAcionamentoCadastro } from 'src/app/shared/models/retorno/ficha/acionamento/Inclusao-Acionamento';

@Component({
  selector: 'app-acionamento',
  templateUrl: './acionamento.component.html',
  styleUrls: ['./acionamento.component.scss']
})

export class AcionamentoComponent implements OnInit {
  // VARIAVEIS
  @ViewChild(FoneFichaComponent) private fone: FoneFichaComponent;

  public listaAcionamentos;
  public listaAcaoCobranca;
  public formAcionamento: FormGroup;
  public agendamento: boolean = false;
  private dadosLS = JSON.parse(localStorage.getItem('dados'));
  public configAcaoCobranca: ConfigAcaoCobrancaModel;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  public resultFIla: DevedorEmFila;
  public moduleLoading: boolean = false;
  public moduleLoadingTable: boolean = false;
  public veioDaPesquisa: string = localStorage.getItem('pesquisaFicha');
  public carregando: boolean = false;
  public retornoInclusao: DataAcionamentoCadastro[];
  public campos_invalidos: boolean = false;
  public dataInvalida: boolean = false;

  @Output() emitirDevedor = new EventEmitter();
  // FIM DAS VARIAVEIS

  constructor(
    private fb: FormBuilder,
    private acionamentoService: AcionamentoService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fichaService: FichaService,
    private routerLink: Router
  ) { }

  ngOnInit() {
    this.listarAcionamentos();
    this.validaForm();

    this.dtOptions = {
      "ordering": true,
      "order": [[0, "desc"], [1, "desc"]],  //Se quiser ordenar basta descomentar esse campo 
      "paging": false,
      "searching": false
    };
  }

  validaForm() {
    this.formAcionamento = this.fb.group({
      DATA: ['', [Validators.required]],
      ACAO_ID: ['', [Validators.required]],
      DESCRICAO: ['']
    });
  }

  public listarAcionamentos(devedor_id?) {
    let devedor;
    if (devedor_id) {
      devedor = devedor_id;
    } else {
      devedor = this.dadosLS[0].devedor_id;
    }

    // SÓ VAI PESQUISAR O ACIONAMENTO CASO TENHA O DEVEDOR_ID
    if (devedor) {
      let table = $('#tableAcionamento').DataTable();
      table.destroy();
      this.moduleLoadingTable = true;
      this.acionamentoService.acionamentos(devedor).subscribe(res => {
        this.moduleLoadingTable = false;
        if (res.Success === true) {
          this.listaAcionamentos = res.Data;
          this.dtTrigger.next();
        } else {
          this.listaAcionamentos = [];
        }
      }, err => {
        this.moduleLoadingTable = false;
      });
    }
  }

  public modalAcionamento(content): void {
    this.getAcaoCobranca();
    this.formAcionamento.reset();
    this.validaForm();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
  }

  public getAcaoCobranca(): void {
    this.carregando = true;
    this.acionamentoService.getAcaoCobranca(this.dadosLS[0].cont_id).subscribe(res => {
      this.listaAcaoCobranca = res;
      this.carregando = false;
    });
  }

  // VERIFICA SE A DATA DO PROX ACION É INFERIOR A DATA ATUAL
  public selectData(dataSelecionada) {
    let today = new Date();                        
    let dataAtual = today.toISOString().split('T')[0]; 

    if (dataSelecionada < dataAtual) { 
      this.retornoInclusao = [{ Propriety: 'MENSAGEM', Message: 'Data do próximo acionamento não pode ser inferior que a data atual' }];
      this.campos_invalidos = true;
      this.dataInvalida = true;
    } else {
      this.dataInvalida = false;
      this.campos_invalidos = false;
    }

  }

  // CARREGA AS CONFIGURAÇÕES DO ACIONAMENTO
  public loadConfigAcao() {
    this.acionamentoService.configAcaoCobranca(this.formAcionamento.value.ACAO_ID, this.dadosLS[0].cont_id).subscribe(res => {
      this.configAcaoCobranca = res[0];

      let today = new Date();
      today.setDate(today.getDate() + this.configAcaoCobranca.QTDE_DIAS_PROX_ACION);
      let data = today.toISOString().split('T')[0];

      this.formAcionamento.patchValue({
        DATA: data
      });

    });
  }

  public gravarAcionamento(): void {
    if (this.dataInvalida) {
      return;
    }

    if (this.configAcaoCobranca.SE_OBSE_OBRIG !== 'N') {
      if (!this.formAcionamento.value.DESCRICAO) {
        this.retornoInclusao = [{ Propriety: 'MENSAGEM', Message: 'Descrição é obrigatória' }];
        this.campos_invalidos = true;
        return;
      } else {
        this.campos_invalidos = false;
      }
    }

    this.moduleLoading = true;
    this.acionamentoService.gravarAcionamento(this.formAcionamento.value).subscribe(res => {
      if (res.Success === true) {
        this.campos_invalidos = false;
        this.toastr.success("Acionamento inserido com sucesso!", "Sucesso!", { progressBar: true });

        if (this.veioDaPesquisa !== 'sim') {
          this.fichaService.getFilaAtiva().subscribe(res => {
            this.resultFIla = res.Data.DevedorEmFila;
            if (res.Success === true) {
              this.emitirDevedor.emit(this.resultFIla.DEVEDOR_ID);
              localStorage.setItem('nome_fila', res.Data.DevedorEmFila.NOME_FILA);
              this.moduleLoading = false;
              this.routerLink.navigate(['ficha/fichaCobranca', this.resultFIla.DEVEDOR_ID, this.resultFIla.CONT_ID]);
              this.modalService.dismissAll();
              localStorage.setItem('pesquisaFicha', 'nao');
            } else {
              this.moduleLoading = false;
              this.modalService.dismissAll();
              this.routerLink.navigate(['ficha/fichaCobranca']);
            }
          });
        } else {
          this.listarAcionamentos();
          this.moduleLoading = false;
          this.modalService.dismissAll();
          this.formAcionamento.reset();
        }
      } else {
        this.retornoInclusao = res.Data;
        this.moduleLoading = false;
        this.campos_invalidos = true;
      }
    });
  }

}
