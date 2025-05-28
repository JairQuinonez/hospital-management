import { Component, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-patient-avatar-upload',
  imports: [],
  templateUrl: './patient-avatar-upload.component.html',
  styleUrl: './patient-avatar-upload.component.scss'
})
export class PatientAvatarUploadComponent {

  avatarUrl = input<string | null | undefined>(null); 
  isViewMode = input<boolean>(false); 
  acceptedFileTypes = input<string>('application/pdf'); 
  buttonText = input<string>('Subir archivo');
  placeholderText = input<string>('Sin Foto'); 
  fileSelected = output<File>(); 
  avatarClicked = output<void>(); 

  // Acceso al input de archivo oculto
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  onAvatarAreaClick(): void {
    if (this.isViewMode()) {
      this.avatarClicked.emit(); 
    } else {
      this.avatarClicked.emit();
    }
  }

  onUploadButtonClick(): void {
    if (!this.isViewMode()) {
      this.fileInputRef.nativeElement.click();
    }
  }

  onFileChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.fileSelected.emit(file);
      // Limpiar el valor del input para permitir seleccionar el mismo archivo de nuevo
      element.value = '';
    }
  }
}
