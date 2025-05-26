import { Component, OnInit } from '@angular/core';
import { ColumnDefinition, TableViewComponent } from "../../components/table-view/table-view.component";
import { MatTabsModule } from '@angular/material/tabs';
import { Cita } from '../../components/medical-appointments/medical-appointments.component';
import { Appointments } from '../../interfaces/appointments.interface';
import { AppointsmentsService } from '../../services/appointsments.service';
import { LoaderService } from '../../services/loader.service';
import { map, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-appointments-doctor',
  imports: [TableViewComponent, MatTabsModule],
  templateUrl: './appointments-doctor.component.html',
  styleUrl: './appointments-doctor.component.scss'
})
export class AppointmentsDoctorComponent implements OnInit {
  appointmentsProgramed: Appointments[] = [];

  columns: ColumnDefinition[] = [
    { key: 'date', header: 'Fecha' },
    { key: 'time', header: 'Hora' },
    { key: 'site', header: 'Sede' },
    { key: 'specialty', header: 'Especialidad' },
    { key: 'doctor', header: 'Doctor' },
    { key: 'status', header: 'Estado' },
  ];

  constructor(private appointmentsService: AppointsmentsService,
      private loader: LoaderService,) {

  }
  ngOnInit(): void {
        this.getAppointments();

  }

  getAppointments(): void {
    this.loader.show('Cargando...');

    timer(2000)
      .pipe(
        switchMap(() => this.appointmentsService.getAppointsmentCompleteData()),
        map(data => this.appointmentsProgramed = data),
        tap(() => this.loader.hide())
      )
      .subscribe();
  }
}
