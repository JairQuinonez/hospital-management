import { Component, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-patient-avatar-upload',
  imports: [],
  templateUrl: './patient-avatar-upload.component.html',
  styleUrl: './patient-avatar-upload.component.scss'
})
export class PatientAvatarUploadComponent {

  avatarUrl = input<string | null | undefined>(null); // URL de la imagen del avatar
  isViewMode = input<boolean>(false); // true para modo vista, false para permitir subida
  acceptedFileTypes = input<string>('application/pdf'); // Tipos de archivo aceptados
  buttonText = input<string>('Subir archivo');
  placeholderText = input<string>('Sin Foto'); // Texto para el placeholder si no hay avatar

  // --- Outputs ---
  fileSelected = output<File>(); // Emite el archivo seleccionado
  avatarClicked = output<void>(); // Emite cuando se hace clic en el área del avatar

  // Acceso al input de archivo oculto
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  onAvatarAreaClick(): void {
    if (this.isViewMode()) {
      this.avatarClicked.emit(); // Solo emitir si está en modo vista y se hace clic en el avatar
    } else {
      // Si no es modo vista, hacer clic en el avatar podría también abrir el selector de archivos
      // o simplemente no hacer nada y dejar que el botón maneje la subida.
      // Por ahora, lo haremos para que el avatar sea clickeable para emitir evento.
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
