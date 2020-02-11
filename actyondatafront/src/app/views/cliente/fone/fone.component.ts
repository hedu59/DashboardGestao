import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { FoneService } from "src/app/shared/services/cliente/fone.service";
import { FoneModel } from "src/app/shared/models/cliente/Fone-Model";
import { TipoFoneModel } from "src/app/shared/models/TipoFoneModel";

@Component({
  selector: "app-fone",
  templateUrl: "./fone.component.html",
  styleUrls: ["./fone.component.scss"]
})
export class FoneComponent implements OnInit {
  // VARIAVEIS
  public dtTriggerFone: Subject<any> = new Subject();
  public dtOptions: DataTables.Settings = {};

  public formTelefone: FormGroup;
  public fonesCliente;
  public fone_exclusao;
  public retornoMensagem;
  public campos_invalidos = false;
  public devedor_id: any = "";
  public nome_cliente: any = "";
  public title: string = "";
  public colorModal;
  public tipoFone: TipoFoneModel;
  public foneValido: boolean = false;
  public idModal;
  // FIM DAS VARIAVEIS

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private foneService: FoneService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.validarForm();

    this.dtOptions = {
      pageLength: 3
      // "order": [[ 3, "desc" ]] Se quiser ordenar basta descomentar esse campo
    };
    this.listarFones(localStorage.getItem("devedor_id"));

    this.getTipoFone();

  }

  public getTipoFone() {
    this.foneService.getTipFone().subscribe(res => {
      this.tipoFone = res
    })
  }

  validarForm() {
    this.formTelefone = this.fb.group({
      TIPO: ["C"],
      FONE: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      FONE_AUXILIAR: '',
      STATUS: [0],
      SE_WHATSAPP: [0],
      PRIORITARIO: [1],
      OBSE: [""]
    });
  }

  public validaTelefone() {
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

  salvarTelefone() {
    let devedor_id = localStorage.getItem("devedor_id");
    this.foneService.salvarFone(this.formTelefone.value, devedor_id).subscribe(res => {
      this.listarFones(devedor_id);

      if (res.Success === true) {
        this.formTelefone.reset();
        this.campos_invalidos = false;
        this.validarForm();
        if (this.idModal) {
          this.modalService.dismissAll();
          this.toastr.success("Telefone editado.", "Sucesso!", { progressBar: true });
        } else {
          this.toastr.success("Telefone cadastrado.", "Sucesso!", { progressBar: true });
        }
      } else {
        this.retornoMensagem = res.Data;
        this.campos_invalidos = true;
        this.toastr.error("Campos invalidos ", "Error!", { progressBar: true });
      }
    });
  }

  editarFone(telefoneModal, dados: FoneModel, content) {
    this.idModal = content;
    this.title = "Editar";
    this.colorModal = '#466eb0';
    this.campos_invalidos = false;
    const index = this.fonesCliente.indexOf(dados);
    const foneSelecionado = this.fonesCliente[index];
    let prioritario;
    if (foneSelecionado.PRIORITARIO == true) {
      prioritario = '1';
    } else {
      prioritario = '0';
    }

    this.modalService.open(telefoneModal, { ariaLabelledBy: "modal-basic-title", size: "lg", backdrop: 'static' });
    let foneAux = foneSelecionado.FONE;
    this.formTelefone.patchValue({
      TIPO: foneSelecionado.TIPO,
      FONE: foneSelecionado.FONE,
      FONE_AUXILIAR: foneAux,
      STATUS: foneSelecionado.STATUS,
      SE_WHATSAPP: foneSelecionado.SE_WHATSAPP,
      PRIORITARIO: prioritario,
      OBSE: foneSelecionado.OBSE
    });
  }

  excluirFone(content, fone) {
    this.fone_exclusao = fone;
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", backdrop: 'static' }).result.then(
      result => {
        this.foneService.excluirFone(fone, localStorage.getItem("devedor_id")).subscribe(res => {
          this.listarFones(localStorage.getItem("devedor_id"));
          this.toastr.success("Telefone excluso com sucesso.", "Sucesso!", { progressBar: true });
        });
      },
      reason => {
        console.log(`Dismissed with: ${reason}`);
      }
    );
  }

  public listarFones(devedor_id) {
    let table = $("#tabelaFone").DataTable();
    table.clear();
    table.destroy();
    if (devedor_id) {
      this.devedor_id = localStorage.getItem("devedor_id");
      this.nome_cliente = localStorage.getItem("nome_cliente");
      this.foneService.listarFones(devedor_id).subscribe(res => {
        this.fonesCliente = res;
        this.dtTriggerFone.next();
      });
    }
  }

  // ABRIR MODAL DE CADASTRO
  open(content) {
    if (localStorage.getItem('devedor_id')) {
      this.colorModal = '#27ae60';
      this.title = "Cadastrar";
      this.idModal = '';
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg", backdrop: 'static' });
      this.formTelefone.reset();
      this.campos_invalidos = false;
      this.validarForm();
    } else {
      this.toastr.warning("Não é possivel cadastrar o fone.", "Cliente não cadastrado!", { progressBar: true });
    }
  }

  cnvertTipo(valor) {
    if (valor === true) {
      return "Sim";
    } else {
      return "Não";
    }
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

}
