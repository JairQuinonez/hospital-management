import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO, UserDTOResponse } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private mainUrl = `${environment.apiUrl}/usuarios`;

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
