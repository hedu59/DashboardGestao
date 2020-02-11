import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ContratanteModel } from '../models/contratante/contrantates';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private token = localStorage.getItem('token').replace(/["|']/g, "");
    private host: string;
    private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Accept', 'application/json')
    .append('Authorization', 'bearer ' + this.token);


    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    constructor(private http: HttpClient) {
        this.host = environment.host;
    }

    defaultMenu: IMenuItem[] = [
        {   
            name: 'Home',
            description: 'Inicio',
            type: 'dropDown',
            icon: 'icofont-home',
            sub: [
                { icon: 'icofont-presentation', name: 'Tela Inicial', state: '/dashboard/v1', type: 'link' }
            ]
            
        },
        {   
            name: 'Distribuição',
            description: 'Inicio',
            type: 'dropDown',
            icon: 'icofont-brand-designbump',
            sub: [
                { icon: 'icofont-numbered', name: 'Faixa de atraso', state: '/dashboard/faixa', type: 'link' },
                { icon: 'icofont-map-pins', name: 'UFs', state: '/dashboard/uf', type: 'link' }
            ]
        
        },
        {   
            name: 'Carteira',
            description: 'Inicio',
            type: 'dropDown',
            icon: 'icofont-dollar',
            sub: [
                { icon: 'icofont-headphone-alt', name: 'Carteira Ativa', state: '/carteira/carteira', type: 'link' }
            ]
            
        },
        {   
            name: 'Produção',
            description: 'Inicio',
            type: 'dropDown',
            icon: 'icofont-chart-histogram',
            sub: [
                { icon: 'icofont-chart-histogram', name: 'Produção Geral', state: '/producao/producao', type: 'link' }
            ]
            
        },
    ];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();


    // Métodos de requisção API

    public getContrantes() {
        return this.http.get<ContratanteModel[]>(this.host+'Contratante/contratantes',{headers: this.headers});
      }

}
