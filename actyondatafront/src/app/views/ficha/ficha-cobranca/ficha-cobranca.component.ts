import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AcionamentoComponent } from '../components/dados-ficha/acionamento/acionamento.component';
import { ListDevedor } from 'src/app/shared/models/pesquisa-cliente/clienteCommandResultModel';
import { DadosPessoaisComponent } from '../components/dados-pessoais/dados-pessoais.component';
import { PesquisaService } from 'src/app/shared/services/pesquisa_cliente/pesquisa.service';
import { FoneFichaComponent } from '../components/contato/fone-ficha/fone-ficha.component';
import { TituloComponent } from '../components/dados-ficha/titulo/titulo.component';
import { ContratanteModel } from 'src/app/shared/models/contratante-model';
import { FichaService } from 'src/app/shared/services/ficha/ficha.service';
import { FichaModel } from 'src/app/shared/models/ficha/ficha-model';
import { DevedorEmFila } from 'src/app/shared/models/retorno/ficha/fila/Fila-model';

@Component({
    selector: 'app-ficha-cobranca',
    templateUrl: './ficha-cobranca.component.html',
    styleUrls: ['./ficha-cobranca.component.scss']
})

export class FichaCobrancaComponent implements OnInit {
    @ViewChild(AcionamentoComponent) alert: AcionamentoComponent;
    @ViewChild(DadosPessoaisComponent) private dadosPessoais: DadosPessoaisComponent;
    @ViewChild(FoneFichaComponent) private fone: FoneFichaComponent;
    @ViewChild(AcionamentoComponent) public acionamento: AcionamentoComponent;
    @ViewChild(TituloComponent) public titulo: TituloComponent;
    @ViewChild('t') teste: NgbTabset;
    @ViewChild('tabContato') foneTab: NgbTabset;
    @ViewChild('modalFila') modalFila;

    public dadosCliente: FichaModel = new FichaModel();
    public moduleLoading: boolean;
    public moduleLoadingPesquisa: boolean;
    public formPesquisa: FormGroup;
    public contratantes: ContratanteModel;
    public retornoPesquisa: ListDevedor;
    public qtdRegistros: number;
    public moduleLoadingFila: boolean;
    public title = 'Ficha';
    public resultFIla: DevedorEmFila;
    public temFila: boolean;
    public devedor_id;
    public nome_fila: string = localStorage.getItem('nome_fila');
    public pesquisaFicha: string;

    constructor(
        private fichaService: FichaService,
        private modalService: NgbModal,
        private router: ActivatedRoute,
        private fb: FormBuilder,
        private pesquisaService: PesquisaService,
        private toastr: ToastrService,
        private routerLink: Router
    ) { }

    ngOnInit() {
        this.preencherFicha();
        this.formPesquisa = this.fb.group({
            contratante: [''],
            tipoPesquisa: ['3'],
            dadosPesquisa: '',
            dividaAtiva: ['true']
        });
    }

    public getContratantes(): void {
        this.pesquisaService.getContratante().subscribe(data => {
            this.contratantes = data
        });
    }

    public preencherFicha(): void {
        this.moduleLoading = true; // INICIA O LOADING QUE FICA NO CENTRO DA TELA

        // RECEBE OS PARAMETROS DA URL
        this.router.params.subscribe((params: any) => {
            const devedor_id = params['id'];
            const cont_id = params['cont_id'];
            const dados = [{
                'devedor_id': devedor_id,
                'cont_id': cont_id
            }];
            this.devedor_id = devedor_id;
            localStorage.setItem('dados', JSON.stringify(dados));
            this.pesquisaFicha = localStorage.getItem('pesquisaFicha');         

            // SE TIVER DEVEDOR COMO PARAMETRO, É REALIZADO A PESQUISA PARA PREENCHER A FICHA
            if (devedor_id) {
                this.fichaService.getCliente(devedor_id, cont_id).subscribe(res => {
                    this.dadosCliente = res.Data.ListDevedor[0];
                    this.dadosPessoais.preencherDados(res.Data.ListDevedor[0]);
                    this.moduleLoading = false;
                    this.nome_fila = localStorage.getItem('nome_fila');
                });
            } else {
                this.moduleLoading = false;
                this.nome_fila = "";
                this.dadosCliente = new FichaModel();
                setTimeout(() => this.openModalFila());
                this.pesquisarFilaAtiva();
            }

        });
    }

    // ABRIR MODAL PARA PESQUISA DE CLIENTE
    public modalPesquisarCliente(content): void {
        this.getContratantes();
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
    }

    public openModalFila(): void {
        this.getContratantes();
        this.modalService.open(this.modalFila, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
    }

    // PESQUISAR DEVEDOR PARA PREENCHER MODAL
    public pesquisar(): void {
        this.moduleLoadingPesquisa = true;
        this.pesquisaService.pesquisaCliente(this.formPesquisa.value).subscribe(
            res => {
                this.retornoPesquisa = res.Data.ListDevedor;
                this.moduleLoadingPesquisa = false;
                this.qtdRegistros = Object.getOwnPropertyNames(this.retornoPesquisa).length;
                if (!this.retornoPesquisa) {
                    this.warningBar();
                }
            }, err => {
                this.warningBar();
                this.moduleLoadingPesquisa = false;
            }
        );
    }

    public warningBar(): void {
        this.toastr.warning('Nenhum cliente encontrado com os filtros escolhidos..', 'Dados invalidos!', { timeOut: 5000, closeButton: true, progressBar: true });
    }

    // APÓS PESQUISAR O DEVEDOR E CLICAR NO BOTÃO PARA ABRIR FICHA, EXECULTA ESSA FUNÇÃO PARA PREENCHER OS DADOS
    public abrirFicha(devedor_id, cont_id): void {
        this.routerLink.navigateByUrl('ficha/fichaCobranca/' + devedor_id + '/' + cont_id);
        this.teste.select('tab1');
        this.foneTab.select('tabFone');
        this.modalService.dismissAll();
        this.acionamento.listarAcionamentos(devedor_id);
        this.fone.getFone(devedor_id);
        // localStorage.setItem('fila_id', '0');
        localStorage.setItem('pesquisaFicha', 'sim');
    }

    public pesquisarFilaAtiva(): void {
        this.moduleLoadingFila = true;
        this.fichaService.getFilaAtiva().subscribe(
            res => {
                if (res.Success === true) {
                    this.resultFIla = res.Data.DevedorEmFila;
                    this.moduleLoadingFila = false;
                    this.temFila = true;
                } else {
                    this.moduleLoadingFila = false;
                    this.temFila = false;
                }
            }, err => {

            }
        );
    }

    public entrarNaFila(): void {
        this.routerLink.navigate(['ficha/fichaCobranca', this.resultFIla.DEVEDOR_ID, this.resultFIla.CONT_ID]);
        localStorage.setItem('fila_id', this.resultFIla.FILA_ID.toString());
        localStorage.setItem('nome_fila', this.resultFIla.NOME_FILA);
        localStorage.setItem('pesquisaFicha', 'nao');
        this.modalService.dismissAll();
    }

    atualizarFicha(respostaFilho) {
        this.foneTab.select('tabFone');
        this.acionamento.listarAcionamentos(respostaFilho);
        this.fone.getFone(respostaFilho);
    }

}