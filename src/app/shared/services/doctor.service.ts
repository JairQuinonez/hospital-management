import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorDTOResponse } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private mainUrl = 'http://localhost:8080/medicos';

  constructor(
    private http: HttpClient
  ) { }

  getDoctors(): Observable<DoctorDTOResponse> {
    return this.http.post<DoctorDTOResponse>(
      `${this.mainUrl}/lista-medicos`, {}
    );
  }
}
