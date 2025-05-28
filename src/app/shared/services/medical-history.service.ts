import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalHistoryDTO, MedicalHistoryDTOResponse, MedicalHistoryRequestDTO } from '../interfaces/medical-history.interface';
import { Observable } from 'rxjs';
import { UserDTOResponse } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  private mainUrl = `${environment.apiUrl}/historia-clinica`;

  constructor(
    private http: HttpClient
  ) { }

  creatUser(user: MedicalHistoryRequestDTO): Observable<MedicalHistoryDTO> {
    return this.http.post<MedicalHistoryDTO>(
      `${this.mainUrl}/historia-clinica`, 
      user
    );

  }

  getMedicalHistory(): Observable<MedicalHistoryDTOResponse> {
    return this.http.post<MedicalHistoryDTOResponse>(
      `${this.mainUrl}/historia-clinica`, 
      {}
    );

  }
}
