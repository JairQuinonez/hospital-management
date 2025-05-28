import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValdiateUserDTO, ValdiateUserDTOResponse } from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthBackendService {

  private mainUrl =`${environment.apiUrl}/usuarios`;

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
