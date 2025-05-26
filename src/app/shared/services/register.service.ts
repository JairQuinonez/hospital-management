import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO, UserDTOResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private mainUrl = 'http://localhost:8080/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  creatUser(user: UserDTO): Observable<UserDTOResponse> {
    return this.http.post<UserDTOResponse>(
      `${this.mainUrl}/crear-usuario`, 
      user
    );

  }

}
