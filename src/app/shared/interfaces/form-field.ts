
import { ValidatorFn } from '@angular/forms';

export interface FormFieldOption {
  value: any;
  label: string;
}

export interface FormField {
  key: string; // Identificador único y nombre del formControl
  label: string;
  type: 'text' | 'date' | 'number' | 'email' | 'password' | 'select' | 'textarea';
  initialValue?: any;
  placeholder?: string;
  validators?: ValidatorFn | ValidatorFn[];
  options?: FormFieldOption[]; // Para tipo 'select'
  readonly?: boolean; // Para campos individuales en modo no-vista
  colSpan?: number; // Para layout en grid (ej. 1 o 2 columnas)
  hint?: string; // Texto de ayuda o formato debajo del label (como dd/mm/yyyy)
}