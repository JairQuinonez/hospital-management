import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MedicalHistorialFormComponent } from '../../components/medical-historial-form/medical-historial-form.component';
import { FormField, FormFieldOption } from '../../interfaces/form-field';
import { Validators } from '@angular/forms';
import { ColumnDefinition, TableViewComponent } from "../../components/table-view/table-view.component";
import { Cita, Usuario } from '../../components/medical-appointments/medical-appointments.component';
import { AppointsmentsService } from '../../services/appointsments.service';
import { catchError, map, switchMap, tap, throwError, timer } from 'rxjs';
import { Appointments, AppointmentsDTO, DAY_OPTIONS, MONTH_OPTIONS, SITE_OPTIONS, SPECIALITY_OPTIONS } from '../../interfaces/appointments.interface';
import { LoaderService } from '../../services/loader.service';
import { DoctorService } from '../../services/doctor.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-appointments',
  imports: [
    MatTabsModule,
    MedicalHistorialFormComponent,
    TableViewComponent
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit, AfterViewInit {
  @ViewChild(MedicalHistorialFormComponent) medicalFormComponent!: MedicalHistorialFormComponent;
  initialRegisterData: Record<string, any> | null = null;
  registerFields: FormField[] = [

    {
      key: 'specialty', label: 'Especialidad', type: 'select', validators: [Validators.required],
      options: SPECIALITY_OPTIONS,
      colSpan: 2
    },
    {
      key: 'site', label: 'Sede', type: 'select', validators: [Validators.required],
      options: SITE_OPTIONS,
      colSpan: 2
    },
    {
      key: 'month', label: 'Mes', type: 'select', validators: [Validators.required],
      options: MONTH_OPTIONS,
      colSpan: 1
    },
    {
      key: 'day', label: 'Dia', type: 'select', validators: [Validators.required],
      options: DAY_OPTIONS,
      colSpan: 1
    },

  ];

  appointmentsProgramed: Appointments[] = [];
  doctorsSelect: FormFieldOption[] = [];
  isloadindDoctors = true;

  columns: ColumnDefinition[] = [
    { key: 'date', header: 'Fecha' },
    { key: 'time', header: 'Hora' },
    { key: 'site', header: 'Sede' },
    { key: 'specialty', header: 'Especialidad' },
    { key: 'doctor', header: 'Doctor' },
    { key: 'status', header: 'Estado' },
  ];

  constructor(private appointmentsService: AppointsmentsService,
    private loader: LoaderService,
    private doctorService: DoctorService,
    private toast: ToastService
  ) { }

  ngAfterViewInit(): void {
    if (this.medicalFormComponent) {
      console.log('Formulario médico detectado por ViewChild.');
    }
  }

  ngOnInit(): void {
    this.getAppointments();
    this.getDoctors();
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

  getDoctors(): void {
    this.doctorService.getDoctors()
      .pipe(
        map(data => {
          this.doctorsSelect = data.MedicosList
            .map(doctor => ({ value: doctor.id_medico, label: doctor.nombre }))
        }),
        tap(() => this.registerFields.push({
          key: 'doctor',
          label: 'Doctor',
          type: 'select',
          options: this.doctorsSelect,
          colSpan: 2,
          validators: [Validators.required]
        })),
        tap(() => this.isloadindDoctors = false)
      )
      .subscribe();
  }

  onCancelarCita(appointment: Appointments): void {
    console.log('Cancelar cita:', appointment);
    this.loader.show('Cancelando...');
    const body: Partial<AppointmentsDTO> = {
      id_cita_medica: appointment.id,
      estado_cita: 'cancelado',
    };
    timer(2000)
      .pipe(
        switchMap(() => this.appointmentsService.updateAppointment(body)),
        tap(() => this.loader.hide()),
        tap(() => this.toast.emitToast('Exitoso', 'Cita cancelada', 'success', true)),
        tap((data: AppointmentsDTO) => {
          console.log('Datos de respuesta:', { data });
          this.getAppointments()
        }),

        catchError((err: any) => {
          console.log('Error al cancelar cita:', err);
          this.loader.hide();
          this.toast.emitToast('Error', err?.error?.message ?? err, 'error', true);
          return throwError(() => err);
        })
      ).subscribe();
  }
  onSubmit(formData: Record<string, any>): void {
    this.loader.show('Agendando...');
    console.log('Datos de registro:', formData);
    timer(2000)
      .pipe(
        switchMap(() => this.appointmentsService.createAppointment({
          pacientes_fk: Math.floor(Math.random() * 10) + 1,
          medico_fk: formData['doctor'],
          fecha_cita: new Date().toISOString(),
          estado_cita: 'pendiente',
        })),
        tap(() => {
          this.getAppointments()
        }),
        tap(() => this.toast.emitToast('Exitoso', 'Cita creada', 'success', true)),
        tap(() => this.loader.hide()),
        tap(() => {
          this.medicalFormComponent.resetForm()
        }),
        catchError((err: any) => {
          console.log('Error al crear cita:', err);
          this.loader.hide();
          this.toast.emitToast('Error', err?.error?.message ?? err, 'error', true);
          return throwError(() => err);
        })
      )
      .subscribe();
    

  }


}

