import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTOResponse, ValdiateUserDTO, ValdiateUserDTOResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  private mainUrl = 'http://localhost:8080/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  getUserByIdUser(userId: number): Observable<UserDTOResponse> {
    const params = new HttpParams()
      .set('id_usuario', userId.toString());

    console.log('Datos de SERIVICE:', params);
    return this.http.get<UserDTOResponse>(
      `${this.mainUrl}/validar-usuario`,
      { params }
    );

  }
}
