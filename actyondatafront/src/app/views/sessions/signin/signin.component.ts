import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface Alert {
    type: string;
    message: string;
}

const ALERTS: Alert[] = [{
    type: 'success',
    message: 'This is an success alert',
}, {
    type: 'info',
    message: 'This is an info alert',
}, {
    type: 'warning',
    message: 'This is a warning alert',
}, {
    type: 'danger',
    message: 'This is a danger alert',
}, {
    type: 'primary',
    message: 'This is a primary alert',
}, {
    type: 'dark',
    message: 'This is a dark alert',
}
];

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    dadosValidos: Boolean = false;

    alerts;
    alertCards;
    mainAlert = true;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    validaFormLogin() {
        this.signinForm = this.fb.group({
            Nome: ['', Validators.required],
            Senha: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.validaFormLogin();

        this.alerts = [...ALERTS];
        this.alertCards = [...ALERTS];

        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Inicialiando Actyon WEB - Bem Vindo! ';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });


    }

    signin() {
        if (this.signinForm.invalid) {
            return;
        }

        this.loading = true;
        this.loadingText = 'Validado dados ...';
        this.auth.signin(this.signinForm.value.Nome, this.signinForm.value.Senha).then(
            val => {
                if (val === 'success') {
                    localStorage.setItem('usuario_logado', this.signinForm.value.Nome);

                    // let contratanteValida = JSON.stringify({contratanteId:"16",dataInicial:"2019-09-01",dataFinal:"2019-09-30"})
                    // localStorage.setItem('contratanteId', contratanteValida);

                    //this.router.navigateByUrl('dashboard/v1');
                } else {
                    this.warningBar();
                    this.dadosValidos = true;
                }
                this.loading = false;
            }
        )
    }

    closeAlertCard(alert: Alert) {
        this.alertCards.splice(this.alertCards.indexOf(alert), 1);
    }

    successBar() {
        this.toastr.success('Toastr success!', 'Toastr title', { timeOut: 3000, closeButton: true, progressBar: true });
    }
    warningBar() {
        this.toastr.warning('Por favor verifique seu usuário e senha.', 'Dados invalidos!', { timeOut: 3000, closeButton: true, progressBar: true });
    }
    infoBar() {
        this.toastr.info('Toastr info!', 'Toastr title', { timeOut: 3000, closeButton: true, progressBar: true });
    }
    errorBar() {
        this.toastr.error('Toastr error!', 'Toastr title', { timeOut: 3000, closeButton: true, progressBar: true });
    }

}
