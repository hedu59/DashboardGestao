import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { TokenModel } from "../models/login/token.model";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  // Variavel que identifica se está logado
  authenticated = true;
  private host: string;

  constructor(
    private store: LocalStoreService,
    private router: Router,
    private http: HttpClient
  ) {
    this.checkAuth();
    this.host = environment.host;
  }

  checkAuth() {
    let a = this.store.getItem("token");
    if (!a) {
      this.signout();
    }
  }

  getuser() {
    return of({});
  }

  signin(OPERADOR_ID: string, SENHA_WEB: string) {

    return this.http.post<TokenModel>(this.host+'Token', {OPERADOR_ID, SENHA_WEB} ).toPromise().then(
      res => {
        this.authenticated = true;
        this.store.setItem("token", res.token.toString());
        this.store.setItem("operador_id", res.operadorId);
        this.router.navigateByUrl('auth/ramal');
        return 'success'
      },
      err => {
        return  'error'
        // err.error.Message
      });

  }

  getToken() {

  }

  signout() {
    this.authenticated = false;
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigateByUrl("/sessions/signin");
  }
}
