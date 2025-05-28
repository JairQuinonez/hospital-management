import { Component, effect, inject, input, output, untracked } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../interfaces/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-medical-historial-form',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './medical-historial-form.component.html',
  styleUrl: './medical-historial-form.component.scss'
})
export class MedicalHistorialFormComponent {

  private fb = inject(FormBuilder);

  fields = input.required<FormField[]>();
  initialData = input<Record<string, any> | null>(null);
  isViewMode = input<boolean>(false);
  fieldAppearance = input<MatFormFieldAppearance>('fill');

  submitButtonText = input<string>('Guardar');
  cancelButtonText = input<string>('Cancelar');
  showCancelButton = input<boolean>(true);
  formLayoutCols = input<number>(1);

  formSubmit = output<Record<string, any>>();
  formCancel = output<void>();
  formSubmitGoogle = output<void>();

  dynamicForm: FormGroup = this.fb.group({});

  loginGeneral = input<boolean>(false);
  loginDoctor = input<boolean>(false);

  constructor() {

    effect(() => {
      const currentFields = this.fields();
      untracked(() => this.buildForm(currentFields));

      const data = this.initialData();
      if (data) {
        this.dynamicForm.patchValue(data);
      }

      if (this.isViewMode()) {
        this.dynamicForm.disable({ emitEvent: false });
      } else {
        this.dynamicForm.enable({ emitEvent: false });
        currentFields.forEach(field => {
          if (field.readonly) {
            this.dynamicForm.get(field.key)?.disable({ emitEvent: false });
          }
        });
      }
    });
  }

  private buildForm(fields: FormField[]): void {
    const group: { [key: string]: FormControl } = {};
    fields.forEach(field => {
      group[field.key] = this.fb.control(
        field.initialValue ?? (field.type === 'date' ? null : ''), 
        field.validators
      );
    });
    this.dynamicForm = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.dynamicForm.valid) {
      this.formSubmit.emit(this.dynamicForm.value);
    } else {
      this.dynamicForm.markAllAsTouched();
      console.error('Formulario inválido');
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  
  getSelectedOptionLabel(field: FormField, value: any): string {
    if (!field.options || value === null || value === undefined) {
      return value === null || value === undefined ? '-' : String(value);
    }
    const selectedOption = field.options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : (value || '-');
  }

  trackByFieldKey(index: number, field: FormField): string {
    return field.key;
  }

  onLoginGoogle() {
    this.formSubmitGoogle.emit();
  }

  public resetForm(): void {
    const dataToResetTo = this.initialData(); 

    //this.dynamicForm.reset();
    this.dynamicForm.reset(dataToResetTo);

    this.dynamicForm.markAsPristine();
    this.dynamicForm.markAsUntouched();
    this.dynamicForm.updateValueAndValidity();
    console.log('Estado del form', this.dynamicForm.value, this.dynamicForm.valid, this.dynamicForm.errors);

  }
}
