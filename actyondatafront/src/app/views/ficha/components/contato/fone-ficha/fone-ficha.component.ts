import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FoneService } from 'src/app/shared/services/cliente/fone.service';
import { FoneModel } from 'src/app/shared/models/cliente/Fone-Model';
import { TipoFoneModel } from 'src/app/shared/models/TipoFoneModel';

@Component({
  selector: 'app-fone-ficha',
  templateUrl: './fone-ficha.component.html',
  styleUrls: ['./fone-ficha.component.scss']
})

export class FoneFichaComponent implements OnInit {
  // VERIAVEIS
  public listaFones: FoneModel;
  public devedor_id: number;
  public title: string = "Cadastrar";
  public colorModal = '#27ae60';
  public tipoFone: TipoFoneModel;
  public formTelefone: FormGroup;
  public campos_invalidos;
  public retornoMensagem;
  public dadosFone;
  public foneAux: string;
  public fone_exclusao: string;
  public editar: boolean;
  public foneValido: boolean = false;
  public linha: string;
  public moduleLoading: boolean = false;
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject();
  private percFone;
  private dadosLS = JSON.parse(localStorage.getItem('dados'));
  @Input() recebeDevedor;
  // FIM DAS VARIAVEIS

  constructor(
    private foneService: FoneService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    localStorage.setItem('fone_selecionado', '');
    this.getFone();
    this.validarForm();
    this.getTipoFone();
    this.dtOptions = {
      "order": [4, "desc"],  //Se quiser ordenar basta descomentar esse campo 
      "paging": false,
      "searching": false
    };
  }

  validarForm() {
    this.formTelefone = this.fb.group({
      TIPO: ["C"],
      FONE: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      FONE_AUXILIAR: '',
      STATUS: [0],
      SE_WHATSAPP: [0],
      PRIORITARIO: [1],
      OBSE: [""],
      LOCALIZACAO: ['']
    });
  }

  public getFone(devedor_id?): void {
    this.moduleLoading = true;
    let d;
    if (devedor_id) {
      d = devedor_id;
    } else {
      d = this.dadosLS[0].devedor_id
    }
    // SÓ VAI PESQUISAR O TELEFONE CASO TENHA O DEVEDOR_ID
    if (d) {
      let table = $('#tabelaFone').DataTable();
      table.destroy();
      this.foneService.listarFones(d).subscribe(res => {
        this.listaFones = res;
        this.dtTrigger.next();
      })
    }
    this.moduleLoading = false;
  }

  public getTipoFone(): void {
    this.foneService.getTipFone().subscribe(res => {
      this.tipoFone = res
    })
  }

  cnvertTipo(valor): string {
    if (valor === true) {
      return "Sim";
    } else {
      return "Não";
    }
  }

  // METODO PARA QUE O INPUT ACEITE SOMENTE NÚMEROS
  public somenteNumeros(e): boolean {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
      if (charCode < 48 || charCode > 57) {
        return false;
      }
    }
  }

  public openModalCadastrar(content): void {
    this.colorModal = '#27ae60';
    this.title = "Cadastrar";
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg", backdrop: 'static' });
    this.formTelefone.reset();
    this.editar = false;
    this.validarForm();
  }

  salvarTelefone(): void {

    if (this.formTelefone.value.LOCALIZACAO < this.percFone) {
      this.toastr.warning("O percentual do fone não pode ser inferior ao cadastrado!", "Info!", { progressBar: true });
      this.formTelefone.patchValue({
        LOCALIZACAO: this.percFone
      });
      return;
    }

    this.foneService.salvarFone(this.formTelefone.value, this.dadosLS[0].devedor_id).subscribe(res => {
      this.getFone();

      if (res.Success === true) {
        this.formTelefone.reset();
        this.campos_invalidos = false;
        this.validarForm();
        this.modalService.dismissAll();

        this.editar == true ? this.toastr.success("Telefone edicado.", "Sucesso!", { progressBar: true }) : this.toastr.success("Telefone cadastrado.", "Sucesso!", { progressBar: true });

      } else {
        this.retornoMensagem = res.Data;
        this.campos_invalidos = true;
        this.toastr.error("Campos invalidos ", "Error!", { progressBar: true });
      }
    });
  }

  public selecionarLinha(dados): void {
    this.dadosFone = dados;
    this.foneAux = dados.FONE;
    this.linha = dados.FONE;
    this.percFone = dados.PERCENTUAL_LOCALIZACAO;
    localStorage.setItem('fone_selecionado', dados.FONE);
  }

  public modalEditarFone(content): void {
    this.foneValido = true;
    if (this.dadosFone) {
      this.title = "Editar";
      this.colorModal = '#466eb0';
      this.campos_invalidos = false;
      this.editar = true;
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg", backdrop: 'static' });

      let prioritario;
      if (this.dadosFone.PRIORITARIO == true) {
        prioritario = '1'
      } else {
        prioritario = '0'
      }

      let fone2 = this.dadosFone.FONE;
      this.formTelefone.patchValue({
        TIPO: this.dadosFone.TIPO,
        FONE: this.dadosFone.FONE,
        FONE_AUXILIAR: fone2,
        STATUS: this.dadosFone.STATUS,
        SE_WHATSAPP: this.dadosFone.SE_WHATSAPP,
        PRIORITARIO: prioritario,
        OBSE: this.dadosFone.OBSE,
        LOCALIZACAO: this.dadosFone.PERCENTUAL_LOCALIZACAO
      });

    } else {
      this.toastr.warning("Nenhum fone selecionado!", "Info!", { progressBar: true });
    }
  }

  public moodalExcluirFone(content): void {
    if (this.dadosFone) {
      this.fone_exclusao = this.dadosFone.FONE;
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", backdrop: 'static' }).result.then(
        result => {
          this.foneService.excluirFone(this.dadosFone.FONE, this.dadosLS[0].devedor_id).subscribe(res => {
            this.getFone();
            this.toastr.success("Telefone excluso com sucesso.", "Sucesso!", { progressBar: true });
            this.dadosFone = '';
            this.foneAux = '';
          });
        },
        reason => {
          console.log(`Dismissed with: ${reason}`);
        }
      );
    } else {
      this.toastr.warning("Nenhum fone selecionado!", "Info!", { progressBar: true });
    }

  }

  public validaTelefone(): void {
    let tipo = this.formTelefone.value.TIPO;
    let fone = this.formTelefone.value.FONE;
    let whats = this.formTelefone.value.SE_WHATSAPP;
    let tamanho = fone.length;
    if (tipo == 'C' || tipo == 'N' || tipo == 'U' || tipo == 'V') {
      if (tamanho == 11 && fone.substr(2, 1) == 9) {
        this.foneValido = true;
      }
      else {
        this.foneValido = false;
        return;
      }
    }
    if (tipo == 'R' || tipo == 'A' || tipo == 'B' || tipo == 'Z' || tipo == 'X' || tipo == 'E' || tipo == '0' || tipo == 'S') {
      if (tamanho == 10) {
        this.foneValido = true;
      } else {
        this.foneValido = false;
        return;
      }
    }
    if (whats == 1 && tamanho == 11 && fone.substr(2, 1) == 9) {
      this.foneValido = true;
    }

  }

  public corStatus(tipo): string {
    if (tipo == 0) {
      return 'black';
    }
    if (tipo == 1) {
      return 'red';
    }
    if (tipo == 2) {
      return '#FFC107';
    }
  }

  public enviarSms(): void {
    this.foneService.enviarSMS();
  }

}
