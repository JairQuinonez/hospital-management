import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

type HorizontalAlignment = 'left' | 'right' | 'center';
type VerticalAlignment = 'top' | 'bottom' | 'center';

@Component({
  selector: 'app-background-shape',
  imports: [CommonModule],
  templateUrl: './background-shape.component.html',
  styleUrl: './background-shape.component.scss'
})
export class BackgroundShapeComponent {
  shapeSvgUrl = input<string | null>('/assets/svgs/general.svg'); 
  logoUrl = input<string | null>('/assets/svgs/logo_clinic.svg'); 
  hospitalName = input<string | null>('BIG TOWN HOSPITAL');

  logoHorizontalAlign = input<HorizontalAlignment>('right'); 
  logoVerticalAlign = input<VerticalAlignment>('top');   

  nameHorizontalAlign = input<HorizontalAlignment>('right'); 
  nameVerticalAlign = input<VerticalAlignment>('bottom'); 

  
  get logoAlignmentClasses(): Record<string, boolean> {
    return {
      [`logo-align-h--${this.logoHorizontalAlign()}`]: true,
      [`logo-align-v--${this.logoVerticalAlign()}`]: true,
    };
  }

  get nameAlignmentClasses(): Record<string, boolean> {
    return {
      [`name-align-h--${this.nameHorizontalAlign()}`]: true,
      [`name-align-v--${this.nameVerticalAlign()}`]: true,
    };
  }

}
