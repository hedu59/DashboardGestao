import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarUserService {

  constructor() { }

  img = [
    {
      id: 1,
      nome: 'user1'
    },
    {
      id: 3,
      nome: 'user3'
    },
    {
      id: 9,
      nome: 'user9'
    },
    {
      id: 6,
      nome: 'user6'
    },
    {
      id: 5,
      nome: 'user8'
    },
    {
      id: 2,
      nome: 'user10'
    },
    {
      id: 4,
      nome: 'user4'
    },
    {
      id: 7,
      nome: 'user7'
    },
  ]

  public getImg() {
    return this.img;
  }

}
