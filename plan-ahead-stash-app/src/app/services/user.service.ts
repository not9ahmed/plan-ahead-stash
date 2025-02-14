import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.BACKEND_API_URL + "/users";

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> {
    const url = `${this.API_URL}/`;
    return this.http.get<User[]>(url);
  }

  findById(id: number): Observable<User> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<User>(url);
  }

  create(user: User): Observable<User> {
    const url = `${this.API_URL}`;
    return this.http.post<User>(url, user);
  }

  update(id: number, user: User): Observable<User> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<User>(url, user);
  }

  delete(id: number): Observable<User> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<any>(url);
  }
  
}
