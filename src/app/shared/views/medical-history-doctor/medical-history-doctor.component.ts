import { Component } from '@angular/core';
import { PatientAvatarUploadComponent } from "../../components/patient-avatar-upload/patient-avatar-upload.component";
import { MedicalHistorialFormComponent } from "../../components/medical-historial-form/medical-historial-form.component";
import { FormField } from '../../interfaces/form-field';
import { Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-medical-history-doctor',
  imports: [PatientAvatarUploadComponent, MedicalHistorialFormComponent],
  templateUrl: './medical-history-doctor.component.html',
  styleUrl: './medical-history-doctor.component.scss'
})
export class MedicalHistoryDoctorComponent {
  currentPatientAvatarUrl: string | null = null; 
  userProfileFields: FormField[] = [
    { key: 'fullName', label: 'Nombre Completo', type: 'text', validators: [Validators.required, Validators.minLength(5)], colSpan: 2 },
    { key: 'birthDate', label: 'Fecha de Nacimiento', type: 'date', hint: 'dd/mm/yyyy', validators: [Validators.required], colSpan: 2 },
    { key: 'documentType', label: 'Tipo de Documento', type: 'select', colSpan: 1,
      options: [
        { value: 'cc', label: 'Cédula de Ciudadanía' },
        { value: 'ce', label: 'Cédula de Extranjería' },
        { value: 'passport', label: 'Pasaporte' }
      ],
      initialValue: 'cc' 
    },
    { key: 'documentNumber', label: 'Número de Documento', type: 'text', validators: [Validators.required], colSpan: 1 },
    { key: 'phone', label: 'Número de Teléfono', type: 'text', colSpan: 2 },
    { key: 'emergencyContact', label: 'Contacto de Emergencia', type: 'textarea', colSpan: 2, placeholder: 'Nombre y teléfono del contacto' },
  ];
   userData: Record<string, any> | null = {
    fullName: 'Juan Perez Ejemplo',
    birthDate: '1990-05-15', 
    documentType: 'cc',
    documentNumber: '12345678',
    phone: '3001234567',
    emergencyContact: 'Maria Lopez - 3109876543'
  };

  constructor(private loader: LoaderService) {
  
    }
  
    ngOnInit(): void {
      this.loader.show('Cargando...');
      setTimeout(() => {
        this.currentPatientAvatarUrl = 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sara';
        this.loader.hide();
      }, 2000);
    }
  


}
