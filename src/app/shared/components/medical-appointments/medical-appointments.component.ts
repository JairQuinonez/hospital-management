import { Component } from '@angular/core';
import { ColumnDefinition, TableViewComponent } from "../table-view/table-view.component";
import { MedicalHistorialFormComponent } from '../medical-historial-form/medical-historial-form.component';
import { Validators } from '@angular/forms';
import { FormField } from '../../interfaces/form-field';
import { PatientAvatarUploadComponent } from "../patient-avatar-upload/patient-avatar-upload.component";

export interface Cita {
  id: number;
  fecha: string;
  hora: string;
  sede: string;
  especialidad: string;
  doctor: string;
  estado?: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

@Component({
  selector: 'app-medical-appointments',
  imports: [TableViewComponent, MedicalHistorialFormComponent, PatientAvatarUploadComponent],
  templateUrl: './medical-appointments.component.html',
  styleUrl: './medical-appointments.component.scss'
})
export class MedicalAppointmentsComponent {
  citasProgramadas: Cita[] = [
    { id: 1, fecha: '01/03/25', hora: '11:00 AM', sede: 'NORTE', especialidad: 'GENERAL', doctor: 'JUAN PEREZ' },
    { id: 2, fecha: '05/03/25', hora: '02:30 PM', sede: 'SUR', especialidad: 'PEDIATRIA', doctor: 'ANA GOMEZ' },
  ];

  columnasDeCitas: ColumnDefinition[] = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'hora', header: 'Hora' },
    { key: 'sede', header: 'Sede' },
    { key: 'especialidad', header: 'Especialidad' },
    { key: 'doctor', header: 'Doctor' },
  ];

  listaDeUsuarios: Usuario[] = [
    { id: 101, nombre: 'Carlos Ruiz', email: 'carlos@example.com', rol: 'Admin' },
    { id: 102, nombre: 'Luisa Fernanda', email: 'luisa@example.com', rol: 'Editor' },
  ];

  columnasDeUsuarios: ColumnDefinition[] = [
    { key: 'nombre', header: 'Nombre Completo' },
    { key: 'email', header: 'Correo Electrónico' },
    { key: 'rol', header: 'Rol Asignado' },
  ];

  onCancelarCita(cita: Cita): void {
    console.log('Cancelar cita:', cita);
    // Lógica para cancelar la cita, por ejemplo, filtrar la lista:
    // this.citasProgramadas = this.citasProgramadas.filter(c => c.id !== cita.id);
  }


  //############################################

  isEditMode = false;

  userData: Record<string, any> | null = {
    fullName: 'Juan Perez Ejemplo',
    birthDate: '1990-05-15', // Formato YYYY-MM-DD para input tipo date
    documentType: 'cc',
    documentNumber: '12345678',
    phone: '3001234567',
    emergencyContact: 'Maria Lopez - 3109876543'
  };

  userProfileFields: FormField[] = [
    { key: 'fullName', label: 'Nombre Completo', type: 'text', validators: [Validators.required, Validators.minLength(5)], colSpan: 2 },
    { key: 'birthDate', label: 'Fecha de Nacimiento', type: 'date', hint: 'dd/mm/yyyy', validators: [Validators.required], colSpan: 1 },
    { key: 'documentType', label: 'Tipo de Documento', type: 'select', colSpan: 1,
      options: [
        { value: 'cc', label: 'Cédula de Ciudadanía' },
        { value: 'ce', label: 'Cédula de Extranjería' },
        { value: 'passport', label: 'Pasaporte' }
      ],
      initialValue: 'cc' // Valor por defecto si no hay initialData
    },
    { key: 'documentNumber', label: 'Número de Documento', type: 'text', validators: [Validators.required], colSpan: 1 },
    { key: 'phone', label: 'Número de Teléfono', type: 'text', colSpan: 1 },
    { key: 'emergencyContact', label: 'Contacto de Emergencia', type: 'textarea', colSpan: 2, placeholder: 'Nombre y teléfono del contacto' },
  ];

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode && !this.userData) { // Si entramos a editar y no hay datos, podríamos querer datos vacíos o defaults
        // this.userData = {}; // O cargar datos por defecto
    }
  }

  onProfileSave(formData: Record<string, any>) {
    console.log('Perfil guardado:', formData);
    this.userData = { ...this.userData, ...formData }; // Actualizar datos locales (simulación)
    this.isEditMode = false;
    // Aquí llamarías a tu servicio para guardar los datos
  }

  onProfileCancel() {
    console.log('Edición cancelada');
    this.isEditMode = false;
    // No es necesario hacer nada con los datos si se cancela, el form se repintará con initialData
  }


  //############################################

  currentPatientAvatarUrl: string | null = null; // 'https://ejemplo.com/avatar.jpg'; o null
  isInReadOnlyMode: boolean = true;

  constructor() {
    // Simular carga de avatar
    setTimeout(() => {
      // this.currentPatientAvatarUrl = 'https://via.placeholder.com/150/007bff/FFFFFF?Text=User';
    }, 2000);
  }

  handleFileUploaded(file: File): void {
    console.log('Archivo seleccionado:', file);
    console.log('Tipo de archivo:', file.type);
    // Aquí manejarías la subida del archivo a tu backend
    // y luego actualizarías currentPatientAvatarUrl si el archivo es una imagen
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentPatientAvatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      alert(`PDF "${file.name}" listo para subir.`);
    }
  }

  viewPatientAvatar(): void {
    if (this.currentPatientAvatarUrl) {
      console.log('Viendo avatar:', this.currentPatientAvatarUrl);
      // Lógica para mostrar el avatar en grande, etc.
      window.open(this.currentPatientAvatarUrl, '_blank');
    } else {
      console.log('No hay avatar para mostrar.');
    }
  }

  toggleMode(): void {
    this.isInReadOnlyMode = !this.isInReadOnlyMode;
  }

}
