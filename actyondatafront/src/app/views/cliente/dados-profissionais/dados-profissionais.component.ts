import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DadosProfissionaisService } from "src/app/shared/services/cliente/dados-profissionais.service";
import { ToastrService } from "ngx-toastr";
import { PesquisaService } from "src/app/shared/services/pesquisa_cliente/pesquisa.service";
import { ListDevedor } from "src/app/shared/models/pesquisa-cliente/clienteCommandResultModel";

@Component({
  selector: "app-dados-profissionais",
  templateUrl: "./dados-profissionais.component.html",
  styleUrls: ["./dados-profissionais.component.scss"]
})
export class DadosProfissionaisComponent implements OnInit {
  public formDadoProfissionais: FormGroup;
  public devedor_id: string = "";
  public nome_cliente: string = "";

  constructor(
    private fb: FormBuilder,
    private dadosService: DadosProfissionaisService,
    private toastr: ToastrService,
    private pesquisa: PesquisaService
  ) { }

  ngOnInit() {
    this.formDadoProfissionais = this.fb.group({
      EMPRESA: [""],
      CARGO: [""],
      VALOR_RENDA: [null],
      CEP_EMPRESA: [""],
      ENDERECO_EMPRESA: [""],
      COMPLEMENTO_ENDERECO_EMPRESA: [""],
      NUMERO_EMPRESA: [""],
      BAIRRO_EMPRESA: [""],
      CIDADE_EMPRESA: [""],
      UF_EMPRESA: [""]
    });
    this.setCabecalho();
  }

  public salvar() {
    this.setCabecalho();
    this.dadosService.cadastrarDadosProfissionais(this.formDadoProfissionais.value).subscribe(
      res => {
        if (res.Success === true) {
          this.toastr.success("Dados profissionais atualizados com sucesso.", "Sucesso!", {
            progressBar: true
          });
        } else {
          this.toastr.error("Não foi possivel atualizar os dados .", "Erro!", { progressBar: true });
        }
      }, err => {
        this.toastr.error("Ocorreu um erro interno .", "Erro!", { progressBar: true});
      }
    )
  }

  private setCabecalho() {
    this.devedor_id = localStorage.getItem('devedor_id');
    this.nome_cliente = localStorage.getItem('nome_cliente');
  }

  public gatDados(devedor_id) {
    let valores = {
      contratante: '',
      tipoPesquisa: 2,
      dadosPesquisa: devedor_id,
      dividaAtiva: false
    }

    this.pesquisa.pesquisaCliente(valores).subscribe(res => {
      let devedor: ListDevedor = res.Data.ListDevedor[0];
      this.formDadoProfissionais.patchValue({
        EMPRESA: devedor.EMPRESA,
        CARGO: devedor.CARGO,
        VALOR_RENDA: 0,
        CEP_EMPRESA: '',
        ENDERECO_EMPRESA: devedor.ENDERECO_EMPRESA,
        COMPLEMENTO_ENDERECO_EMPRESA: devedor.COMPLEMENTO_ENDERECO_EMPRESA,
        NUMERO_EMPRESA: devedor.NUMERO_EMPRESA,
        BAIRRO_EMPRESA: devedor.BAIRRO_EMPRESA,
        CIDADE_EMPRESA: devedor.CIDADE_EMPRESA,
        UF_EMPRESA: devedor.UF_EMPRESA
      })
    });
  }

}
