import { Component, OnInit } from '@angular/core';
import { TableViewComponent } from "../../components/table-view/table-view.component";
import { MedicalHistorialFormComponent } from "../../components/medical-historial-form/medical-historial-form.component";
import { PatientAvatarUploadComponent } from "../../components/patient-avatar-upload/patient-avatar-upload.component";
import { Validators } from '@angular/forms';
import { FormField } from '../../interfaces/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-medical-history',
  imports: [MedicalHistorialFormComponent, PatientAvatarUploadComponent, MatButtonModule],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.scss'
})
export class MedicalHistoryComponent implements OnInit {

  currentPatientAvatarUrl: string | null = null; // 'https://ejemplo.com/avatar.jpg'; o null
  isInReadOnlyMode: boolean = true;

  constructor(private loader: LoaderService) {
    // Simular carga de avatar

  }

  ngOnInit(): void {
    this.loader.show('Cargando...');
    setTimeout(() => {
      this.currentPatientAvatarUrl = 'https://api.dicebear.com/9.x/adventurer/svg?seed=Brian';
      this.loader.hide();
    }, 2000);
  }

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
    { key: 'birthDate', label: 'Fecha de Nacimiento', type: 'date', hint: 'dd/mm/yyyy', validators: [Validators.required], colSpan: 2 },
    {
      key: 'documentType', label: 'Tipo de Documento', type: 'select', colSpan: 1,
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

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode && !this.userData) {
    }
  }

  onProfileSave(formData: Record<string, any>) {
    console.log('Perfil guardado:', formData);
    this.userData = { ...this.userData, ...formData };
    this.isEditMode = false;
  }

  onProfileCancel() {
    console.log('Edición cancelada');
    this.isEditMode = false;
  }

  handleFileUploaded(file: File): void {
    console.log('Archivo seleccionado:', file);
    console.log('Tipo de archivo:', file.type);
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
      window.open(this.currentPatientAvatarUrl, '_blank');
    } else {
      console.log('No hay avatar para mostrar.');
    }
  }

  toggleMode(): void {
    this.isInReadOnlyMode = !this.isInReadOnlyMode;
  }

}
