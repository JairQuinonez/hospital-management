import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalHistoryDTO, MedicalHistoryDTOResponse, MedicalHistoryRequestDTO } from '../interfaces/medical-history.interface';
import { Observable } from 'rxjs';
import { UserDTOResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  private mainUrl = 'http://localhost:8080/historia-clinica';

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
