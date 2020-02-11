import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { SearchService } from '../../../../services/search.service';
import { AuthService } from '../../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvatarUserService } from './avatar-user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContratanteModel } from 'src/app/shared/models/contratante/contrantates';


@Component({
  selector: 'app-header-sidebar-large',
  templateUrl: './header-sidebar-large.component.html',
  styleUrls: ['./header-sidebar-large.component.scss']
})
export class HeaderSidebarLargeComponent implements OnInit {

  notifications: any[];
  public usuario_logado: string;
  public dataIni: string;
  public dataFim: string;
  public contId: number;
  public fantasia: string;

  public listaImg;
  public nomeImg: string = 'user7';
  public formFiltro: FormGroup
  public listaContratante: ContratanteModel[];
  public idContratante;
  public contratanteValida;


  constructor(
    private navService: NavigationService,
    public searchService: SearchService,
    private auth: AuthService,
    private modalService: NgbModal,
    private avatarService: AvatarUserService,
    private fb: FormBuilder
  ) {
    this.notifications = [
      {
        icon: 'i-Speach-Bubble-6',
        title: 'New message',
        badge: '3',
        text: 'James: Hey! are you busy?',
        time: new Date(),
        status: 'primary',
        link: '/chat'
      },
      {
        icon: 'i-Receipt-3',
        title: 'New order received',
        badge: '$4036',
        text: '1 Headphone, 3 iPhone x',
        time: new Date('11/11/2018'),
        status: 'success',
        link: '/tables/full'
      }
    ];
  }


  public formData() {

    this.formFiltro = this.fb.group({
      contratanteId: "",
      dataInicial: "",
      dataFinal: ""
    })
  }


  ngOnInit() {
 
    //this.verificarObjetoContratanteFiltro();
    this.usuario_logado = localStorage.getItem('usuario_logado');
    this.formData();
    this.toggelSidebar();
    this.ObterContratantes();
    
  }

  // public verificarObjetoContratanteFiltro(){
  //   this.idContratante = JSON.parse(localStorage.getItem('contratanteId')).contratanteId
    
  //   if(this.idContratante == undefined){
  //      this.contratanteValida = JSON.stringify({contratanteId:"16",dataInicial:"2019-09-01",dataFinal:"2019-09-30"})
  //      localStorage.setItem('contratanteId', this.contratanteValida);
  //   }
  // }


  public ObterContratantes() {

    this.navService.getContrantes().subscribe(res => {
      this.listaContratante = res;
      this.idContratante = JSON.parse(localStorage.getItem('contratanteId')).contratanteId;
      this.fantasia = this.listaContratante.find(a => a.CONTRATANTE_ID == this.idContratante).FANTASIA;
      this.dataIni = JSON.parse(localStorage.getItem('contratanteId')).dataInicial;
      this.dataFim = JSON.parse(localStorage.getItem('contratanteId')).dataFinal;

      console.log(this.dataFim)
    })

  }

  public salvarFiltros() {

    localStorage.setItem('contratanteId', JSON.stringify(this.formFiltro.value)) 
    this.idContratante = JSON.parse(localStorage.getItem('contratanteId')).contratanteId;
    window.location.reload();
  }

  toggelSidebar() {
    const state = this.navService.sidebarState;
    if (state.childnavOpen && state.sidenavOpen) {
      return state.childnavOpen = false;
    }
    if (!state.childnavOpen && state.sidenavOpen) {
      return state.sidenavOpen = false;
    }
    if (!state.sidenavOpen && !state.childnavOpen) {
      state.sidenavOpen = true;
      setTimeout(() => {
        state.childnavOpen = false;
      }, 50);
    }
  }

  public modalConfig(content) {
    this.listaImg = this.avatarService.getImg();

    let dadosFiltro = JSON.parse(localStorage.getItem('contratanteId'))
    this.formFiltro.patchValue({
      contratanteId: dadosFiltro.contratanteId,
      dataInicial: dadosFiltro.dataInicial,
      dataFinal: dadosFiltro.dataFinal
    })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
  }

  setImg(nome) {
    this.nomeImg = nome;
  }

  signout() {
    this.auth.signout();
  }

}
