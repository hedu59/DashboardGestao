import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { PermissaoService } from 'src/app/shared/services/seguranca/permissao/permissao.service';
import { PermissaoModel } from 'src/app/shared/models/seguranca/permissao/permissao-model';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.scss']
})
export class PermissaoComponent implements OnInit {

  dtTriggerPermissao: Subject<any> = new Subject();
  dtOptionsP: DataTables.Settings = {};
  public permissao: PermissaoModel[];
  
  constructor(
    private permissaoService: PermissaoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {  
    this.dtOptionsP = {
      pageLength: 5
      // "order": [[ 3, "desc" ]] Se quiser ordenar basta descomentar esse campo
    };
  }

  public getPermissao(idPerfil: number){

    let table = $('#tabelaPermissao').DataTable();
    table.clear();
    table.destroy();
    if (1==1) {
      this.permissaoService.getPermissao(idPerfil).subscribe(res =>{ this.permissao = res; this.dtTriggerPermissao.next();
      });    
    }  
  }

  public teste(a: number){
    console.log(a);
  }

  public getPermissaoTela(idPerfil: number, idTela: number){

    console.log(idPerfil,idTela);
    let table = $('#tabelaPermissao').DataTable();
    table.clear();
    table.destroy();
    if (1==1) {
      this.permissaoService.getPermissaoTela(idPerfil,idTela).subscribe(
        res =>{ 
          this.permissao = res; 
          this.dtTriggerPermissao.next();
          console.log(res);
      });    
    }  
  }

  public alterarPermissao(dados){

    this.permissaoService.alterarPermissao(dados).subscribe(
      res=>{ 
        this.getPermissao(dados.ID_PERFIL), 
        this.toastr.success('Alterado com sucesso', 'Info!', { progressBar: true }); },
      error=>{

      }
      );
    console.log(dados);
  }

  
}
