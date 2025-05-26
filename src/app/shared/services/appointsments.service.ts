import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointments, AppointmentsDTO, AppointmentsDTOResponse } from '../interfaces/appointments.interface';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { DoctorService } from './doctor.service';
import { DoctorDTOResponse, DorctorDTO } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointsmentsService {

  private mainUrl = 'http://localhost:8080/citas-medicas';

  constructor(
    private http: HttpClient,
    private doctorService: DoctorService
  ) { }

  getAppointments(): Observable<AppointmentsDTOResponse> {
    return this.http.post<AppointmentsDTOResponse>(
      `${this.mainUrl}/lista-citas-medicas`, {}
    );
  }

  getAppointsmentCompleteData(): Observable<Appointments[]> {
    return this.getAppointments().pipe(
      switchMap((appointmentsResponse: AppointmentsDTOResponse) => {
        const citas = appointmentsResponse.citaMedicaList;

        if (citas.length === 0) {
          return of([]);
        }

        return this.doctorService.getDoctors().pipe(
          map((doctorsResponse: DoctorDTOResponse) => {
            const medicos = doctorsResponse.MedicosList;
            return citas.map((cita: AppointmentsDTO) => {
              const doctor = medicos.find(m => m.id_medico === cita.medico_fk);
              return {
                id: cita.id_cita_medica!,
                date: cita.fecha_cita.split('T')[0],
                time: cita.fecha_cita.split('T')[1],
                site: 'Centro Médico Central',
                specialty: doctor?.especialidad || 'N/A',
                doctor: doctor?.nombre || 'No asignado',
                status: cita.estado_cita
              } as Appointments;
            });
          })
        );
      })
    );
  }

  createAppointment(appointment: AppointmentsDTO): Observable<AppointmentsDTO> {
    return this.http.post<AppointmentsDTO>(
      `${this.mainUrl}/crear-cita-medica`, appointment

    );
  }

  updateAppointment(appointment:Partial<AppointmentsDTO>): Observable<AppointmentsDTO> {
    return this.http.put<AppointmentsDTO>(
      `${this.mainUrl}/actualizar-cita-medica/${appointment.id_cita_medica}`, appointment
    );
  }

}
