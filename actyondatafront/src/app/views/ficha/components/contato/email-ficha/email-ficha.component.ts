import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/shared/services/cliente/email.service';
import { ToastrService } from 'ngx-toastr';
import { EmailModel } from 'src/app/shared/models/cliente/Email-Model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-email-ficha',
  templateUrl: './email-ficha.component.html',
  styleUrls: ['./email-ficha.component.scss']
})

export class EmailFichaComponent implements OnInit {
  // ---------- VARIAVEIS -----------
  public listaEamils: EmailModel;
  public formEmail: FormGroup;
  public retornoMensagem;
  public editar: boolean = false;
  public campos_invalidos: boolean = false;
  public title: string;
  public colorModal: string;
  public dadosEmail: EmailModel;
  public email_exclusao: string;
  public linha: any;
  private dadosLS = JSON.parse(localStorage.getItem('dados'));
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  //------ FIM DAS VARIAVEIS --------

  constructor(
    private emailService: EmailService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.listarEmails();
    this.validaForm();

    this.dtOptions = {
      "ordering": true,
      "order": [[0, "asc"]],  //Se quiser ordenar basta descomentar esse campo 
      "paging": false,
      "searching": false
    };
  }

  validaForm() {
    this.formEmail = this.fb.group({
      EMAIL_ID: [''],
      SITUACAO: ['P'],
      TIPO: ['D'],
      EMAIL: ['', [Validators.email]]
    });
  }

  public listarEmails(): void {
    let table = $('#tabelaEmail').DataTable();
    table.destroy();
    this.emailService.listarEmail(this.dadosLS[0].devedor_id).subscribe(res => {
      this.listaEamils = res;
      this.dtTrigger.next();
    })
  }

  // ABRIR MODDAL DE CADASTRO
  openModalCadastrar(content): void {
    this.title = 'Cadastrar';
    this.colorModal = '#27ae60';
    this.campos_invalidos = false;
    this.editar = false;
    this.validaForm();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
  }

  // CADASTRAR EMAIL
  public salvarEmail(): void {
    this.emailService.salvarEmail(this.formEmail.value, this.dadosLS[0].devedor_id).subscribe(
      res => {
        this.listarEmails();
        if (res.Success === true) {
          this.campos_invalidos = false;
          this.formEmail.reset();
          this.validaForm();
          if (this.editar == true) {
            this.modalService.dismissAll();
            this.toastr.success("E-mail editado com sucesso.", "Sucesso!", { progressBar: true });
          } else {
            this.toastr.success("E-mail cadastrado com sucesso.", "Sucesso!", { progressBar: true });
          }
        } else {
          this.retornoMensagem = res.Data;
          this.campos_invalidos = true;
          this.toastr.error("Dados invalidos.", "Erro!", { progressBar: true });
        }
      });
  }

  public selecionarLinha(dados, e, index): void {
    this.dadosEmail = dados;
    this.linha = dados.EMAIL_ID;
  }

  public modalEditarEmail(content): void {
    if (this.dadosEmail) {
      this.editar = true;
      this.title = 'Editar';
      this.colorModal = '#466eb0';
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
      let situacao: string;
      switch (this.dadosEmail.SITUACAO) {
        case 'POSITIVO': {
          situacao = 'P'
          break;
        }
        case 'NEGATIVO': {
          situacao = 'N';
          break;
        }
        case 'NÃO CONFIRMADO': {
          situacao = 'C'
          break;;
        }
      }

      let tipo: string;
      switch (this.dadosEmail.TIPO) {
        case 'DEVEDOR':
          tipo = 'D'
          break;
        case 'ALUNO':
          tipo = 'L'
          break;
        case 'AVALISTA':
          tipo = 'A'
          break;

        default:
          tipo = 'C'
          break;
      }

      this.formEmail.patchValue({
        EMAIL_ID: this.dadosEmail.EMAIL_ID,
        SITUACAO: situacao,
        EMAIL: this.dadosEmail.EMAIL,
        TIPO: tipo
      })
    } else {
      this.toastr.warning("Nenhum E-mail selecionado!", "Info!", { progressBar: true });
    }

  }

  public moodalExcluirEmail(confirmModal) {
    if (this.dadosEmail) {
      this.email_exclusao = this.dadosEmail.EMAIL;
      this.modalService.open(confirmModal, { ariaLabelledBy: "modal-basic-title" }).result.then(
        result => {
          this.emailService.excluirEmail(this.dadosLS[0].devedor_id, this.dadosEmail.EMAIL_ID).subscribe(res => {
            this.dadosEmail = null;
            this.listarEmails();
            this.toastr.success("E-mail excluso com sucesso.", "Sucesso!", { progressBar: true });
          });
        },
        reason => {
          console.log(`Dismissed with: ${reason}`);
        }
      );
    } else {
      this.toastr.warning("Nenhum E-mail selecionado!", "Info!", { progressBar: true });
    }

  }

}
