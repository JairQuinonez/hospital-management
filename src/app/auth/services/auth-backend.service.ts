import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValdiateUserDTO, ValdiateUserDTOResponse } from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthBackendService {

  private mainUrl = 'http://localhost:8080/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  validateUser(user: ValdiateUserDTO): Observable<ValdiateUserDTOResponse> {
    const params = new HttpParams()
      .set('email', user.email)
      .set('password', user.password);
    console.log('Datos de SERIVICE:', params);
    return this.http.get<ValdiateUserDTOResponse>(
      `${this.mainUrl}/validar-usuario`,
      { params }
    );

  }
}
