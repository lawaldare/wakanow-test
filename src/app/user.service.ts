import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http.get(`${environment.base_url}users`)
  }

  createUser(payload: any) {
    return this.http.post(`${environment.base_url}users`, payload)
  }

  getUserById(id: string) {
    return this.http.get(`${environment.base_url}users/${id}`)
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.base_url}users/${id}`)
  }

  updateUserById(id: string, payload: any) {
    return this.http.put(`${environment.base_url}users/${id}`, payload)
  }
}
