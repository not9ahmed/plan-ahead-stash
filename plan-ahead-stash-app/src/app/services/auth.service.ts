import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

type Auth = {
  isLoggedIn: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = signal<Auth>({isLoggedIn: true});

  constructor() { }

  

}
