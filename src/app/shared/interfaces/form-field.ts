
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
  options?: FormFieldOption[];
  readonly?: boolean; 
  colSpan?: number; 
  hint?: string; 
}