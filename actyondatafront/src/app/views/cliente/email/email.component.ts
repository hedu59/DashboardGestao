import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from "rxjs";
import { EmailService } from 'src/app/shared/services/cliente/email.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTriggerEmail: Subject<any> = new Subject();
  formEmail: FormGroup;
  @Input() idCliente: string;
  public devedor_id: any = "";
  public nome_cliente: any = "";
  emailsCliente;
  email_exclusao;
  retornoMensagem;
  editar = false;
  campos_invalidos = false;
  public title: string;
  public colorModal;
  idModal;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private emailService: EmailService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 3,
      // "order": [[ 3, "desc" ]] Se quiser ordenar basta descomentar esse campo
    };

    this.listarEmail(localStorage.getItem('devedor_id'))
    this.validaForm();
  }

  validaForm() {
    this.formEmail = this.fb.group({
      EMAIL_ID: [''],
      SITUACAO: ['P'],
      TIPO: ['D'],
      EMAIL: ['', [Validators.email]]
    });
  }

  open(content) {
    if (localStorage.getItem('devedor_id')) {
      this.title = 'Cadastrar';
      this.colorModal = '#27ae60';
      this.campos_invalidos = false;
      this.validaForm();
      this.idModal = '';
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
    } else {
      this.toastr.warning("Não é possivel cadastrar e-mail.", "Cliente não cadastrado!", { progressBar: true });
    }
  }

  listarEmail(devedor_id) {
    let table = $("#tabelaEmail").DataTable();
    table.clear();
    table.destroy();
    if (devedor_id) {
      this.devedor_id = localStorage.getItem("devedor_id");
      this.nome_cliente = localStorage.getItem("nome_cliente");
      this.emailService.listarEmail(devedor_id).subscribe(res => {
        this.emailsCliente = res;
        this.dtTriggerEmail.next();
      });
    }
  }

  salvarEmail() {
    this.emailService.salvarEmail(this.formEmail.value, localStorage.getItem("devedor_id")).subscribe(res => {
      this.listarEmail(localStorage.getItem('devedor_id'))
      if (res.Success === true) {
        this.campos_invalidos = false;
        this.formEmail.reset();
        this.validaForm();
        if (this.idModal) {
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

  public editarEmail(emailModal, dados, content) {
    const index = this.emailsCliente.indexOf(dados);
    const emailSelecionado = this.emailsCliente[index];
    this.idModal = content;
    this.editar = true;
    this.title = 'Editar';
    this.colorModal = '#466eb0';
    this.modalService.open(emailModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
    let situacao;
    switch (emailSelecionado.SITUACAO) {
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

    let tipo;
    switch (emailSelecionado.TIPO) {
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
      EMAIL_ID: emailSelecionado.EMAIL_ID,
      SITUACAO: situacao,
      EMAIL: emailSelecionado.EMAIL,
      TIPO: tipo
    })
  }

  public excluirEmail(confirmModal, email_id, email) {
    this.email_exclusao = email;
    this.modalService.open(confirmModal, { ariaLabelledBy: "modal-basic-title", backdrop: 'static' }).result.then(
      result => {
        this.emailService.excluirEmail(localStorage.getItem('devedor_id'), email_id).subscribe(res => {
          this.listarEmail(localStorage.getItem("devedor_id"));
          this.toastr.success("E-mail excluso com sucesso.", "Sucesso!", { progressBar: true });
        });
      },
      reason => {
        console.log(`Dismissed with: ${reason}`);
      }
    );
  }


}
