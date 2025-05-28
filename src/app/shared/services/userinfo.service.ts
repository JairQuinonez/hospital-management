import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTOResponse, ValdiateUserDTO, ValdiateUserDTOResponse } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  private mainUrl = `${environment.apiUrl}/usuarios`;

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
